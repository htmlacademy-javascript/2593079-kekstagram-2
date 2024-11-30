import { getRandomInt, getUniqueId, getRandomElement } from './utils.js';
import { NAMES, MESSAGES } from './data.js';

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
const comments = Array.from({ length: getRandomInt(0, 30) }, createComment);

function getComments() {
  return comments;
}

export { getComments };

