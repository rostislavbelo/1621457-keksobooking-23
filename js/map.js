import { FORM } from './constants.js';

const StartPosition = {
  LAT: 35.68378,
  LNG: 139.75423,
};

const START_MAP_SKALE = 12;
const ADDRESS = FORM.querySelector('#address');

const PinImg = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const Pin = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const PinMainMarker = L.marker(
  {
    lat: StartPosition.LAT,
    lng: StartPosition.LNG,
  },
  {
    draggable: true,
    icon: PinImg,
  },
);

const addAddress = (markerName) => {
  const pinPositions = markerName.getLatLng();
  ADDRESS.value = `${(pinPositions.lat).toFixed(5)}, ${(pinPositions.lng).toFixed(5)}`;
};

const MAP = L.map('map-canvas');

const showMap = (onLoadSuccess) => {
  MAP.on('load', onLoadSuccess);

  MAP.setView({
    lat: StartPosition.LAT,
    lng: StartPosition.LNG,
  }, START_MAP_SKALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(MAP);

  PinMainMarker.addTo(MAP);

  PinMainMarker.on('moveend', (evt) => {
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
        Pin,
      });

    Marker.addTo(MAP);
    Marker.bindPopup(card(point),
      {
        keepInView: true,
      },
    );
  });
};

const setInitialStateMap = () => {
  const balun = document.querySelector('.leaflet-popup');
  const lat = StartPosition.LAT;
  const lng = StartPosition.LNG;

  PinMainMarker.setLatLng({
    lat,
    lng,
  });

  MAP.setView({
    lat,
    lng,
  }, START_MAP_SKALE);

  if (balun) {
    balun.remove();
  }
};

export {
  PinMainMarker,
  showMap,
  addAddress,
  addPins,
  setInitialStateMap
};
