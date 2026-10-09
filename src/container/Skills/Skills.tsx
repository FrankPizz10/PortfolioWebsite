import React from "react";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import "./Skills.scss";

interface Skill {
  title: string;
  description: string;
  imgUrl: string;
  alt: string;
  badge?: string;
}

const SKILLS: Skill[] = [
  { title: "TypeScript", description: "Web development", imgUrl: images.typescript, alt: "TypeScript logo" },
  { title: "React", description: "Front-end development", imgUrl: images.react2, alt: "React logo" },
  { title: "C#", description: ".NET & backend systems", imgUrl: images.csharp, alt: "C# logo" },
  { title: "Python", description: "Data processing & ML", imgUrl: images.python, alt: "Python logo" },
  { title: "SQL", description: "Database management", imgUrl: images.sql, alt: "SQL logo" },
  { title: "GraphQL", description: "API development", imgUrl: images.graphql, alt: "GraphQL logo" },
  { title: "Node.js", description: "Backend development", imgUrl: images.node, alt: "Node.js logo" },
  { title: "Java", description: "Android development", imgUrl: images.java, alt: "Java logo" },
  {
    title: "Sitecore",
    description: "CMS & web development",
    imgUrl: images.sitecore,
    alt: "Sitecore logo",
    badge: "Sitecore 10 Certified",
  },
];

const Skills = () => {
  return (
    <div className="skills">
      <span className="section-kicker">02 // Tech stack</span>
      <h2 className="section-title">
        Tools I <span className="grad">reach for</span>
      </h2>
      <p className="section-lede">
        The languages and platforms I&apos;ve shipped real software with — from
        civic infrastructure to App Store releases.
      </p>

      <div className="skills__grid">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.title}
            className="skill-card glass-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="skill-card__icon">
              <img src={skill.imgUrl} alt={skill.alt} loading="lazy" />
            </div>
            <h3 className="skill-card__name">{skill.title}</h3>
            <p className="skill-card__desc">{skill.description}</p>
            {skill.badge && <span className="skill-card__badge">{skill.badge}</span>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(Skills, "skills");
