import React from 'react';

const About = () => {

    const p1 = `
        In essence, this is just going to be a digital display- Think something along the lines of a 
        Google Nest Hub, or something similar. A little "home page" that you could run on a Raspberry Pi and 
        a monitor, or set as your personal homepage on your browser. The finished product will have different 
        components for things like checking the weather, viewing a calendar, setting reminders, etc. I might 
        even try and integrate an API from a game I play just for fun.
        `
    
    const p2 = `
        A couple reasons: First, this seems like a great idea for a Single Page Application. The page can be 
        split up into different components, doing separate things. Having a reasonable amount of page cusomization 
        on the fly doesn't seem too difficult, while we're at it. Secondly, this is something I've thought about 
        doing before. I've looked at a few products that do this, providing a "smart display" without requiring 
        Google or Amazon hardware, but none of them have really looked that great to me. This is going to be fun, 
        and something that I will actually use outside of school.
        `


    return (
        <div>
            <h1>About My Project</h1>
            <h2>What is my project?</h2>
            <p>{p1}</p>

            <h2>Why this?</h2>
            <p>{p2}</p>
        </div>
    );
};

export default About;
