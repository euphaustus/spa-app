import React, {useState, useEffect} from 'react';
import TodoList from '../components/TodoList';

function Today() {
    
    
    return (
        <div className="todaypagebox">


            <div className='contentbox'>
                <TodoList/>
            </div>
            <div className='contentbox'>
                <p>Last thing to implement that I'm missing, the "Today" calendar</p>
            </div>

        </div>
    );
};

export default Today;