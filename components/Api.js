export default class Api {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }
  /// catch errors
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    Promise.reject({ message: "Ошибка на стороне сервера", res });
  }

  /// Get cards from the server
  getInitialRepositories(value) {
    return fetch(`${this._url}/${value}`, {
      method: "GET",
    }).then((res) => this._checkResponse(res));
  }

  /// Delete the card(надо ли?)
  removeElem(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: "DELETE",
    }).then((res) => this._checkResponse(res));
  }
}
