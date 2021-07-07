import {
  getAds
} from './data.js';

import {
  renderCard
} from './card.js';

import {
  enableForms,
  disableForms
} from './dom-utils.js';

import {
  addValidators
} from './form.js';

import {
  PIN_MAIN_MARKER,
  showMap,
  addAddress,
  addPins
} from './map.js';


disableForms();

addValidators();

showMap(enableForms());

addAddress(PIN_MAIN_MARKER);

addPins(getAds(), renderCard);
