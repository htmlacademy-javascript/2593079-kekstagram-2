import { openBigPhotoPopup } from './big-picture-popup.js';
import { getPictures } from './api.js';
import { closeUploadOverlay, setUploadFormSubmit } from './upload-form.js';
import { renderPictures, showDataError } from './render-pictures.js';

getPictures().then((photos) => renderPictures(photos)).catch(showDataError);

document.addEventListener('click', (e) => {
  const currentPicture = e.target.closest('.picture');

  if (currentPicture) {
    e.preventDefault();
    getPictures().then((photos) => openBigPhotoPopup(photos, currentPicture.dataset.photoId), showDataError);
  }
});

setUploadFormSubmit(closeUploadOverlay);
