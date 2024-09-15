import React from "react";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import './MobileApp.scss';
import { DiAndroid, DiApple } from "react-icons/di";

const MobileApp = () => {
    return(
        <div className="app__chessapp app__flex">
            <div>
                <h1>BeerPassport App</h1>
                <p>I developed an IOS app that allows users to track tried and like beers, complete collections, and add friends.</p>
                <div className="chessapp-img">
                    <img src={images.mobileapp} alt="home page of beer passport app" />
                </div>
            </div>
            <div className="app__downloadButtons">
                <div className="app__downloadButton">
                    <a href="https://apps.apple.com/us/app/beerpassport/id6476255138">
                        <button>Download Apple <DiApple /></button>
                    </a>
                </div>
                <div className="app__downloadButton">
                    <a href={process.env.REACT_APP_ANDROID_APK} download target="_blank" rel="noopener noreferrer">
                        <button>Download Android <DiAndroid /></button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AppWrap(MobileApp, 'mobileapp');