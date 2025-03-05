import React, {useState, useEffect} from 'react';
import LoginForm from '../components/LoginForm';
import NasaApod from '../components/NasaApod';
import WeatherComponent from '../components/WeatherComponent';



function Home() {

    const p1 = `
        Welcome to the home page! There isn't much to see here, how about you go check 
        out the About page to see what it is I'm trying to do here.
        `

    return (
        <div className="homepagebox">
            <div className='contentbox' id='nasabox'>
                <NasaApod/>
            </div>

            <div className='contentbox' id='weatherbox'>
                <WeatherComponent/>
            </div>
            <div className='contentbox' id='loginbox'>
                <LoginForm/>
            </div>

        </div>
    );
};

export default Home;
