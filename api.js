let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
const host = "https://wedev-api.sky.pro/api/v2/JulieSemenova/comments";

export function fetchGet({ token }) {
  return fetch(host,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    });
}

export function fetchPost({ token }) {
  const nameInputElement = document.querySelector(".add-form-name");
  const commentInputElement = document.querySelector(".add-form-text");
  const buttonElement = document.querySelector(".add-form-button");

  return fetch(host,
    {
      method: "POST",
      body: JSON.stringify({
        "name": nameInputElement.value,
        "text": commentInputElement.value,
        // forceError: true,
      }),
      headers: {
        Authorization: token,
      }
    })
    .then((response) => {
      if (response.status === 500) {
        alert('Сервер сломался, попробуй позже');
        throw new Error("Ошибка сервера");

      } else if (response.status === 400) {
        alert('Имя и комментарий должны быть не короче 3 символов');
        throw new Error("Неверный запрос");

      }
      else {
        return response.json();
      }
    });
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md

export function loginUser({ login, password }) {
  return fetch("https://wedev-api.sky.pro/api/user/login",
    {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Неверный логин или пароль");

      }
      else {
        return response.json();
      }
    });
}