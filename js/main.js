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
  pinMainMarker,
  showMap,
  addAddress,
  addPins
} from './map.js';


disableForms();

showMap(enableForms());

addAddress(pinMainMarker);

addPins(getAds(), renderCard);

addValidators();

