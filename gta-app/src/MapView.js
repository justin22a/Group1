// src/MapView.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ theftLocations = [] }) => {
  const defaultPosition = [29.6516, -82.3248]; // Center on Gainesville, FL

  return (
    <MapContainer center={defaultPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {theftLocations.map((location, index) => (
        <Marker key={index} position={[location.latitude, location.longitude]}>
          <Popup>
            <strong>{location.username}</strong>
            <p>{location.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
