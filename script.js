const buttonElement = document.querySelector(".add-form-button");
const listElement = document.querySelector(".comments");
const nameInputElement = document.querySelector(".add-form-name");
const commentInputElement = document.querySelector(".add-form-text");

let comentarios = [];


fetchGet = () => {
    const fetchPromise = fetch('https://webdev-hw-api.vercel.app/api/v1/JulieSemenova/comments',
        {
            method: "GET"
        });

    fetchPromise.then((response) => {

        response.json().then((responseData) => {
            const appComments = responseData.comments
                .map((comment) => {
                    return {
                        name: comment.author.name,
                        date: new Date(comment.date).toLocaleDateString() + ' ' + new Date(comment.date).toLocaleTimeString().slice(0, -3),
                        text: comment.text,
                        likes: comment.likes,
                        isLiked: false,
                        id: comment.id,
                    };
                });
            comentarios = appComments;
            renderComments();
        });
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

    // const currentDate = new Date();

    // comentarios.push({
    //     name: nameInputElement.value
    //         .replaceAll("<", "&lt;")
    //         .replaceAll(">", "&gt;"),
    //     date: currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString().slice(0, -3),
    //     text: commentInputElement.value
    //         .replaceAll("<", "&lt;")
    //         .replaceAll(">", "&gt;"),
    //     likesNumber: 0,
    // });


    const fetchPromise = fetch('https://webdev-hw-api.vercel.app/api/v1/JulieSemenova/comments',
        {
            method: "POST",
            body: JSON.stringify({
                name: nameInputElement.value,
                text: commentInputElement.value,
            })
        }).then((response) => {
            response.json().then((responseData) => {

                console.log(responseData);

                fetchGet();
                renderComments();

            });
        });

    renderComments();
    nameInputElement.value = "";
    commentInputElement.value = "";
});
