import { Filters, Scale } from './consts';
import { hide, show } from './utils';

const uploadForm = document.querySelector('#upload-select-image');
const uploadFormPreviewImg = uploadForm.querySelector('.img-upload__preview');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const effectsSlider = uploadForm.querySelector('.effect-level__slider');
const effectsValue = uploadForm.querySelector('.effect-level__value');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');

function onSmallerBtnClick(evt) {
  evt.preventDefault();
  updateScale(false);
  changeImgScale();
}
function onBiggerBtnClick(evt) {
  evt.preventDefault();
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

uploadForm.querySelector('.img-upload__effects').addEventListener('change', (evt) => {
  const currentEffect = evt.target.closest('input[name="effect"]:checked').value;
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

export { changeImgScale };
