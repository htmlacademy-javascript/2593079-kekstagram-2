const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};
const load = (route, method = Method.GET, body = null) => fetch(`${BASE_URL}${route}`, { body, method })
  .then((response) => {
    if (!response.ok) {

      throw new Error();
    }

    return response.json();
  }).catch(() => {
    throw new Error('Ошибка при отправке/получении данных');
  });
const getData = () => fetch(`${BASE_URL}${Route.GET_DATA}`).then((response) => response.json());
const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);
let getPictures = () => {
  let pictures;
  return async function () {
    if (!pictures) {
      try {
        pictures = await getData();
      } catch {
        throw new Error();
      }
    }
    return pictures;

  };
};

getPictures = getPictures();
export { sendData, getPictures };


