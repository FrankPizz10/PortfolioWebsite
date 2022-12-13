import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import './About.scss';


// Typescript - web developement
// C# - object oriented programming
// React - front end development
// Sql - database management
// Python - data science
const abouts = [
    {title: 'TypeScript', descripton: 'For: Web Development', imgUrl: images.typescript},
    {title: 'React', descripton: 'For: Front End Development', imgUrl: images.react2},
    {title: 'C#', descripton: 'For: Object-Oriented Development', imgUrl: images.csharp},
    {title: 'Java', descripton: 'For: Android Development', imgUrl: images.java},
    {title: 'Python', descripton: 'For: Data Processing and Machine Learning', imgUrl: images.python},
    {title: 'SQL', descripton: 'For: Database Management', imgUrl: images.sql},
]

const About = () => {
    return (
        <>
            <h2 className="head-text">My Go-To Tech Stack</h2>

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