const FiltersList = {
  chrome: {
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    STEP: 0.1,
    UNIT_OF_MEASUREMENT: '',
    EFFECT: 'grayscale'

  },
  sepia: {
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    STEP: 0.1,
    UNIT_OF_MEASUREMENT: '',
    EFFECT: 'sepia'

  },
  marvin: {
    MIN_VALUE: 0,
    MAX_VALUE: 100,
    STEP: 1,
    UNIT_OF_MEASUREMENT: '%',
    EFFECT: 'invert'

  },
  phobos: {
    MIN_VALUE: 0,
    MAX_VALUE: 3,
    STEP: 0.1,
    UNIT_OF_MEASUREMENT: 'px',
    EFFECT: 'blur'

  },
  heat: {
    MIN_VALUE: 1,
    MAX_VALUE: 3,
    STEP: 0.1,
    UNIT_OF_MEASUREMENT: '',
    EFFECT: 'brightness'
  },

};

const AlertType = {
  ERROR: 'error',
  SUCCESS: 'success'
};
const Scale = {
  MAX_SCALE: 100,
  MIN_SCALE: 25,
  SCALE_STEP: 25,
};
const PHOTOS_COUNT = 25;
const COMMENTS_STEP = 5;


export { PHOTOS_COUNT, COMMENTS_STEP, FiltersList, Scale, AlertType };


