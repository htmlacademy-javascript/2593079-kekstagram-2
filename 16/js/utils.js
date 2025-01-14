const SubmitButtonValue = {
  IDLE: 'Опубликовать',
  PENDING: 'Отправка...'
};
const submitButton = document.querySelector('.img-upload__submit');
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomInt;
};

const hide = (elem) => {
  elem.classList.add('hidden');
};
const show = (elem) => {
  elem.classList.remove('hidden');
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonValue.PENDING;
};

const activateSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonValue.IDLE;
};

const getUniqueId = (min, max) => {
  const receivedId = [];

  return function () {
    if (receivedId.length >= max - min + 1) {
      return receivedId[receivedId.length - 1];
    }
    let currentId = getRandomInt(min, max);
    while (receivedId.includes(currentId)) {
      currentId = getRandomInt(min, max);
    }
    receivedId.push(currentId);
    return currentId;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';
const getRandomElement = (elements) => elements[getRandomInt(0, elements.length - 1)];
const showElementFromTemplate = (selector, message) => {
  const dataElement = document.querySelector(selector).content.querySelector(`.${selector.slice(1)}`).cloneNode(true);
  dataElement.querySelector('h2').textContent = message;
  document.body.append(dataElement);
  return dataElement;
};

export { getRandomInt, getUniqueId, getRandomElement, hide, show, showElementFromTemplate, isEscapeKey, blockSubmitButton, activateSubmitButton };
