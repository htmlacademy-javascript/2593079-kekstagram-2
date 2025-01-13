import { showElementFromTemplate } from './utils';

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

  picturesList.append(picturesListFragment);
};

const showDataError = () => {
  const dataErrorElement = showElementFromTemplate('#data-error', 'Ошибка загрузки данных, обновите страницу');
  setTimeout(() => dataErrorElement.remove(), 5000);

};
export { renderPictures, showDataError };
