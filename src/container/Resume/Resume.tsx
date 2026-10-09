import React from "react";
import { motion } from "framer-motion";
import { HiDownload } from "react-icons/hi";

import "./Resume.scss";

interface Entry {
  company: string;
  role: string;
  dates: string;
  current?: boolean;
  bullets: string[];
}

const EXPERIENCE: Entry[] = [
  {
    company: "Robert Wood Johnson Foundation",
    role: "Software Engineer Contractor",
    dates: "Feb 2025 — Present",
    current: true,
    bullets: [
      "Develop and maintain software solutions supporting investment operations for a $14B portfolio",
      "Integrate custodian fund data using SQL, DynamoDB, and GraphQL to improve reporting accuracy",
      "Maintain a legacy .NET desktop application while building web applications on AWS Lambda",
    ],
  },
  {
    company: "Topsort",
    role: "Software Integration Engineer",
    dates: "Sep 2025 — Dec 2025",
    bullets: [
      "Led technical integration for a major enterprise client onboarding onto Topsort's advertising platform",
      "Built S3-backed SFTP catalog ingestion and Lambda workflows, plus campaign migration scripts",
      "Primary technical contact between Topsort and client engineers, including onsite support",
    ],
  },
  {
    company: "City of Cambridge",
    role: "Web Developer",
    dates: "May 2023 — Sep 2025",
    bullets: [
      "Improved, maintained, and modernized the main City of Cambridge website",
      "Integrated Sitecore controls, renderings, and templates to allow staff to add content",
      "Developed full-stack applications such as financial disclosure software for electoral candidates",
      "Modernized infrastructure by moving applications to Azure with a hybrid-cloud approach",
    ],
  },
  {
    company: "Nuvera Fuel Cells",
    role: "Software Engineering Co-op",
    dates: "Jul 2022 — Dec 2022",
    bullets: [
      "Processed, filtered, and plotted 3D fuel-cell engine performance data with Python, Scikit-learn, Pandas",
      "Applied ML regression algorithms to find correlations between conditions and engine performance",
    ],
  },
  {
    company: "Philips North America",
    role: "Software Engineering Co-op",
    dates: "Jul 2021 — Dec 2021",
    bullets: [
      "Enhanced CI pipelines testing the Philips Patient Information Center (PIC IX)",
      "Created build and release pipelines deploying PIC IX on a network system",
      "Modernized deprecated SQL queries and C# scripts to increase traceability and efficiency",
    ],
  },
  {
    company: "Insulet",
    role: "System Test Engineer Co-op",
    dates: "Jul 2020 — Dec 2020",
    bullets: [
      "Tested the Horizon Omnipod 5 system in a formal design verification process",
      "Designed a continuous glucose monitor simulation in Python; analyzed clinical data with Pandas",
    ],
  },
  {
    company: "CodeWiz",
    role: "Coding Coach",
    dates: "Jan 2023 — May 2023",
    bullets: [
      "Coached kids ages 8–14 on computer science fundamentals and 2D game design",
      "Created curriculums and lesson plans for continuity in their learning",
    ],
  },
];

const Resume = () => {
  return (
    <div className="resume section">
      <span className="section-kicker">Mission log</span>
      <h1 className="section-title">
        Résumé
      </h1>
      <p className="section-lede">
        Every role, co-op, and launch — the full flight record.
      </p>

      <motion.a
        className="btn btn-primary resume__download"
        href={process.env.REACT_APP_RESUME_URL}
        download
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <HiDownload /> Download PDF
      </motion.a>

      <div className="resume__block">
        <h2 className="resume__heading">Education</h2>
        <div className="glass-card resume__edu">
          <h3>Northeastern University</h3>
          <p className="resume__sub">B.S. in Computer Engineering and Computer Science</p>
          <ul>
            <li>Relevant courses: Object-Oriented Design, Algorithms &amp; Data Structures, Web Development, Embedded Design, Computer Systems, Networks, Mobile App Development</li>
            <li>N.U.in Program (study abroad): University College Dublin</li>
          </ul>
        </div>
      </div>

      <div className="resume__block">
        <h2 className="resume__heading">Experience</h2>
        <div className="timeline">
          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={e.company}
              className={`timeline__entry${e.current ? " timeline__entry--current" : ""}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
            >
              <span className="timeline__node" aria-hidden="true" />
              <div className="timeline__card glass-card">
                <div className="timeline__top">
                  <div>
                    <h3>{e.company}</h3>
                    <p className="resume__sub">{e.role}</p>
                  </div>
                  <span className="timeline__dates">{e.dates}</span>
                </div>
                <ul>
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="resume__block">
        <h2 className="resume__heading">Additional</h2>
        <div className="glass-card resume__edu">
          <ul>
            <li>
              <strong>Volunteering:</strong> web consultant for the Maverick
              Foundation website relaunch; taught programming fundamentals to
              youth at CodeWiz (2023)
            </li>
            <li>
              <strong>Certifications:</strong> Congressional Gold Medal, Sitecore
              10, Microsoft Certified: Azure Fundamentals
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Resume;
