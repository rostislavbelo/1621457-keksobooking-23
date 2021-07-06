import {
  FORM
} from './constants.js';

const START_POSITION = {
  LAT: 35.68378,
  LNG: 139.75423,
};

const ADDRESS = FORM.querySelector('#address');
const BUTTON_RESET = FORM.querySelector('.ad-form__reset');

const PIN_IMG = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});


const PIN = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const PIN_MAIN_MARKER = L.marker(
  {
    lat: START_POSITION.LAT,
    lng: START_POSITION.LNG,
  },
  {
    draggable: true,
    icon: PIN_IMG,
  },
);

const addAddress = (markerName) => {
  const pinPositions = markerName.getLatLng();
  ADDRESS.value = `${(pinPositions.lat).toFixed(5)}, ${(pinPositions.lng).toFixed(5)}`;
};

const map = L.map('map-canvas');

const showMap = (active) => {
  map.on('load', () => {
    active;
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

  PIN_MAIN_MARKER.addTo(map);

  PIN_MAIN_MARKER.on('moveend', (evt) => {
    addAddress(evt.target);
  });
};

const addPins = (points, card) => {
  points.forEach((point) => {
    const lat = point.location.lat;
    const lng = point.location.lng;

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        PIN,
      });

    marker.addTo(map);
    marker.bindPopup(card(point),
      {
        keepInView: true,
      },
    );
  });
};

BUTTON_RESET.addEventListener('click', () => {
  ADDRESS.value = `${START_POSITION.LAT},  ${START_POSITION.LNG}`;
  PIN_MAIN_MARKER.setLatLng({
    lat: START_POSITION.LAT,
    lng: START_POSITION.LNG,
  });

  map.setView({
    lat: START_POSITION.LAT,
    lng: START_POSITION.LNG,
  }, 10);
});

export {
  PIN_MAIN_MARKER,
  showMap,
  addAddress,
  addPins
};
