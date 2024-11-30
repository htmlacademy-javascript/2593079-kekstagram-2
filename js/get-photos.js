import { getComments } from './get-comments.js';
import { DESCRIPTIONS, PHOTOS_COUNT } from './data.js';
import { getRandomInt, getUniqueId, getRandomElement } from './utils.js';

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
