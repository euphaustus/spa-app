import React, { useState, useEffect } from 'react';
import { fetchNasaApodData } from '../services/nasaApi';

function NasaApod() {
  const [photoData, setPhotoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPhotoData = async () => {
      setLoading(true); 
      setError(null);  
      try {
        const data = await fetchNasaApodData();
        setPhotoData(data);
      } catch (apiError) {
        setError(apiError.message || 'Failed to load NASA APOD'); 
        console.error('Error in NasaApod component:', apiError); 
      } finally {
        setLoading(false); 
      }
    };

    loadPhotoData();
  }, []);

  if (loading) return <div>Loading NASA APOD...</div>;
  if (error) return <div className="error">Error loading NASA APOD: {error}</div>;

  if (!photoData) return null;

  return (
    <div className="nasa-apod">
      <div className="nasa-apod-image-column"> 
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

      <div className="nasa-apod-text-column">
        <h2>NASA Astronomy Picture of the Day</h2>
        <h3>{photoData.title}</h3>
        <p className="date">{photoData.date}</p>
        <p className="explanation">{photoData.explanation}</p>
      </div>
    </div>
  );
}

export default NasaApod;