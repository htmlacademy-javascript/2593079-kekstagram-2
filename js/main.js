const NAMES = [
  'Кристина',
  'Игорь',
  'Зина',
  'Петруша',
  'Макс',
  'Кирилл',
  'Алекс',
  'Коля',
  'Ксения',
  'Алина',
];
const DESCRIPTIONS = [
  'Солнечный берег с белым песком и пальмами.',
  'Ночной город с огнями и движением автомобилей.',
  'Улыбающиеся дети, играющие в парке.',
  'Закат над горами с яркими оранжевыми и красными оттенками.',
  'Стейк на гриле с овощами на стороне.',
  'Старый замок на вершине холма, окруженный туманом.',
  'Лесная тропинка среди осенних деревьев с разноцветной листвой.',
  'Пара, прогуливающаяся по мосту, держа друг друга за руки.',
  'Домашний офис с приятной атмосферой и растениями.',
  'Уютный кафе с чашкой кофе и книгой на столе.',
  'Дети, строящие снеговика на зимнем дворе.',
  'Спокойное озеро с отражением облаков на воде.',
  'Уличный рынок с яркими фруктами и овощами.',
  'Групповой снимок друзей на пляже.',
  'Кошка, спящая на окне в солнечный день.',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !',
];
const PHOTOS_COUNT = 25;
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomInt;
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
const getPhotoId = getUniqueId(1, 25);
const getCommentId = getUniqueId(1, 1000);
function createPhoto() {
  const photoId = getPhotoId();
  const comments = getComments();

  const photo = {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInt(15, 200),
    comments,
  };

  return photo;
}

function getPhotos() {
  const photos = Array.from({ length: PHOTOS_COUNT }, createPhoto);
  return photos;
}

function createComment() {
  const commentId = getCommentId();
  const comment = {
    id: commentId,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomElement(MESSAGES),
    name: getRandomElement(NAMES),
  };

  return comment;
}

function getComments() {
  const comments = Array.from({ length: getRandomInt(0, 30) }, createComment);
  return comments;
}

getPhotos();
