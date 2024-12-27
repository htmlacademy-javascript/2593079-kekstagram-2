import { show, hide } from './utils.js';
import { SCALE, FILTERS } from './consts.js';
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
    closeUploadOverlay(e);
  }
}

function closeUploadOverlay(e) {
  document.removeEventListener('keydown', onUploadOverlayKeydown);
  e.preventDefault();

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

//FILTERS FUNCTIONALITY
const uploadFormPreviewImg = uploadForm.querySelector('.img-upload__preview');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const effectsSlider = uploadForm.querySelector('.effect-level__slider');
const effectsValue = uploadForm.querySelector('.effect-level__value');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');

function onSmallerBtnClick(e) {
  e.preventDefault();
  updateScale(false);
}
function onBiggerBtnClick(e) {
  e.preventDefault();
  updateScale(true);
}
function updateScale(isIncreasing) {
  let scaleValue = parseInt(scaleControl.value, 10);

  // Увеличиваем или уменьшаем масштаб в зависимости от переданного аргумента
  scaleValue = isIncreasing
    ? scaleValue + SCALE.SCALE_STEP
    : scaleValue - SCALE.SCALE_STEP;

  // Ограничиваем значение в пределах допустимого диапазона
  scaleValue = Math.max(SCALE.MIN_SCALE, Math.min(SCALE.MAX_SCALE, scaleValue));

  scaleControl.value = `${scaleValue}%`;
  uploadFormPreviewImg.style.transform = `scale(${scaleValue / 100})`;
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
      if (Number.isInteger(value)) {
        return value;
      } else {
        return value.toFixed(1);
      }
    },
    from: function (value) {
      return value;
    }
  }
});

function updateEffectsSlider(effect) {
  effectsSlider.noUiSlider.updateOptions({
    range: {
      max: FILTERS[effect].MAX_VALUE,
      min: FILTERS[effect].MIN_VALUE,
    },
    step: FILTERS[effect].STEP,
    start: FILTERS[effect].MAX_VALUE,
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
    uploadFormPreviewImg.style.filter = `${FILTERS[currentEffect].EFFECT}(${effectsValue.value + FILTERS[currentEffect].UNIT_OF_MEASUREMENT}`;
  }
});

uploadForm.querySelector('.img-upload__effects').addEventListener('change', (e) => {
  const currentEffect = e.target.closest('input[name="effect"]').value;
  if (currentEffect) {
    if (currentEffect === 'none') {
      hideEffectsContainer();
    } else {
      show(sliderContainer);
      updateEffectsSlider(currentEffect);
      uploadFormPreviewImg.style.filter = `${FILTERS[currentEffect].EFFECT}(${effectsValue.value + FILTERS[currentEffect].UNIT_OF_MEASUREMENT}`;
    }
  }
});

hideEffectsContainer();
