import { show, hide, showElementFromTemplate, isEscapeKey, blockSubmitButton, activateSubmitButton } from './utils.js';
import { Scale, Filters, AlertType } from './consts.js';
import { sendData } from './api.js';
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

const getAlertElement = () => Object.values(AlertType).map((value) => document.querySelector(`.${value}`)).find((elem) => elem);
function onUploadOverlayKeydown(e) {
  if (isEscapeKey(e) && !getAlertElement()) {
    closeUploadOverlay(e);
  }
}

function closeUploadOverlay() {
  document.removeEventListener('keydown', onUploadOverlayKeydown);
  hide(uploadOverlay);
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  changeImgScale();

  uploadForm.querySelector('input[name="effect"][value="none"]').dispatchEvent(new Event('change', {
    bubbles: true
  }));
}

const showUploadOverlay = () => {
  show(uploadOverlay);
  document.body.classList.add('modal-open');
};

uploadInput.addEventListener('change', () => {
  showUploadOverlay();
  document.addEventListener('keydown', onUploadOverlayKeydown);
});

uploadFormCancelElem.addEventListener('click', closeUploadOverlay);
function onAlertKeydown(e) {
  if (isEscapeKey(e)) {
    //onAlertKeydown срабатывает раньше onUploadOverlayKeydown, поэтому при нажатии escape закрывается и форма и сообщение об ошибке
    setTimeout(closeAlertElement, 0);
  }
}
function closeAlertElement() {
  getAlertElement()?.remove();
  document.body.removeEventListener('keydown', onAlertKeydown);
}

function onAlertClick(e) {
  const currentElement = e.target.closest('[class*="__inner"]');
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
  document.body.addEventListener('keydown', onAlertKeydown);
}

const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      const formData = new FormData(e.target);
      sendData(formData)
        .then(() => {
          showAlert('success', 'Данные успешно отправлены');
          onSuccess();
        }).catch(() => showAlert('error', 'Ошибка при отправке данных')).finally(activateSubmitButton());
    }
  });
};

//FILTERS FUNCTIONALITY
const uploadFormPreviewImg = uploadForm.querySelector('.img-upload__preview');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const effectsSlider = uploadForm.querySelector('.effect-level__slider');
const effectsValue = uploadForm.querySelector('.effect-level__value');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');

function onSmallerBtnClick(e) {
  e.preventDefault();
  updateScale(false);
  changeImgScale();
}
function onBiggerBtnClick(e) {
  e.preventDefault();
  updateScale(true);
  changeImgScale();
}
function updateScale(isIncreasing) {
  let scaleValue = parseInt(scaleControl.value, 10);

  scaleValue = isIncreasing
    ? scaleValue + Scale.SCALE_STEP
    : scaleValue - Scale.SCALE_STEP;

  scaleValue = Math.max(Scale.MIN_SCALE, Math.min(Scale.MAX_SCALE, scaleValue));

  scaleControl.value = `${scaleValue}%`;
}

function changeImgScale() {
  uploadFormPreviewImg.style.transform = `scale(${parseFloat(scaleControl.value) / 100})`;

}
uploadForm.querySelector('.scale__control--smaller').addEventListener('click', onSmallerBtnClick);
uploadForm.querySelector('.scale__control--bigger').addEventListener('click', onBiggerBtnClick);

noUiSlider.create(effectsSlider, {
  range: {
    max: 1,
    min: 0,
  },
  step: 0.1,
  start: 1,
  format: {
    to: function (value) {
      if (!Number.isInteger(value)) {
        return value.toFixed(1);
      }
      return value;
    },
    from: function (value) {
      return value;
    }
  }
});

function updateEffectsSlider(effect) {
  effectsSlider.noUiSlider.updateOptions({
    range: {
      max: Filters[effect].MAX_VALUE,
      min: Filters[effect].MIN_VALUE,
    },
    step: Filters[effect].STEP,
    start: Filters[effect].MAX_VALUE,
  });
}

function hideEffectsContainer() {
  hide(sliderContainer);
  effectsValue.value = 0;
  uploadFormPreviewImg.style.filter = 'none';
}

effectsSlider.noUiSlider.on('update', () => {
  effectsValue.value = effectsSlider.noUiSlider.get();
  const currentEffect = uploadForm.querySelector('input[name="effect"]:checked').value;
  if (!(currentEffect === 'none')) {
    uploadFormPreviewImg.style.filter = `${Filters[currentEffect].EFFECT}(${effectsValue.value + Filters[currentEffect].UNIT_OF_MEASUREMENT}`;
  }
});

uploadForm.querySelector('.img-upload__effects').addEventListener('change', (e) => {
  const currentEffect = e.target.closest('input[name="effect"]:checked').value;
  if (currentEffect) {
    if (currentEffect === 'none') {
      hideEffectsContainer();
    } else {
      show(sliderContainer);
      updateEffectsSlider(currentEffect);
      uploadFormPreviewImg.style.filter = `${Filters[currentEffect].EFFECT}(${effectsValue.value + Filters[currentEffect].UNIT_OF_MEASUREMENT}`;
    }
  }
});

hideEffectsContainer();

export { setUploadFormSubmit, closeUploadOverlay };
