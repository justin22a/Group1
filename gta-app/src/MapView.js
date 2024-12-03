// src/MapView.js
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

// Define a custom icon for the markers
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const fetchTheftReports = async () => {
  try {
    const response = await fetch('http://localhost:3000/theft-reports');
    const rawData = await response.json();

    // Transform the data to match expected format
    return rawData.map(report => ({
      username: report.username || "Unknown", // Fallback for missing username
      latitude: report.latitude,
      longitude: report.longitude,
      description: report.description || "No description provided",
    }));
  } catch (error) {
    console.error('Error fetching theft reports:', error);
    return []; // Return an empty array on failure
  }
};

const MapView = () => {
  const defaultPosition = [29.6516, -82.3248]; // Center on Gainesville, FL
  const [theftLocations, setTheftLocations] = useState([]);

  useEffect(() => {
    const loadTheftReports = async () => {
      const data = await fetchTheftReports();
      setTheftLocations(data);
    };
    loadTheftReports();
  }, []);

  return (
    <MapContainer center={defaultPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {theftLocations.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          icon={customIcon}
        >
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
