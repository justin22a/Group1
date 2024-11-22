import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 hook
import UserInputForm from './UserInputForm';
import MapView from './MapView';
import LoginButton from './loginButton'; // Authentication components
import LogoutButton from './logoutButton';
import './App.css'; // Optional: Style the app

function App() {
  const { isAuthenticated } = useAuth0(); // Check authentication status
  const [activeTab, setActiveTab] = useState('map'); // State for active tab
  const [theftLocations, setTheftLocations] = useState([]);



  // Handler to switch tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <header>
        <h1>Gainesville Theft Application</h1>
        <div className="auth-buttons">
          {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
        </div>
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
        {!isAuthenticated ? (
          <p>Please log in to view content.</p>
        ) : (
          <>
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
          </>
        )}
      </main>
    </div>
  );
}

export default App;
