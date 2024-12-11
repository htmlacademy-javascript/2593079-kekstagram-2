import { getPhotos } from './get-photos.js';
import { hide, show } from './utils.js';
const photos = getPhotos();
const bigPhotoPopup = document.querySelector('.big-picture');
const popupCancelElement = document.querySelector('.big-picture__cancel');

function onEscapeKeydown(e) {
  if (e.key === 'Escape') {
    hidePhotoPopup();
  }
}

function renderComments(photoId) {
  const currentPhoto = photos.find((photo) => photo.id === Number(photoId));
  const commentFragmentList = document.createDocumentFragment();
  currentPhoto.comments.forEach((comment) => {
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
    commentFragmentList.append(commEl);

  });

  return commentFragmentList;

}
function hidePhotoPopup(e) {
  e.preventDefault();
  hide(bigPhotoPopup);
  document.removeEventListener('keydown', onEscapeKeydown);
  document.body.classList.remove('modal-open');
}
function showPhotoPopup() {
  document.body.classList.add('modal-open');
  show(bigPhotoPopup);

  document.addEventListener('keydown', onEscapeKeydown);
}
function openBigPhotoPopup(photoId) {
  showPhotoPopup();
  const currentPhoto = photos.find((photo) => photo.id === Number(photoId));
  if (currentPhoto) {
    const comments = renderComments(photoId);
    bigPhotoPopup.querySelector('.big-picture__img img').src = currentPhoto.url;
    bigPhotoPopup.querySelector('.likes-count').textContent = currentPhoto.likes.length;
    bigPhotoPopup.querySelector('.social__comment-shown-count').textContent = currentPhoto.comments.length;
    bigPhotoPopup.querySelector('.social__comment-total-count').textContent = currentPhoto.comments.length;
    bigPhotoPopup.querySelector('.social__comments').innerHTML = '';
    bigPhotoPopup.querySelector('.social__comments').append(comments);
    bigPhotoPopup.querySelector('.social__caption').textContent = currentPhoto.description;
    hide(bigPhotoPopup.querySelector('.social__comment-shown-count'));
    hide(bigPhotoPopup.querySelector('.comments-loader'));
  }
}

popupCancelElement.addEventListener('click', hidePhotoPopup);

export { openBigPhotoPopup };
