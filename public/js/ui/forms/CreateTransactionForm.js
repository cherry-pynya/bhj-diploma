/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  //constructor(element) {
  //  super(element);
  //  this.renderAccountsList();
  //}
//
  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
    this.expenseList = document.getElementById('expense-accounts-list');
    this.incomeList = document.getElementById('income-accounts-list');
  }

  renderAccountsList(data) {
    Account.list(data,(err, response) => {
      try {
        this.incomeList.innerHTML = "";
        this.expenseList.innerHTML = "";
        const data = response.data
        data.forEach(element => {
          this.expenseList.insertAdjacentHTML('afterbegin', `<option value="${element.id}">${element.name}</option>`);
          this.incomeList.insertAdjacentHTML('afterbegin', `<option value="${element.id}">${element.name}</option>`);
          return false;
        });

      } catch {
        window.alert(err)
      }

      

    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data,(err, response)=> {
      try {
        if (response.success) {
          if (App.getModal('newIncome')) {
            App.getModal('newIncome').close();
          }
          
          if(App.getModal('newExpense')) {
            App.getModal('newExpense').close();
          }
          console.log(response);
          this.element.reset();
          App.update();
        }
      } catch(err) {
        window.alert(err)
      }
    });
  }
}