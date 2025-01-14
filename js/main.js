import { openBigPhotoPopup } from './big-picture-popup.js';
import { getData } from './api.js';
import { closeUploadOverlay, setUploadFormSubmit } from './upload-form.js';
import { renderPictures, showDataError } from './render-pictures.js';

let pictures;

getData().then((photos) => {
  pictures = photos;
  renderPictures(pictures);
})
  .catch(showDataError);

document.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();
    openBigPhotoPopup(pictures, currentPicture.dataset.photoId);
  }

});

setUploadFormSubmit(closeUploadOverlay);
