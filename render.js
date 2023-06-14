// import { isInitialLoading, comentarios } from "./api.js"

// const listElement = document.querySelector(".comments");

// const initLikeButtonsElements = () => {
//     const likeButtons = document.querySelectorAll('.like-button');

//     likeButtons.forEach((button) => {
//         button.addEventListener('click', (event) => {
//             event.stopPropagation();
//             const index = button.dataset.index;
//             const comment = comentarios[index];

//             comment.likesNumber = comment.isLiked ? comment.likesNumber - 1 : comment.likesNumber + 1;
//             comment.isLiked = !comment.isLiked;

//             renderComments();
//         });
//     });
// };

// const initCommsListeners = () => {
//     const comms = document.querySelectorAll('.comment');

//     comms.forEach((comm) => {
//         comm.addEventListener('click', (event) => {
//             event.stopPropagation();
//             const index = comm.dataset.index;
//             const comment = comentarios[index];

//             commentInputElement.value = `${comment.name}: ${comment.text}`;

//             renderComments();
//         });
//     });
// };

// const renderComments = (isInitialLoading, comentarios) => {
//     if (isInitialLoading) {
//         listElement.innerHTML = "Загружаю комментарии...";
//         return;
//     }
//     const commentsHtml = comentarios.map((comment, index) => {
//         if (comment.isLiked) {
//             return `<li class="comment" data-index='${index}'>
//         <div class="comment-header">
//           <div>${comment.name}</div>
//           <div>${comment.date}</div>
//         </div>
//         <div class="comment-body">
//           <div class="comment-text">
//             ${comment.text}
//           </div>
//         </div>
//         <div class="comment-footer">
//           <div class="likes">
//             <span class="likes-counter">${comment.likesNumber}</span>
//             <button class="like-button -active-like" data-index='${index}'></button>
//           </div>
//         </div>
//       </li>`;
//         } else {
//             return `<li class="comment" data-index='${index}'>
//         <div class="comment-header">
//           <div>${comment.name}</div>
//           <div>${comment.date}</div>
//         </div>
//         <div class="comment-body">
//           <div class="comment-text">
//             ${comment.text}
//           </div>
//         </div>
//         <div class="comment-footer">
//           <div class="likes">
//             <span class="likes-counter">${comment.likesNumber}</span>
//             <button class="like-button" data-index='${index}'></button>
//           </div>
//         </div>
//       </li>`;
//         }
//     }).join('');
//     listElement.innerHTML = commentsHtml;
//     initLikeButtonsElements();
//     initCommsListeners();
// }

// export { renderComments };