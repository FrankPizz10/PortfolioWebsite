import React from "react";
import { motion } from "framer-motion";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { HiMail } from "react-icons/hi";

import { AppWrap } from "../../wrapper";
import "./Contact.scss";

const Contact = () => {
  return (
    <div className="contact">
      <span className="section-kicker">04 // Contact</span>
      <h2 className="section-title">
        Open a channel
      </h2>
      <p className="section-lede">
        Whether it&apos;s a role, a collaboration, or just good old-fashioned
        nerd talk about spaceflight — my inbox is always listening.
      </p>

      <motion.div
        className="contact__panel glass-card"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <a className="contact__email" href="mailto:fpizz210@gmail.com">
          <HiMail />
          fpizz210@gmail.com
        </a>
        <div className="contact__socials">
          <a
            href="https://www.linkedin.com/in/frank-pizzella-8680461a0/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="contact__social"
          >
            <AiFillLinkedin />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/FrankPizz10"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="contact__social"
          >
            <AiFillGithub />
            <span>GitHub</span>
          </a>
        </div>
        <p className="contact__note">
          <span className="sig">◈</span> average response time: faster than light
          (within a day, usually)
        </p>
      </motion.div>
    </div>
  );
};

export default AppWrap(Contact, "contact");
