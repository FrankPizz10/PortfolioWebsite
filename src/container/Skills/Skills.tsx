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
  { title: "TypeScript", description: "Web development", imgUrl: images.typescriptIcon, alt: "TypeScript logo" },
  { title: "React", description: "Front-end development", imgUrl: images.reactIcon, alt: "React logo" },
  { title: "C#", description: ".NET & backend systems", imgUrl: images.csharpIcon, alt: "C# logo" },
  { title: "Python", description: "Data processing & ML", imgUrl: images.pythonIcon, alt: "Python logo" },
  { title: "SQL", description: "Database management", imgUrl: images.mysqlIcon, alt: "MySQL logo" },
  { title: "GraphQL", description: "API development", imgUrl: images.graphqlIcon, alt: "GraphQL logo" },
  { title: "Node.js", description: "Backend development", imgUrl: images.nodejsIcon, alt: "Node.js logo" },
  { title: "AWS", description: "Cloud infrastructure", imgUrl: images.awsIcon, alt: "AWS logo" },
  { title: "Java", description: "Android development", imgUrl: images.javaIcon, alt: "Java logo" },
  {
    title: "Sitecore",
    description: "CMS & web development",
    imgUrl: images.sitecoreIcon,
    alt: "Sitecore logo",
    badge: "Sitecore 10 Certified",
  },
];

const Skills = () => {
  return (
    <div className="skills">
      <span className="section-kicker">02 // Tech stack</span>
      <h2 className="section-title">
        Tools & Technologies
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
