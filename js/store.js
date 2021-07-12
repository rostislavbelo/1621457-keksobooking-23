import {
  AVATAR_NUMBERS
} from './constants.js';

let initialData = null;
let preparedData = null;

const getData = () => preparedData;

const prepareData = (filterFn) => {
  preparedData = [...initialData];

  if (typeof (filterFn) === 'function') {
    preparedData = preparedData.filter(filterFn);
  }

  preparedData = preparedData.slice(0, AVATAR_NUMBERS);
};

const storeData = (data) => {
  initialData = data;
  preparedData = data;
};

export { getData, storeData, prepareData };
