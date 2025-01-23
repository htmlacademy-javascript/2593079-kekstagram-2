const COMMENTS_STEP = 5;

const FiltersList = {
  CHROME: {
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    STEP: 0.1,
    UNIT_OF_MEASUREMENT: '',
    EFFECT: 'grayscale'

  },
  SEPIA: {
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    STEP: 0.1,
    UNIT_OF_MEASUREMENT: '',
    EFFECT: 'sepia'

  },
  MARVIN: {
    MIN_VALUE: 0,
    MAX_VALUE: 100,
    STEP: 1,
    UNIT_OF_MEASUREMENT: '%',
    EFFECT: 'invert'

  },
  PHOBOS: {
    MIN_VALUE: 0,
    MAX_VALUE: 3,
    STEP: 0.1,
    UNIT_OF_MEASUREMENT: 'px',
    EFFECT: 'blur'

  },
  HEAT: {
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

export { COMMENTS_STEP, FiltersList, Scale, AlertType };


