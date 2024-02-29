import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import { AppWrap } from "../../wrapper";
import './Contact.scss';

const Contact = () => {
    return(
        <div className="app__contact app__flex">
            <h1 className="app__contact-title">Find Me On</h1>
            <div className="app__contact-socials">
                <div>
                    <a href='https://www.linkedin.com/in/frank-pizzella-8680461a0/'>
                        <AiFillLinkedin />
                    </a>
                </div>
                <div>
                    <a href="https://github.com/FrankPizz10">
                        <AiFillGithub />
                    </a>
                </div>
            </div>
            <div className="app__contact-email">
                <p>fpizz210@gmail.com</p>
            </div>
        </div>
    );
};

export default AppWrap(Contact, 'contact');