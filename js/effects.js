import { FiltersList, Scale } from './consts.js';
import { hide, show } from './utils.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadFormPreviewImg = uploadForm.querySelector('.img-upload__preview img');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const effectsSlider = uploadForm.querySelector('.effect-level__slider');
const effectsValue = uploadForm.querySelector('.effect-level__value');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');

const updateScale = (isIncreasing) => {
  let scaleValue = parseInt(scaleControl.value, 10);

  scaleValue = isIncreasing
    ? scaleValue + Scale.SCALE_STEP
    : scaleValue - Scale.SCALE_STEP;

  scaleValue = Math.max(Scale.MIN_SCALE, Math.min(Scale.MAX_SCALE, scaleValue));

  scaleControl.value = `${scaleValue}%`;
};

const changeImgScale = () => {
  uploadFormPreviewImg.style.transform = `scale(${parseFloat(scaleControl.value) / 100})`;
};

const onSmallerBtnClick = (evt) => {
  evt.preventDefault();
  updateScale(false);
  changeImgScale();
};
const onBiggerBtnClick = (evt) => {
  evt.preventDefault();
  updateScale(true);
  changeImgScale();
};

const hideEffectsContainer = () => {
  hide(sliderContainer);
  effectsValue.value = 0;
  uploadFormPreviewImg.style.filter = 'none';
};
const applyEffect = (currentEffect) => {
  uploadFormPreviewImg.style.filter = `${FiltersList[currentEffect].EFFECT}(${effectsValue.value.toLowerCase() + FiltersList[currentEffect].UNIT_OF_MEASUREMENT}`;
};
const getCurrentEffect = () => uploadForm.querySelector('input[name="effect"]:checked').value.toUpperCase();

const updateEffectsSlider = (effect) => {
  effectsSlider.noUiSlider.updateOptions({
    range: {
      max: FiltersList[effect].MAX_VALUE,
      min: FiltersList[effect].MIN_VALUE,
    },
    step: FiltersList[effect].STEP,
    start: FiltersList[effect].MAX_VALUE,
  });
};


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

effectsSlider.noUiSlider.on('update', () => {

  effectsValue.value = effectsSlider.noUiSlider.get();
  const currentEffect = getCurrentEffect();
  if (!(currentEffect === 'NONE') && currentEffect) {
    applyEffect(currentEffect);
  }
});

uploadForm.querySelector('.img-upload__effects').addEventListener('change', () => {
  const currentEffect = getCurrentEffect();

  if (currentEffect) {
    if (currentEffect === 'NONE') {
      hideEffectsContainer();
    } else {
      show(sliderContainer);
      updateEffectsSlider(currentEffect);

      applyEffect(currentEffect);
    }
  }
});

hideEffectsContainer();

export { changeImgScale };
