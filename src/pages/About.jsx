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
        So far, I have the page layout decided and the login form set (to view the locked pages, 
        the username is "testuser" and the password is "password", but you didn't hear it from me). 
        I have a few neat little tricks set up, like the self-hiding nav bar and the login form, as well as a keydown event set for 
        navigation between pages, just for fun. hitting 1-5 on the keyboard will navigate through the site, which I think is a pretty 
        cool trick. There are a couple things I still need to work out though, as the backend server data is not modifiable without
         being connected to a database. Once I have that step figured out though, this should be a fully-featured and working site!
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
