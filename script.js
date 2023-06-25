import { fetchGet, fetchPost } from "./api.js";
import { renderLoginComponent } from "./login-component.js";

let token = null;
export const getToken = () => token;
export const setToken = newToken => {
  token = newToken;
}


let comentarios = [];
// let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

let isInitialLoading = true;

// fetchGet();

const fetchCommsAndRender = () => {
  // вызвать рендер ап
  return fetchGet()
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
      renderApp(isInitialLoading, comentarios);
    });
};

fetchCommsAndRender();

const appEl = document.getElementById('app');

const renderApp = (isInitialLoading, comentarios) => {

  const commentsHtml = comentarios.map((comment, index) => {
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
                      <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index='${index}'></button>
                    </div>
                  </div>
              </li>`;
  }).join('');


  const appHtml = `<div class="container">
  <ul class="comments">
    <!-- рендеринг -->
    ${commentsHtml}
  </ul>

  ${!token ?
      '<div><a class="link-enter" href="#">Перейти ко входу</a></div>'
      :
      `<div class="add-form">
    <input type="text" class="add-form-name" placeholder="Введите ваше имя" />
    <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
    <div class="add-form-row">
      <button class="add-form-button">Написать</button>
    </div>
  </div>`}
  `

  appEl.innerHTML = appHtml;
  const listElement = document.querySelector(".comments");

  if (token) {
    initButtonSend();
    initLikeButtonsElements();
    initCommsListeners();

  } else {
    const aufLinkElement = document.querySelector(".link-enter");
    aufLinkElement.addEventListener('click', () => {
      renderLoginComponent({ appEl, setToken, fetchCommsAndRender })
    })
  }

  if (isInitialLoading) {
    console.log(listElement);
    listElement.innerHTML = "Загружаю комментарии...";
  }
}

const initButtonSend = () => {
  const buttonElement = document.querySelector(".add-form-button");
  const nameInputElement = document.querySelector(".add-form-name");
  const commentInputElement = document.querySelector(".add-form-text");
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

    fetchPost()
      .then(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
        nameInputElement.value = "";
        commentInputElement.value = "";

        fetchCommsAndRender();

      })
      .catch((error) => {

        if (!navigator.onLine) {
          alert('Кажется, у вас сломался интернет, попробуйте позже');
        }

        console.warn(error);
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
      });

    buttonElement.disabled = true;
    buttonElement.textContent = "Комментарий добавляется";
  });
}

const initLikeButtonsElements = () => {
  const likeButtons = document.querySelectorAll('.like-button');

  likeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = button.dataset.index;
      const comment = comentarios[index];

      comment.likesNumber = comment.isLiked ? comment.likesNumber - 1 : comment.likesNumber + 1;
      comment.isLiked = !comment.isLiked;

      console.log(comment);

      renderApp(isInitialLoading, comentarios);


    });
  });
};

const initCommsListeners = () => {
  const comms = document.querySelectorAll('.comment');
  const commentInputElement = document.querySelector(".add-form-text");
  comms.forEach((comm) => {
    comm.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = comm.dataset.index;
      const comment = comentarios[index];

      commentInputElement.value = `${comment.name}: ${comment.text}`;

      renderApp();
    });
  });
};

fetchCommsAndRender();