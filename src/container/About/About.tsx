import React from "react";

import { AppWrap } from "../../wrapper";
import "./About.scss";

const TELEMETRY: Array<{ label: string; value: string }> = [
  { label: "current orbit", value: "Software Engineer Contractor — RWJF" },
  { label: "previous vector", value: "Web Developer — City of Cambridge, MA" },
  { label: "origin", value: "Staten Island, New York" },
  { label: "education", value: "Northeastern Univ. — B.S. CE + CS, '23" },
  { label: "study abroad", value: "N.U.in Program — Univ. College Dublin" },
];

const About = () => {
  return (
    <div className="about">
      <span className="section-kicker">01 // About</span>
      <h2 className="section-title">
        The engineer behind <span className="grad">the code</span>
      </h2>

      <div className="about__grid">
        <div className="about__bio">
          <p>
            I&apos;m Frank — a full-stack software engineer who likes building
            things that survive contact with the real world. These days I develop
            and maintain software supporting investment operations for a{" "}
            <strong>$14B portfolio</strong> at the Robert Wood Johnson Foundation,
            integrating custodian fund data and shipping web apps on AWS Lambda.
          </p>
          <p>
            Before that I was a web developer for the{" "}
            <a
              href="https://www.cambridgema.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              City of Cambridge
            </a>
            , modernizing civic infrastructure with .NET, Sitecore, and Azure —
            plus a few engineering co-ops across fuel cells, medical devices, and
            robotics-adjacent test systems along the way.
          </p>
          <p>
            Off the clock I&apos;m usually following spaceflight, grilling
            something on the Traeger, or shipping{" "}
            <a href="#missions">side projects</a> like BeerPassport.
          </p>
        </div>

        <aside className="about__telemetry glass-card" aria-label="Quick facts">
          <div className="telemetry__head">
            <span className="telemetry__dot" />
            <span className="telemetry__dot" />
            <span className="telemetry__dot" />
            <span className="telemetry__title">telemetry</span>
          </div>
          <dl>
            {TELEMETRY.map((row) => (
              <div key={row.label} className="telemetry__row">
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
};

export default AppWrap(About, "about");
