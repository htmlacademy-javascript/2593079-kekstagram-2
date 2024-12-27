import { DESCRIPTIONS, PHOTOS_COUNT, NAMES, MESSAGES } from './consts.js';
import { getRandomInt, getUniqueId, getRandomElement } from './utils.js';


const getCommentId = getUniqueId(1, 1000);

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

const getPhotoId = getUniqueId(1, 25);
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
const photos = Array.from({ length: PHOTOS_COUNT }, createPhoto);

function getPhotos() {
  return photos;
}

export { getPhotos };
