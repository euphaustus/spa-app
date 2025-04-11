import React, {useState, useEffect} from 'react';
import TodoList from '../components/TodoList';

function Today() {
    
    
    return (
        <div className="todaypagebox">
            <div className='contentbox'>
                <p>Here goes traffic data, as long as a good api exists</p>
            </div>

            <div className='contentbox'>
                <TodoList/>
            </div>
            <div className='contentbox'>
                <p>Finally, the "Today" calendar</p>
            </div>

        </div>
    );
};

export default Today;