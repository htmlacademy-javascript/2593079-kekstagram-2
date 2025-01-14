import { COMMENTS_STEP } from './consts.js';
import { hide, show } from './utils.js';
const bigPhotoPopup = document.querySelector('.big-picture');
const popupCancelElement = document.querySelector('.big-picture__cancel');
const commentsLoadBtn = bigPhotoPopup.querySelector('.comments-loader');

let currentComments = null;
let currentShownCommentsCount = 0;

function onEscapeKeydown(evt) {
  if (evt.key === 'Escape') {
    hidePhotoPopup(evt);
  }
}

function onLoadBtnClick(evt) {
  evt.preventDefault();
  loadComments();
}

function loadComments() {
  if (currentComments.length > currentShownCommentsCount) {
    currentComments.slice(currentShownCommentsCount, currentShownCommentsCount + COMMENTS_STEP).forEach((comment) => {
      const commEl = document.createElement('li');
      commEl.className = 'social__comment';

      const imgEl = document.createElement('img');
      imgEl.className = 'social__picture';
      imgEl.src = comment.avatar;
      imgEl.alt = comment.name;
      imgEl.width = 35;
      imgEl.height = 35;

      const pEl = document.createElement('p');
      pEl.className = 'social__text';
      pEl.textContent = comment.message;

      commEl.append(imgEl);
      commEl.append(pEl);
      bigPhotoPopup.querySelector('.social__comments').append(commEl);
      currentShownCommentsCount++;
    });

    bigPhotoPopup.querySelector('.social__comment-shown-count').textContent = bigPhotoPopup.querySelectorAll('.social__comment').length;
    checkShownCommentsCount();
  }
}

function clearComments() {
  bigPhotoPopup.querySelector('.social__comments').innerHTML = '';
  currentShownCommentsCount = 0;
}

function renderComments(comments) {
  clearComments();
  currentComments = comments;
  loadComments();
}
function hidePhotoPopup(evt) {
  evt.preventDefault();
  clearComments();
  hide(bigPhotoPopup);
  document.removeEventListener('keydown', onEscapeKeydown);
  document.body.classList.remove('modal-open');

}
function showPhotoPopup() {
  document.body.classList.add('modal-open');
  show(bigPhotoPopup);

  document.addEventListener('keydown', onEscapeKeydown);
}
function openBigPhotoPopup(photos, photoId) {
  showPhotoPopup();
  const currentPhoto = photos.find((photo) => photo.id === Number(photoId));
  if (currentPhoto) {
    renderComments(currentPhoto.comments);
    bigPhotoPopup.querySelector('.big-picture__img img').src = currentPhoto.url;
    bigPhotoPopup.querySelector('.likes-count').textContent = currentPhoto.likes.length;
    bigPhotoPopup.querySelector('.social__comment-total-count').textContent = currentPhoto.comments.length;
    bigPhotoPopup.querySelector('.social__caption').textContent = currentPhoto.description;
    bigPhotoPopup.querySelector('.likes-count').textContent = currentPhoto.likes;

  }
}

function checkShownCommentsCount() {
  if (currentComments.length <= currentShownCommentsCount) {
    hide(commentsLoadBtn);
  } else {
    show(commentsLoadBtn);
  }
}

popupCancelElement.addEventListener('click', hidePhotoPopup);
commentsLoadBtn.addEventListener('click', onLoadBtnClick);
export { openBigPhotoPopup };
