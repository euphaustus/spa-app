import React from 'react';

const About = () => {

    const p1 = `
        In essence, this is a personal digital display- Think something along the lines of a 
        Google Nest Hub, or something similar. The home page has components for a weather api,
         the neat little NASA image api, and a login form that unlocks the today and calendar pages.
          The background page just has a nice wallpaper that can be used to look pretty. The today page 
          will have a to do list as well as a daily calendar view. The calendar page holds a month-style 
          calendar, which I am working on getting connected to the daily calendar on the today page.
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
        At this point, my project is in a pretty good place. The home page is functional, with the weather and NASA image
        loading correctly. The login form is working, and the today page is functional with a to do list and calendar view.
        The calendar page is complete as well, with a usable caledar (you can go ahead and play around with it, the database
        is connected to the whole site and should work just fine). The background page basically just has a nice wallpaper, but
        it looks pretty. Overall, I'm happy with the progress I've made, and the site is now ready for a little more polish and
        I'll be done!
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
