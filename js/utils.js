const SubmitButtonValue = {
  IDLE: 'Опубликовать',
  PENDING: 'Отправка...'
};
const submitButton = document.querySelector('.img-upload__submit');

const hide = (elem) => {
  elem.classList.add('hidden');
};
const show = (elem) => {
  elem.classList.remove('hidden');
};

const shuffleArray = (arr) => arr.slice().sort(() => 0.5 - Math.random());

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonValue.PENDING;
};

const activateSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonValue.IDLE;
};

const debounce = (cb, debounceDelay) => {
  let timerId;

  return function (...rest) {
    clearTimeout(timerId);
    timerId = setTimeout(() => cb.apply(this, rest), debounceDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showElementFromTemplate = (selector, message) => {
  const dataElement = document.querySelector(selector).content.querySelector(`.${selector.slice(1)}`).cloneNode(true);
  dataElement.querySelector('h2').textContent = message;
  document.body.append(dataElement);
  return dataElement;
};

export { hide, show, showElementFromTemplate, isEscapeKey, blockSubmitButton, activateSubmitButton, shuffleArray, debounce };
