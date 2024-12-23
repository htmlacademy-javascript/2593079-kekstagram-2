import { show, hide } from './utils.js';
const uploadForm = document.querySelector('#upload-select-image');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');
const uploadFormCancelElem = uploadForm.querySelector('.img-upload__cancel');
const HASHTAGS_ERRORS = {
  maxCount: 'Максимум 5 хэштегов',
  invalidHashtag: 'Хэштег начинается с символа # и состоит только из букв и цифр и не превышает длину 20 символов',
  repeatedHashtags: 'Хэштеги не должны повторяться'
};
const HASHTAGS_MAX_COUNT = 5;
const MAX_DESCRIPTION_LETTERS_COUNT = 140;

function parseHashtags(hashtags) {
  return hashtags.trim().split(' ').map((hashtag) => hashtag.toLowerCase());
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  succesClass: 'has-success',
  errorClass: '--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper',

}, true);

pristine.addValidator(hashtagsInput, (value) => {
  if (value.length) {
    const hashtags = parseHashtags(value);
    const uniqueHashtags = new Set(hashtags);
    if (uniqueHashtags.size !== hashtags.length) {
      return false;
    }
  }
  return true;

}, HASHTAGS_ERRORS.repeatedHashtags);
pristine.addValidator(hashtagsInput, (value) => {
  if (value.length) {
    const hashtags = parseHashtags(value);

    if (hashtags.length > HASHTAGS_MAX_COUNT) {
      return false;
    }
  }
  return true;

}, HASHTAGS_ERRORS.maxCount);
pristine.addValidator(hashtagsInput, (value) => {
  if (value.length) {
    const hashtags = parseHashtags(value);

    return hashtags.every((hashtag) => {
      const hashRegExp = /^#[a-zа-яё0-9]{1,19}$/i;
      return hashRegExp.test(hashtag);
    });
  }
  return true;
}, HASHTAGS_ERRORS.invalidHashtag);

hashtagsInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.stopPropagation();
  }
});

descriptionInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.stopPropagation();
  }
});
pristine.addValidator(descriptionInput, (value) => {
  if (value.length) {
    if (value.length > MAX_DESCRIPTION_LETTERS_COUNT) {
      return false;
    }
  }
  return true;
}, 'Максимальная длина комментария 140 символов');
function onUploadOverlayKeydown(e) {
  if (e.key === 'Escape') {
    closeUploadOverlay();
  }
}

function closeUploadOverlay(e) {
  document.removeEventListener('keydown', onUploadOverlayKeydown);
  if (e) {
    e.preventDefault();
  }
  hide(uploadOverlay);
  document.body.classList.remove('modal-open');
  uploadForm.reset();
}

uploadInput.addEventListener('change', () => {
  showUploadOverlay();
  document.addEventListener('keydown', onUploadOverlayKeydown);
});

function showUploadOverlay() {
  show(uploadOverlay);
  document.body.classList.add('modal-open');
}

uploadFormCancelElem.addEventListener('click', closeUploadOverlay);
uploadForm.addEventListener('submit', (e) => {
  if (!pristine.validate()) {
    e.preventDefault();

  }

});

