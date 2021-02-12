/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  static URL = '/user'

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    console.log(user)
    localStorage.setItem('user', JSON.stringify(user));
    console.log(localStorage.getItem('user'))
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.getItem('user') !== null) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return undefined;
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback = (f) => f) {
    createRequest({
      url: this.URL + `/current`,
      method: "GET",
      responseType: "json",
      callback: (err, response) => {
        if (response.success) {
          console.log(response.user)
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback(err, response);
    }
    });




  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = (f) => f) {
    try {
      createRequest({
        url: this.URL + '/login',
        method: 'POST',
        responseType: 'json',
        data: data,
        callback: (err, response) => {
          if (response && response.user) {
            console.log(response.user);
            this.setCurrent(response.user);
          }
          callback(err, response);
        }
      });
    } catch(err) {
      window.alert(err)
    }
    
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = (f) => f) {
    try {
      createRequest({
        url: this.URL + `/register`,
        method: 'POST',
        responseType: 'json',
        data: data,
        callback: (err, response) => {
          if (response && response.user) {
            console.log(response.user);
            this.setCurrent(response.user);
          }
          callback(err, response);
      }
      })
    } catch(err) {
      window.alert(err)
    }
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = (f) => f) {
    createRequest({
      url: `${this.URL}/logout`,
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        if (response && response.user) {
            this.unsetCurrent()
        }
        callback(err, response);
    }
    })
  }
}
