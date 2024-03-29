import React, { useState } from "react";
import { HiMenuAlt4, HiX} from 'react-icons/hi';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';

import { images } from "../../constants";
import './Navbar.scss';

interface NavBarLinkMap {
    [key: string]: string;
}

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const links = ['home', 'about', 'skills', 'mobile app', 'chess app', 'contact'];

    const linksMap: NavBarLinkMap = {
        'home': 'home',
        'about': 'about',
        'skills': 'skills',
        'mobile app': 'mobileapp',
        'chess app': 'chessapp',
        'contact': 'contact',
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
        });
    }

    const resumedropDown = () => {
        setToggle(false);
        scrollToTop();
    }

    return (
        <nav className="app__navbar" style={{padding: useLocation().pathname === '/resume' ? '1.5rem 2rem' : ''}}>
            <div className="app__navbar-logo">
                <NavLink to="/" onClick={scrollToTop}>
                    <img src={images.frankTitle} alt="logo" />
                </NavLink>
            </div>
            {
                useLocation().pathname !== '/resume' && (
                    <div className="app__navbar-links">
                        <ul>
                            {links.map((item, index) => (
                                <li className="app__flex p-text" key={`link-${item}`}>
                                    <div />
                                    <a href={`#${linksMap[item]}`}>{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
            
            <div className="app__navbar-resume">
                <NavLink className="app__navbar-resume-link" to="/resume" onClick={scrollToTop}>
                    <h3>Resume</h3>  
                </NavLink>           
            </div>
            <div className="app__navbar-menu">
                <HiMenuAlt4 onClick={() => setToggle(true)}/>
                { toggle && (
                    <motion.div
                        whileInView={{x:[300,0]}}
                        transition={{duration: 0.85, ease: 'easeOut'}}
                    >
                        <HiX onClick={() => setToggle(false)}/>
                        <ul>
                            {links.map((item) => (
                                <li key={item}>
                                    <a href={`#${linksMap[item]}`} onClick={() => setToggle(false)}>
                                        {item}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <NavLink to="/resume" onClick={resumedropDown}>Resume</NavLink>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;