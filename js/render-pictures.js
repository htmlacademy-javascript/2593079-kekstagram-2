import { getPhotos } from './get-photos.js';

function renderPictures() {
  const photos = getPhotos();
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesList = document.querySelector('.pictures');

  const picturesListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = pictureTemplate.cloneNode(true);
    const photoImg = photoElement.querySelector('img');
    photoImg.src = photo.url;
    photoImg.alt = photo.description;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    picturesListFragment.append(photoElement);
  });

  picturesList.append(picturesListFragment);
}

export { renderPictures };
