export const BASE_URL = 'https://backend.vaal-project.nomoredomains.icu';

function handleResponse(res) {
  return (res.ok) ? (res.json()) : (Promise.reject(`Ошибка: ${res.status}`))
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
})
  .then(res => handleResponse(res));
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({email, password})
  })
    .then(res => handleResponse(res));
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(res => handleResponse(res));
};

export const logout = (email) => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email })
  })
  .then(res => handleResponse(res));
}