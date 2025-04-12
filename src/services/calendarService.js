export async function getCalendarEvents() {
  try {
    const response = await fetch(`/.netlify/functions/calendar-data`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch calendar data with status ${response.status}`);
    }
    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
}

export async function addCalendarEvent(event) {
  try {
    const response = await fetch(`/.netlify/functions/calendar-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to add event with status ${response.status}`);
    }
    const data = await response.json();
    return data.event;
  } catch (error) {
    console.error('Error adding calendar event:', error);
    throw error;
  }
}

export async function updateCalendarEvent(event) {
  try {
    const response = await fetch(`/.netlify/functions/calendar-data`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to update event with status ${response.status}`);
    }
    const data = await response.json();
    return data.event;
  } catch (error) {
    console.error('Error updating calendar event:', error);
    throw error;
  }
}

export async function deleteCalendarEvent(id) {
  try {
    const response = await fetch(`/.netlify/functions/calendar-data`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to delete event with status ${response.status}`);
    }
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    throw error;
  }
}