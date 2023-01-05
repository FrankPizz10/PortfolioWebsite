import React from "react";

import { AppWrap } from "../../wrapper";
import './Contact.scss';

const Contact = () => {
    return(
        <div className="app__contact app__flex">
            <h1>Contact</h1>
        </div>
    );
};

export default AppWrap(Contact, 'contact');