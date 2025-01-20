import { showElementFromTemplate } from './utils.js';
const SHOW_DATA_ERROR_TIME = 5000;

const clearPhotos = () => {
  document.querySelectorAll('.pictures .picture')?.forEach((picture) => picture.remove());
};
const renderPictures = (photos) => {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesList = document.querySelector('.pictures');

  const picturesListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = pictureTemplate.cloneNode(true);
    const photoImg = photoElement.querySelector('img');
    photoImg.src = photo.url;
    photoImg.alt = photo.description;
    photoElement.dataset.photoId = photo.id;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    picturesListFragment.append(photoElement);
  });
  clearPhotos();
  picturesList.append(picturesListFragment);
};

const showDataError = (errorText = 'Ошибка загрузки данных, обновите страницу') => {
  const dataErrorElement = showElementFromTemplate('#data-error', errorText);
  setTimeout(() => dataErrorElement.remove(), SHOW_DATA_ERROR_TIME);

};
export { renderPictures, showDataError };
