import {
  getAds
} from './data.js';

import {
  renderCard
} from './card.js';

const ads = getAds();
renderCard(ads[0]);

