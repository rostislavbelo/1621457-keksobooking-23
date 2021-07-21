import { LIMIT_SINGS, MAIN_PIN_IMAGE, PIN_IMAGE, START_MAP_SKALE } from './constants.js';

const markers = [];

const StartPosition = {
  LAT: 35.68378,
  LNG: 139.75423,
};

const PIN_IMG = L.icon({
  iconUrl: MAIN_PIN_IMAGE,
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const PIN = L.icon({
  iconUrl: PIN_IMAGE,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const PIN_MAIN_MARKER = L.marker(
  {
    lat: StartPosition.LAT,
    lng: StartPosition.LNG,
  },
  {
    draggable: true,
    icon: PIN_IMG,
  },
);

const address = document.querySelector('#address');

const addAddress = (markerName) => {
  const pinPositions = markerName.getLatLng();
  address.value = `${(pinPositions.lat).toFixed(LIMIT_SINGS)}, ${(pinPositions.lng).toFixed(LIMIT_SINGS)}`;
};

const map = L.map('map-canvas');

const showMap = (onLoadSuccess) => {
  map.on('load', onLoadSuccess);

  map.setView({
    lat: StartPosition.LAT,
    lng: StartPosition.LNG,
  }, START_MAP_SKALE);

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
    const Marker = L.marker(
      {
        lat: point.location.lat,
        lng: point.location.lng,
      },
      {
        PIN,
      });

    Marker.addTo(map);
    Marker.bindPopup(card(point),
      {
        keepInView: true,
      },
    );
    markers.push(Marker);
  });
};

const resetAddress = () => {
  address.value = `${StartPosition.LAT}, ${StartPosition.LNG}`;
};

const setInitialStateMap = () => {
  const balun = document.querySelector('.leaflet-popup');

  PIN_MAIN_MARKER.setLatLng({
    lat: StartPosition.LAT,
    lng: StartPosition.LNG,
  });

  map.setView({
    lat: StartPosition.LAT,
    lng: StartPosition.LNG,
  }, START_MAP_SKALE);

  if (balun) {
    balun.remove();
  }
  resetAddress();
};

const removePins = () => {
  markers.forEach((marker) => map.removeLayer(marker));
};

export {
  PIN_MAIN_MARKER,
  showMap,
  addAddress,
  addPins,
  setInitialStateMap,
  removePins
};
