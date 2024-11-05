// src/App.js
import React, { useState, useEffect } from 'react';
import UserInputForm from './UserInputForm';
import MapView from './MapView';
import './App.css'; // Optional: Style the app

function App() {
  const [activeTab, setActiveTab] = useState('map'); // State for active tab
  const [theftLocations, setTheftLocations] = useState([]);

  useEffect(() => {
    // Fetch theft reports from the backend when the component mounts
    const fetchTheftReports = async () => {
      try {
        const response = await fetch('http://localhost:3000/theft-reports');
        const data = await response.json();
        setTheftLocations(data);
      } catch (error) {
        console.error('Error fetching theft reports:', error);
      }
    };

    fetchTheftReports();
  }, []);

  // Handler to switch tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <header>
        <h1>Gainesville Theft Application</h1>
        <div className="tabs">
          <button
            className={activeTab === 'map' ? 'active' : ''}
            onClick={() => handleTabChange('map')}
          >
            Map View
          </button>
          <button
            className={activeTab === 'report' ? 'active' : ''}
            onClick={() => handleTabChange('report')}
          >
            Report Theft
          </button>
        </div>
      </header>
      <main>
        {activeTab === 'map' && (
          <section className="map-section">
            <MapView theftLocations={theftLocations} />
          </section>
        )}
        {activeTab === 'report' && (
          <section className="form-section">
            <UserInputForm />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
