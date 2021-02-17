/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const f = function () {},
        {
            url = '',
            method = 'GET',
            callback = f,
            responseType = '',
            async = true,
            data = {}
        } = options,

   
    xhr = new XMLHttpRequest;

    if (method === 'GET') {
        let params = '';
        for (param in data) {
            params += param + '=' + data[param] + '&';
        }

        try {
            xhr.open(method, url + '/?' + params.slice(0, -1), async);
            xhr.responseType = responseType;
            xhr.withCredentials = true;
            xhr.send();
        } catch (err) {
            callback(err);
        }
    } else {
        let formData = new FormData();

        for (let item in data) {
            formData.append(item, data[item]);
        }

        try {
            xhr.open(method, url);
            xhr.responseType = responseType;
            xhr.withCredentials = true;
            xhr.send(formData);
        } catch (err) {
            callback(err);
        }
    }

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE && xhr.status == 200) {
            if (!xhr.response.success) {
                callback(xhr.response.error, xhr.response);
            } else {
                callback(null, xhr.response);
            }

        }
    });

};
