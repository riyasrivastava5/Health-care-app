import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleButtonClick = async (location) => {
    setSelectedLocation(location);

    try {
      // Your logic to fetch nearby hospitals based on location
      const response = await axios.get(`YOUR_API_ENDPOINT?location=${location}`);
      setNearbyHospitals(response.data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation({ latitude, longitude }, () => {
            handleButtonClick('Current Location');
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <>
      {isAuthenticated && (
        <div className="container">
          <h1 className="address">LOCATE NEARBY HOSPITALS<br></br><br></br>(Click below)</h1>
          <div className="buttons-container"> </div>

          <button className="button use-location-button" onClick={handleUseMyLocation}>My Current Location</button>

          <div className='map-container'>
            {selectedLocation && (
              <>
                <iframe
                  title="Selected Location Map"
                  className="map"
                  src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d112135.57351471338!2d${selectedLocation.longitude}!3d${selectedLocation.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s${selectedLocation}%20hospitals!5e0!3m2!1sen!2sin!4v1711909622873!5m2!1sen!2sin`}
                  width="600"
                  height="450"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {nearbyHospitals.length > 0 && (
                  <>
                    <h2>Nearby Hospitals:</h2>
                    <ul className="hospitals-list">
                      {nearbyHospitals.map((hospital, index) => (
                        <li key={index}>{hospital.display_name}</li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {!isAuthenticated && (
        
        <button className="login-button" onClick={loginWithRedirect}>Log In</button>
      )}
    </>
  );
}

export default App;
