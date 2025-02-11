import React, {useState, useEffect} from 'react';
import axios from 'axios';


const NasaApod = () => {
    const [photoData, setPhotoData] = useState(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            const apiKey = 'DEMO_KEY';  // Replace with your NASA API key
            const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
            const result = await axios.get(url);
            setPhotoData(result.data);
        };
        fetchPhoto();
    }, []);

    if (!photoData) return <div>Loading...</div>;

    return (
        <div>
            <h1>{photoData.title}</h1>
            <p>{photoData.date}</p>
            <img src={photoData.url} alt={photoData.title} />
            <p>{photoData.explanation}</p>
        </div>
    );
};




const Home = () => {

    const p1 = `
        Welcome to the home page! There isn't much to see here, how about you go check 
        out the About page to see what it is I'm trying to do here.
        `

    return (
        <div className="homepagebox">
            <div className='contentbox' id='nasabox'>
                <p>This is where I will be putting one of the fun NASA api calls in a component</p>
            </div>

            <div className='contentbox' id='weatherbox'>
                <p>This is another API box, this time for weather (ideally)</p>
            </div>
            <div className='contentbox' id='loginbox'>
                <p>And here is the login box.</p>
            </div>

        </div>
    );
};

export default Home;
