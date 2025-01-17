import { show, hide, showElementFromTemplate, isEscapeKey, blockSubmitButton, activateSubmitButton } from './utils.js';
import { AlertType } from './consts.js';
import { sendData } from './api.js';
import { changeImgScale } from './effects.js';
import { showDataError } from './render-pictures.js';
const uploadForm = document.querySelector('#upload-select-image');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');
const uploadFormCancelElem = uploadForm.querySelector('.img-upload__cancel');
const uploadFormPreview = uploadForm.querySelector('.img-upload__preview img');
const HASHTAGS_ERRORS = {
  maxCount: 'Максимум 5 хэштегов',
  invalidHashtag: 'Хэштег начинается с символа # и состоит только из букв и цифр и не превышает длину 20 символов',
  repeatedHashtags: 'Хэштеги не должны повторяться'
};
const FYLES_TYPE_LIST = ['png', 'jpeg', 'jpg'];
const HASHTAGS_MAX_COUNT = 5;
const MAX_DESCRIPTION_LETTERS_COUNT = 140;

function parseHashtags(hashtags) {
  return hashtags.split(' ').filter(Boolean).map((hashtag) => hashtag.toLowerCase());
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  succesClass: 'has-success',
  errorClass: '--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text',

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
      const hashRegExp = /^#[a-zA-Zа-яА-Яё0-9]{1,19}$/i;
      return hashRegExp.test(hashtag);
    });
  }
  return true;
}, HASHTAGS_ERRORS.invalidHashtag);

hashtagsInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

descriptionInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
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

const getAlertElement = () => Object.values(AlertType).map((value) => document.querySelector(`.${value}`)).find((elem) => elem);
function onUploadOverlayKeydown(evt) {
  if (isEscapeKey(evt) && !getAlertElement()) {
    closeUploadOverlay(evt);
  }
}

function closeUploadOverlay() {
  document.removeEventListener('keydown', onUploadOverlayKeydown);
  hide(uploadOverlay);
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  changeImgScale();

  uploadForm.querySelector('input[name="effect"][value="none"]').dispatchEvent(new Event('change', {
    bubbles: true
  }));

}

const setPreview = (src) => {
  uploadFormPreview.src = src;
  Array.from(document.querySelectorAll('.effects__preview')).forEach((el) => {
    el.style.backgroundImage = `url(${src})`;
  });
};

const showUploadOverlay = () => {
  show(uploadOverlay);
  document.body.classList.add('modal-open');
};

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FYLES_TYPE_LIST.some((it) => fileName.endsWith(it));
  if (matches) {
    const previewSrc = URL.createObjectURL(file);
    showUploadOverlay();
    setPreview(previewSrc);
    document.addEventListener('keydown', onUploadOverlayKeydown);
  } else {
    showDataError('Неправильный формат картинки');
  }
});

uploadFormCancelElem.addEventListener('click', closeUploadOverlay);
function onAlertKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeAlertElement();
  }
}
function closeAlertElement() {
  getAlertElement()?.remove();
  document.removeEventListener('keydown', onAlertKeydown);
}

function onAlertClick(evt) {
  const currentElement = evt.target.closest('[class*="__inner"]');
  if (!currentElement) {
    closeAlertElement();
  }
}

function showAlert(type, message) {
  const alertElement = showElementFromTemplate(`#${type}`, message);
  alertElement.querySelector(`.${type}__button`).addEventListener('click', () => {
    closeAlertElement();
  });

  alertElement.addEventListener('click', onAlertClick);
  document.addEventListener('keydown', onAlertKeydown);
}

const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(formData).then(() => {
        showAlert('success', 'Данные успешно отправлены');
        onSuccess();
      })
        .catch(() => showAlert('error', 'Ошибка при отправке данных'))
        .finally(activateSubmitButton);
    }
  });
};

export { setUploadFormSubmit, closeUploadOverlay };
