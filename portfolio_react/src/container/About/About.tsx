import React from "react";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
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
                            <p>I am from Staten Island, New York</p>
                            <p>I am attending Northeastern University (Class of 2023)</p>
                            <p>My major is Computer Engineering and Computer Science</p>
                            <p>I have a strong passion for software development</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AppWrap(About, 'about');