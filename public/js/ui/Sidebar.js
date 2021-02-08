/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const body = document.querySelector('.app');
    const sandwichBtn = document.querySelector('.sidebar-toggle');

      sandwichBtn.addEventListener('click', (e)=> {
        console.log(1)
        body.classList.toggle('sidebar-open sidebar-collapse');
        
        e.preventDefault();
      })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const sideBarBtn = document.getElementsByClassName('menu-item');
    
    Array.from(sideBarBtn).forEach((item) => {
      if (item.classList.contains('menu-item_login')) {
        console.log(1);
      }
    })

  }
}


