import React from "react";

import { AppWrap } from "../../wrapper";
import './ChessApp.scss';

const ChessApp = () => {
    return(
        <div className="app__chessapp app__flex">
            <h1>Chess App</h1>
        </div>
    );
};

export default AppWrap(ChessApp, 'chess app');