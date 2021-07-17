import { FORM, LIMIT_SINGS } from './constants.js';

const markers = [];

const START_POSITION = {
  LAT: 35.68378,
  LNG: 139.75423,
};

const START_MAP_SKALE = 12;
const ADDRESS = FORM.querySelector('#address');

const PIN_IMG = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const PIN = L.icon({
  iconUrl: 'img/pin.svg',
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
  ADDRESS.value = `${(pinPositions.lat).toFixed(LIMIT_SINGS)}, ${(pinPositions.lng).toFixed(LIMIT_SINGS)}`;
};

const MAP = L.map('map-canvas');

const showMap = (onLoadSuccess) => {
  MAP.on('load', onLoadSuccess);

  MAP.setView({
    lat: START_POSITION.LAT,
    lng: START_POSITION.LNG,
  }, START_MAP_SKALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(MAP);

  PIN_MAIN_MARKER.addTo(MAP);

  PIN_MAIN_MARKER.on('moveend', (evt) => {
    addAddress(evt.target);
  });
};

const addPins = (points, card) => {
  points.forEach((point) => {
    const Marker = L.marker(
      {
        lat: point.location.lat,
        lng: point.location.lng,
      },
      {
        PIN,
      });

    Marker.addTo(MAP);
    Marker.bindPopup(card(point),
      {
        keepInView: true,
      },
    );
    markers.push(Marker);
  });
};

const resetAddress = () => {
  ADDRESS.value = `${START_POSITION.LAT}, ${START_POSITION.LNG}`;
};

const setInitialStateMap = () => {
  const balun = document.querySelector('.leaflet-popup');

  PIN_MAIN_MARKER.setLatLng({
    lat: START_POSITION.LAT,
    lng: START_POSITION.LNG,
  });

  MAP.setView({
    lat: START_POSITION.LAT,
    lng: START_POSITION.LNG,
  }, START_MAP_SKALE);

  if (balun) {
    balun.remove();
  }
  resetAddress();
};

const removePins = () => {
  markers.forEach((marker) => MAP.removeLayer(marker));
};

export {
  PIN_MAIN_MARKER,
  showMap,
  addAddress,
  addPins,
  setInitialStateMap,
  removePins
};
