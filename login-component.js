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
      setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");

      loginUser({ 
        login: 'admin', 
        password: 'admin' 
    }).then ((user) => {
        setToken(`bearer ${user.user.token}`)
        fetchCommsAndRender();
    })
    })
}