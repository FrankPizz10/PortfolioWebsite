import React from "react";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import './MobileApp.scss';

const MobileApp = () => {
    return(
        <div className="app__chessapp app__flex">
            <div>
                <h1>BeerPassport App</h1>
                <p>I developed an IOS app that allows users to track tried and like beers, complete collections, and add friends.</p>
                <div className="chessapp-img">
                    <img src={images.mobileapp} alt="mobile app" />
                </div>
            </div>
            <div>
                <a href="https://apps.apple.com/us/app/beerpassport/id6476255138">
                    <button>Download Now</button>
                </a>
            </div>
        </div>
    );
};

export default AppWrap(MobileApp, 'mobileapp');