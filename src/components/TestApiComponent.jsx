import React, { useState, useEffect } from 'react';

function TestApiComponent() {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callTestApi = async () => {
      setLoading(true);
      setError(null);
      setApiResponse(null);

      try {
        const response = await fetch('/api/test');

        if (!response.ok) {
          let errorMessage = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json();
            if (errorData && errorData.message) {
              errorMessage += ` - ${errorData.message}`;
            } else {
              const errorText = await response.text();
              errorMessage += ` - ${errorText}`;
            }
          } catch (jsonError) {
            console.error("Failed to parse error JSON:", jsonError);
            const errorText = await response.text();
            errorMessage += ` - Raw error: ${errorText}`;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setApiResponse(data);
      } catch (apiError) {
        setError(apiError.message || 'Failed to call test API');
        console.error('Error calling test API:', apiError);
      } finally {
        setLoading(false);
      }
    };

    callTestApi();
  }, []);

  if (loading) {
    return <div>Loading test API response...</div>;
  }

  if (error) {
    return <div className="error">Error calling test API: {error}</div>;
  }

  if (apiResponse) {
    return (
      <div>
        <h3>Test API Response:</h3>
        <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
      </div>
    );
  }

  return null; // Initial state
}

export default TestApiComponent;