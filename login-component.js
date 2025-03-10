import { loginUser, registerUser } from "./api.js";

export function renderLoginComponent({ appEl, setToken, fetchCommsAndRender }) {

    let isLoginMode = true;

    const renderForm = () => {
        const appHtml = `<div class="container"> <div class="login-form">
        <p class="reg-header">Форма ${isLoginMode ? "входа" : "регистрации"}</p>
        ${isLoginMode
                ? ''
                : `<input type="text" class="reg-name" placeholder="Введите ваше имя" />
            <br>
            <br>`}
        <input type="text" class="login-name" placeholder="Введите ваш логин" />
        <br>
        <br>
        <input type="password" class="login-password" placeholder="Введите ваш пароль" />
        <div class="add-form-row">
            <button class="login-button">${isLoginMode ? "Войти" : "Зарегистрироваться"}</button>
            <br>
            <br>
            <button class="toggle-button">Перейти к ${isLoginMode ? "регистрации" : "входу"}</button>
        </div>
        </div>
        </div>`
        appEl.innerHTML = appHtml;

        document.querySelector('.login-button').addEventListener('click', () => {
            if (isLoginMode) {
                const login = document.querySelector('.login-name').value;
                const password = document.querySelector('.login-password').value;

                if (!login) {
                    alert('Введите логин')
                    return;
                }

                if (!password) {
                    alert('Введите пароль')
                    return;
                }

                loginUser({
                    login: login,
                    password: password,
                }).then((user) => {
                    setToken(`bearer ${user.user.token}`)
                    fetchCommsAndRender();
                }).catch(error => {
                    alert(error.message);
                });
            } else {
                const login = document.querySelector('.login-name').value;
                const name = document.querySelector('.reg-name').value;
                const password = document.querySelector('.login-password').value;

                if (!login) {
                    alert('Введите логин')
                    return;
                }

                if (!name) {
                    alert('Введите имя')
                    return;
                }

                if (!password) {
                    alert('Введите пароль')
                    return;
                }

                registerUser({
                    login: login,
                    password: password,
                    name: name,
                }).then((user) => {
                    setToken(`bearer ${user.user.token}`)
                    fetchCommsAndRender();
                }).catch(error => {
                    alert(error.message);
                });
            }

        });

        document.querySelector('.toggle-button').addEventListener('click', () => {
            isLoginMode = !isLoginMode
        });
    };

    renderForm();
}