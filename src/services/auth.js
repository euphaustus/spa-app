export async function login(username, password) {
  try {
    const response = await fetch(`/.netlify/functions/login`, {
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


export async function authenticatedFetch(url, options = {}) {
  const token = localStorage.getItem('authToken');
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {

    if (response.status === 401) {

      console.error('Unauthorized request:', response);
      throw new Error('Unauthorized');
    }
    const errorData = await response.json();
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return await response.json();
}