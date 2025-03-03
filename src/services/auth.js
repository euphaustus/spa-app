// services/auth.js

const NETLIFY_FUNCTIONS_BASE_URL = '/.netlify/functions'; // For local dev and Netlify

export async function login(username, password) {
  try {
    const response = await fetch(`${NETLIFY_FUNCTIONS_BASE_URL}/login`, { // Call Netlify function
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Try to parse error JSON
      throw new Error(errorData.message || `Login failed with status ${response.status}`);
    }

    const data = await response.json();
    return data; // { message: 'Login successful', token: 'mock-token-123' }
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Re-throw to be caught in LoginPage
  }
}