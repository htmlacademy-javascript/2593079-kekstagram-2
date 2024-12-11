import { openBigPhotoPopup } from './big-picture-popup.js';
import { renderPictures } from './render-pictures.js';

renderPictures();

document.addEventListener('click', (e) => {
  const currentPicture = e.target.closest('.picture');

  if (currentPicture) {
    openBigPhotoPopup(currentPicture.dataset.photoId);
  }
});
