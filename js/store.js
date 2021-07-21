import { AVATAR_NUMBERS } from './constants.js';

let initialData = null;
let preparedData = null;

const getData = () => preparedData;

const isFunction = (arg) => typeof arg === 'function';

const prepareData = (filterFn) => {
  preparedData = [...initialData];

  if (isFunction(filterFn)) {
    preparedData = preparedData.filter(filterFn);
  }

  preparedData = preparedData.slice(0, AVATAR_NUMBERS);
};

const storeData = (data) => {
  initialData = data;
  preparedData = data;
};

export { getData, storeData, prepareData };
