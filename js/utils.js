function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomInt;
}

function hide(elem) {
  elem.classList.add('hidden');
}
function show(elem) {
  elem.classList.remove('hidden');
}
function getUniqueId(min, max) {
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
}
function getRandomElement(elements) {
  return elements[getRandomInt(0, elements.length - 1)];
}

export { getRandomInt, getUniqueId, getRandomElement, hide, show };
