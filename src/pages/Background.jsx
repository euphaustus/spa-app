import React from 'react';
import Wallpaper from '../assets/background.png';

const Background = () => {




    return (
        <div className="wallpaperBox">
            <img src={Wallpaper} alt="pretty wallpaper image" style={{height: 'auto'}} />
        </div>
    );
};

export default Background;
