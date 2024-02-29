import React from "react";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import './About.scss';

const About = () => {
    return (
        <div className="app__about app__flex">
            <motion.div
                whileInView={{ x: [-150, 0], opacity: [0, 1] }}
                transition={{ duration: 0.6 }}
                className="app__about-info"
            >
                <div className="app__about-badge">
                    <div className="badge-cmp app__flex">
                        <div style={{marginLeft:20}}>
                            <div className="app__flex">
                                <h2>A Little About Me</h2>
                            </div>
                            <p>I am currently a Web Developer for the City of Cambridge, MA</p>
                            <p>Follow this link to see my work <a href="https://www.cambridgema.gov" target="_blank" rel="noopener noreferrer">City of Cambridge Website</a></p>
                            <p>I am originally from Staten Island, New York</p>
                            <p>I graduated Northeastern University in Spring 2023</p>
                            <p>I majored in Computer Engineering and Computer Science</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AppWrap(About, 'about');