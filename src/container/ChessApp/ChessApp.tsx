import React from "react";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import './ChessApp.scss';

const ChessApp = () => {
    return(
        <div className="app__chessapp app__flex">
            <div>
                <h1>Frank's Chess App</h1>
                <p>This online two player chess app allows you to play a full game of chess with all rules enforced</p>
                <div className="chessapp-img">
                    <img src={images.chessapp} alt="preview of chess app" />
                </div>
            </div>
            <div>
                <a href="https://chess.frankpizzella.com">
                    <button>Play Now</button>
                </a>
            </div>
        </div>
    );
};

export default AppWrap(ChessApp, 'chessapp');