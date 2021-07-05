import {
  FORM
} from './constants.js';

const START_POSITION = {
  LAT: 35.68378,
  LNG: 139.75423,
};

const ADDRESS = FORM.querySelector('#address');
const BUTTON_RESET = FORM.querySelector('.ad-form__reset');

const map = L.map('map-canvas');
const showMap = (activeMap) => {
  map.on('load', () => {
    activeMap;
  });
  map.setView({
    lat: START_POSITION.LAT,
    lng: START_POSITION.LNG,
  }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const pinImg = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinMainMarker = L.marker(
  {
    lat: START_POSITION.LAT,
    lng: START_POSITION.LNG,
  },
  {
    draggable: true,
    icon: pinImg,
  },
);

pinMainMarker.addTo(map);

const addAddress = (markerName) => {
  const pinPositions = markerName.getLatLng();
  ADDRESS.value = `${(pinPositions.lat).toFixed(5)}, ${(pinPositions.lng).toFixed(5)}`;
};

pinMainMarker.on('moveend', (evt) => {
  addAddress(evt.target);
});

BUTTON_RESET.addEventListener('click', () => {
  ADDRESS.value = `${START_POSITION.LAT},  ${START_POSITION.LNG}`;
  pinMainMarker.setLatLng({
    lat: START_POSITION.LAT,
    lng: START_POSITION.LNG,
  });

  map.setView({
    lat: START_POSITION.LAT,
    lng: START_POSITION.LNG,
  }, 10);
});

const addPins = (points, card) => {
  points.forEach((point) => {
    const { lat, lng } = point.location;
    const pin = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        pin,
      });

    marker.addTo(map);
    marker.bindPopup(card(point),
      {
        keepInView: true,
      },
    );
  });
};

export {
  pinMainMarker,
  showMap,
  addAddress,
  addPins
};
