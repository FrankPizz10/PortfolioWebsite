import React from "react";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import './Skills.scss';


interface Skill {
    title: string;
    descripton: string;
    imgUrl: string;
    alt: string;
    additional?: string;
    additionalStyles?: React.CSSProperties;
}

const skills: Skill[] = [
    {title: 'TypeScript', descripton: 'For: Web Development', imgUrl: images.typescript, alt: 'typescript logo'},
    {title: 'React', descripton: 'For: Front End Development', imgUrl: images.react2, alt: 'react logo'},
    {title: 'C#', descripton: 'For: .NET MV', imgUrl: images.csharp, alt: 'c sharp logo'},
    {title: 'Java', descripton: 'For: Android Development', imgUrl: images.java, alt: 'java logo'},
    {title: 'Python', descripton: 'For: Data Processing and Machine Learning', imgUrl: images.python, alt: 'python logo'},
    {title: 'SQL', descripton: 'For: Database Management', imgUrl: images.sql, alt: 'sql logo'},
    {title: 'Sitecore', descripton: 'For: CMS and Web Development', imgUrl: images.sitecore, alt: 'sitecore logo', additional: 'Sitecore 10 Certified', additionalStyles: {'fontWeight': 'bold'}},
]

const Skills = () => {
    return (
        <>
            <h2 className="head-text">My Go-To Tech Stack</h2>

            <div className="app__profiles">
                {skills.map((skill, index) => (
                    <motion.div
                        whileInView={{opacity: 1}}
                        whileHover={{scale: 1.1}}
                        transition={{duration: 0.5, type: 'tween'}}
                        className="app__profile-item"
                        key={skill.title + index}
                    >
                        <img src={skill.imgUrl} alt={skill.alt}/>
                        <h2 className="bold-text" style={{marginTop: 20}}>{skill.title}</h2>
                        <p className="p-text" style={{marginTop: 10}}>{skill.descripton}</p>
                        {skill.additional && <p className="p-text" style={{marginTop: 10, ...skill.additionalStyles}}>{skill.additional}</p>}
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default AppWrap(Skills, 'skills');