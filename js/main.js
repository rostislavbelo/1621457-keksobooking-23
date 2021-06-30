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

disableForms();

const ads = getAds();

renderCard(ads[0]);

setTimeout(enableForms, 3000);

