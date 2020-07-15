export class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getUser() {
    return fetch(`${this.url}users/me`, {
      headers: this.headers,
    }).then((res) => {
      
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
