import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 hook
import UserInputForm from './UserInputForm';
import MapView from './MapView';
import LoginButton from './loginButton'; // Authentication components
import LogoutButton from './logoutButton';
import './App.css'; // Style the app

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
      <header className="app-header">
        <h1>Gainesville Theft Tracker</h1>
        <div className="auth-buttons">
          {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
        </div>
        <nav className="tabs">
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
        </nav>
      </header>
      <main className="content">
        {!isAuthenticated ? (
          <p className="auth-message">Please log in to access the application.</p>
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
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Gainesville Theft Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
