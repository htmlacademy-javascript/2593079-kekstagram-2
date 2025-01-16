import { renderPictures } from './render-pictures.js';
import { debounce, shuffleArray } from './utils.js';
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const SHOWN_RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

let loadedPhotos;
const filterInput = document.querySelector('.img-filters');


const applyFilter = (filterName) => {
  let filteredPhotos = loadedPhotos.slice();
  switch (filterName) {
    case 'filter-random':
      filteredPhotos = shuffleArray(filteredPhotos).slice(0, SHOWN_RANDOM_PHOTOS_COUNT);
      break;

    case 'filter-discussed':
      filteredPhotos = filteredPhotos.sort((a, b) => b.comments.length - a.comments.length);
      break;
  }
  renderPictures(filteredPhotos);
};

const debouncedApplyFilter = debounce(applyFilter, DEBOUNCE_DELAY);


const onFilterCLick = (evt) => {
  evt.preventDefault();

  const currentTarget = evt.target;

  const currentActiveButton = filterInput.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

  if (!currentTarget.classList.contains('img-filters__button')) {
    return;
  }
  currentActiveButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentTarget.classList.toggle(ACTIVE_BUTTON_CLASS);

  debouncedApplyFilter(currentTarget.id);
};


const setFilter = (photos) => {
  loadedPhotos = photos;
  filterInput.classList.remove('img-filters--inactive');
  filterInput.addEventListener('click', onFilterCLick);
};

export { setFilter };
