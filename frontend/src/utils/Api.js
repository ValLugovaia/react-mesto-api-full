class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _handleResponse(res) {
    return (res.ok) ? (res.json()) : (Promise.reject(`Ошибка: ${res.status}`))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
    })
    .then(this._handleResponse)
  }

  changeUserInfo({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._handleResponse)
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(avatar)
    })
    .then(this._handleResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
    })
    .then(this._handleResponse)
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(this._handleResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
        credentials: 'include',
    })
    .then(this._handleResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: isLiked ? "PUT" : "DELETE",
        headers: this._headers,
        credentials: 'include',
    })
      .then(this._handleResponse)
  }
}

const api = new Api({
  baseUrl: 'https://backend.vaal-project.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;