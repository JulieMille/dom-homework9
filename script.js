import { fetchGet, fetchPromise } from "./api.js";
import { renderComments } from "./render.js";
import { isInitialLoading, comentarios } from "./api.js"

const buttonElement = document.querySelector(".add-form-button");
const nameInputElement = document.querySelector(".add-form-name");
const commentInputElement = document.querySelector(".add-form-text");

fetchGet();


buttonElement.addEventListener("click", async () => {
    const { isInitialLoading, ...comentarios } = fetchGet();
    renderComments(isInitialLoading, comentarios);
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        return;
    }
    if (commentInputElement.value === "") {
        commentInputElement.classList.add("error");
        return;
    }

    buttonElement.disabled = true;
    buttonElement.textContent = "Комментарий добавляется";

    fetchPromise();

    renderComments(isInitialLoading, comentarios);

});