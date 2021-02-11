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
            responseType,
            async = true,
            data = {}
        } = options,
        xhr = new XMLHttpRequest;
        if (method === 'GET') {
            let str;
            for (item in data) {
                str += item + '=' + data.item + '&' ;
            }

            try {
                xhr.open(method, (url+str.slice(0, -1)));
                xhr.responseType = responseType;
                xhr.send();
            } catch(err) {
                callback(err);
            }
        } else {
            let formData = new FormData();
            for (item in data) {
                formData.append(item, data.item);
            }

            try {
                xhr.open(method, url);
                xhr.withCredentials = true;
                xhr.responseType = responseType;
                xhr.send(formData);
            } catch(err) {
                callback(err)
            }
        }

        xhr.addEventListener('readystatechange', ()=> {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                if (!xhr.response.success) {
                    callback(xhr.response.error, xhr.response);
                } else {
                    callback(null, xhr.response);
                }
            }
        })
};