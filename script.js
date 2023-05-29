const buttonElement = document.querySelector(".add-form-button");
const listElement = document.querySelector(".comments");
const nameInputElement = document.querySelector(".add-form-name");
const commentInputElement = document.querySelector(".add-form-text");

let comentarios = [];
let isInitialLoading = true;

fetchGet = () => {
    fetch('https://webdev-hw-api.vercel.app/api/v1/JulieSemenova/comments',
        {
            method: "GET"
        })
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
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
            renderComments();
        });
};

fetchGet();

const initLikeButtonsElements = () => {
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = button.dataset.index;
            const comment = comentarios[index];

            comment.likesNumber = comment.isLiked ? comment.likesNumber - 1 : comment.likesNumber + 1;
            comment.isLiked = !comment.isLiked;

            renderComments();
        });
    });
};

const initCommsListeners = () => {
    const comms = document.querySelectorAll('.comment');

    comms.forEach((comm) => {
        comm.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = comm.dataset.index;
            const comment = comentarios[index];

            commentInputElement.value = `${comentarios[index].name}: ${comentarios[index].text}`;

            renderComments();
        });
    });
};

const renderComments = () => {
    if (isInitialLoading) {
        listElement.innerHTML = "Загружаю комментарии...";
        return;
    }
    const commentsHtml = comentarios.map((comment, index) => {
        if (comment.isLiked) {
            return `<li class="comment" data-index='${index}'>
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesNumber}</span>
            <button class="like-button -active-like" data-index='${index}'></button>
          </div>
        </div>
      </li>`;
        } else {
            return `<li class="comment" data-index='${index}'>
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesNumber}</span>
            <button class="like-button" data-index='${index}'></button>
          </div>
        </div>
      </li>`;
        }
    }).join('');
    listElement.innerHTML = commentsHtml;
    initLikeButtonsElements();
    initCommsListeners();
}

renderComments();

buttonElement.addEventListener("click", () => {
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
        .then((responseData) => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            nameInputElement.value = "";
            commentInputElement.value = "";

            fetchGet();
            renderComments();

        })
        .catch((error) => {

            if (!navigator.onLine) {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
            }

            console.warn(error);
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
        });
    renderComments();

});