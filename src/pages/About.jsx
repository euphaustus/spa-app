import React from 'react';

const About = () => {

    const p1 = `
        In essence, this is a personal digital display- Think something along the lines of a Google Nest Hub, or something similar. The home page has boxes (components) for a weather api, the neat little NASA image api, and a login form that unlocks the today and calendar pages. The background page just has a nice wallpaper that can be used to look pretty. The today page will have a to do list, a "today's events" style calendar view, and (maybe a little too ideally) a little traffic checker. The calendar page is a very simple month-view calendar.
        `
    
    const p2 = `
        A couple reasons: First, this seems like a great idea for a Single Page Application. The page can be 
        split up into different components, doing separate things. Having a reasonable amount of page cusomization 
        on the fly doesn't seem too difficult, while we're at it. Secondly, this is something I've thought about 
        doing before. I've looked at a few products that do this, providing a "smart display" without requiring 
        Google or Amazon hardware, but none of them have really looked that great to me. This is going to be fun, 
        and something that I will actually use outside of school.
        `
    const p3 = `
        So far, I have the page layout decided and the login form set (to view the locked pages, the password is "hello", but you didn't hear it from me). I have a few simple events set up, like the self-hiding nav bar and the login form, but I also have a keydown event set for navigation between pages, just for fun. hitting 1-5 on the keyboard will jump pages, which I think is pretty neat. There is a lot of blank space, but that will be filled when we get to APIs in class.
        `


    return (
        <div className="contentbox" id="aboutbox">
            <h1>About My Project</h1>
            <h2>What is my project?</h2>
            <p>{p1}</p>

            <h2>Why this?</h2>
            <p>{p2}</p>

            <h2>How's it going so far?</h2>
            <p>{p3}</p>
        </div>
    );
};

export default About;
