// src/components/NasaApod.jsx
import React, { useState, useEffect } from 'react';
import { fetchNasaApodData } from '../services/nasaApi'; // Import the service function

function NasaApod() {
  const [photoData, setPhotoData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state

  useEffect(() => {
    const loadPhotoData = async () => {
      setLoading(true); // Set loading to true when starting the API call
      setError(null);     // Clear any previous errors
      try {
        const data = await fetchNasaApodData(); // Call the service function
        setPhotoData(data);
      } catch (apiError) {
        setError(apiError.message || 'Failed to load NASA APOD'); // Set error message
        console.error('Error in NasaApod component:', apiError); // Log error for component-specific debugging
      } finally {
        setLoading(false); // Set loading to false whether successful or error
      }
    };

    loadPhotoData();
  }, []);

  if (loading) return <div>Loading NASA APOD...</div>; // Loading indicator
  if (error) return <div className="error">Error loading NASA APOD: {error}</div>; // Error display

  if (!photoData) return null; // In case data is still null after loading (unlikely now, but good to handle)

  return (
    <div className="nasa-apod">
      <div className="nasa-apod-image-column"> {/* New div for image/video column */}
        {photoData.media_type === 'image' ? (
          <img src={photoData.url} alt={photoData.title} />
        ) : (
          <p>
            Video: <a href={photoData.url} target="_blank" rel="noopener noreferrer">
              {photoData.title}
            </a>
          </p>
        )}
      </div>

      <div className="nasa-apod-text-column"> {/* New div for text column */}
        <h2>NASA Astronomy Picture of the Day</h2>
        <h3>{photoData.title}</h3>
        <p className="date">{photoData.date}</p>
        <p className="explanation">{photoData.explanation}</p>
      </div>
    </div>
  );
}

export default NasaApod;