import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import './About.scss';

const abouts = [
    {title: 'Web Development', descripton: 'I have', imgUrl: images.about01},
    {title: 'Full Stack', descripton: 'I have', imgUrl: images.about02},
    {title: 'Android Development', descripton: 'I have', imgUrl: images.about03},
]

const About = () => {
    return (
        <>
            <h2 className="head-text">I Know That <span>Good Design</span><br />means <span>Good Business</span></h2>

            <div className="app__profiles">
                {abouts.map((about, index) => (
                    <motion.div
                        whileInView={{opacity: 1}}
                        whileHover={{scale: 1.1}}
                        transition={{duration: 0.5, type: 'tween'}}
                        className="app__profile-item"
                        key={about.title + index}
                    >
                        <img src={about.imgUrl} alt={about.title} />
                        <h2 className="bold-text" style={{marginTop: 20}}>{about.title}</h2>
                        <p className="p-text" style={{marginTop: 10}}>{about.descripton}</p>
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default AppWrap(About, 'about');