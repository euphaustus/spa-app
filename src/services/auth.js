const NETLIFY_FUNCTIONS_BASE_URL = '/.netlify/functions';

export async function login(username, password) {
  try {
    const response = await fetch(`${NETLIFY_FUNCTIONS_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Login failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export async function logout() {
  localStorage.removeItem('authToken');
  console.log('User logged out. Token removed from localStorage.');
}