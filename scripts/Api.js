class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getUser() {
    return fetch(`${this.url}users/me`, {
      headers: this.headers,
    }).then((res) => {
      /*
          Можно лучше: проверка ответа сервера и преобразование из json
          дублируется во всех методах класса Api, лучше вынести в отдельный метод:
              _getResponseData(res) {
                  if (!res.ok) {
                      return Promise.reject(`Ошибка: ${res.status}`); 
                  }
                  return res.json();
              }
          Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
          не используется вне класса Api   
      */
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getCards() {
    return fetch(`${this.url}cards`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateUser(fullName, job) {
    return fetch(`${this.url}users/me`, {
      method: "PATCH",
      headers: this.headers,

      body: JSON.stringify({
        name: fullName,
        about: job,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
