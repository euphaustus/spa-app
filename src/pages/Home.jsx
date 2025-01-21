import React from 'react';


const Home = () => {

    const p1 = `
        Welcome to the home page! There isn't much to see here, how about you go check 
        out the About page to see what it is I'm trying to do here.
        `

    return (
        <div>
            <h1>Home Component</h1>
            <p>{p1}</p>
        </div>
    );
};

export default Home;
