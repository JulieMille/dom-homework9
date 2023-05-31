import { renderComments } from "./render.js";

const buttonElement = document.querySelector(".add-form-button");
const nameInputElement = document.querySelector(".add-form-name");
const commentInputElement = document.querySelector(".add-form-text");

let comentarios = [];
let isInitialLoading = true;

const fetchGet = () => {
    fetch('https://webdev-hw-api.vercel.app/api/v1/JulieSemenova/comments',
        {
            method: "GET"
        })
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            console.log(responseData.comments);
            const appComments = responseData.comments
                .map((comment) => {
                    return {
                        name: comment.author.name,
                        date: new Date(comment.date).toLocaleDateString() + ' ' + new Date(comment.date).toLocaleTimeString().slice(0, -3),
                        text: comment.text,
                        likesNumber: comment.likes,
                        isLiked: false,
                        id: comment.id,
                    };
                });
            return appComments;
        })
        .then((data) => {
            comentarios = data;
            isInitialLoading = false;
            renderComments(isInitialLoading, comentarios);
            return isInitialLoading, comentarios;
        });
};

const fetchPromise = fetch('https://webdev-hw-api.vercel.app/api/v1/JulieSemenova/comments',
    {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value,
            text: commentInputElement.value,
            forceError: true,
        })
    })
    .then((response) => {
        if (response.status === 500) {
            alert('Сервер сломался, попробуй позже');
            throw new Error("Ошибка сервера");

        } else if (response.status === 400) {
            alert('Имя и комментарий должны быть не короче 3 символов');
            throw new Error("Неверный запрос");

        } else {
            return response.json();
        }
    })
    .then(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
        nameInputElement.value = "";
        commentInputElement.value = "";

        fetchGet();

    })
    .catch((error) => {

        if (!navigator.onLine) {
            alert('Кажется, у вас сломался интернет, попробуйте позже');
        }

        console.warn(error);
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
    });

export { fetchGet, fetchPromise };
export { isInitialLoading, comentarios };