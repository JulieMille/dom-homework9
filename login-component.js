import { loginUser } from "./api.js";

export function renderLoginComponent({ appEl, setToken, fetchCommsAndRender }) {
    const appHtml = `<div class="login-form">
        <p>Форма входа</p>
        <input type="text" class="login-name" placeholder="Введите ваш логин" />
        <br>
        <br>
        <input type="password" class="login-password" placeholder="Введите ваш пароль" />
        <div class="add-form-row">
            <button class="login-button">Войти</button>
        </div>
        <a class="link" href="#">Зарегистрироваться</a>
        </div>`
    appEl.innerHTML = appHtml;

    document.querySelector('.login-button').addEventListener('click', () => {
      const login = document.querySelector('.login-name').value;
      const password = document.querySelector('.login-password').value;

      if(!login) {
        alert('Введите логин')
        return;
      }

      if(!password) {
        alert('Введите пароль')
        return;
      }

      loginUser({ 
        login: login, 
        password: password, 
    }).then ((user) => {
        setToken(`bearer ${user.user.token}`)
        fetchCommsAndRender();
    }).catch(error => {
        alert(error.message);
    });
    });
}