import React, {useState, useEffect} from 'react';
import TodoList from '../components/TodoList';
import DailyEventsList from '../components/DailyEventsList';

function Today() {
    const [calendarEvents, setCalendarEvents] = useState([]);

    useEffect(() => {
    const fetchCalendarEvents = async () => {
        try {
        const response = await fetch('/.netlify/functions/calendar-data');
        if (response.ok) {
            const data = await response.json();
            setCalendarEvents(data.events);
        } else {
            console.error('Error fetching calendar events:', response.status);
        }
        } catch (error) {
        console.error('Error fetching calendar events:', error);
        }
    };

    fetchCalendarEvents();
    }, []);

    
    
    return (
        <div className="todaypagebox">


            <div className='contentbox'>
                <TodoList/>
            </div>
            <div className='contentbox'>
                <DailyEventsList events={calendarEvents}/>
            </div>

        </div>
    );
};

export default Today;