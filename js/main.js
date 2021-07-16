import { renderCard } from './card.js';
import { enableForms, disableForms, onError } from './dom-utils.js';
import { addValidators, renderPins } from './form.js';
import { PIN_MAIN_MARKER, showMap, addAddress, addPins, removePins } from './map.js';
import { DATA_URL, TIMEOUT_DELAY } from './constants.js';
import { loadData } from './api.js';
import { getData, storeData, prepareData } from './store.js';
import { debounce } from './utils.js';
import { filterAd } from './filters.js';

disableForms();

const onDataLoad = (data) => {
  storeData(data);
  prepareData();
  addPins(getData(), renderCard);
};

const onMapSuccess = () => {
  enableForms();
  addAddress(PIN_MAIN_MARKER);
  loadData(DATA_URL, onDataLoad, onError);
  addValidators(debounce((renderPins), TIMEOUT_DELAY));
};

showMap(onMapSuccess);
