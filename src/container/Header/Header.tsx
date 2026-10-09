import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { HiArrowDown } from "react-icons/hi";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import "./Header.scss";

const spring = { type: "spring", stiffness: 90, damping: 16 } as const;

const ORBITERS = [
  { src: images.reactIcon, alt: "React", className: "orbiter-a" },
  { src: images.awsIcon, alt: "AWS", className: "orbiter-b" },
  { src: images.nodejsIcon, alt: "Node.js", className: "orbiter-c" },
];

const Header = () => {
  return (
    <div className="hero">
      <div className="hero__text">
        <motion.p
          className="hero__kicker"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.05 }}
        >
          <span className="prompt">&gt;</span> hello world — i am
        </motion.p>

        <motion.h1
          className="hero__name"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
        >
          Frank Pizzella
        </motion.h1>

        <motion.p
          className="hero__role"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.28 }}
        >
          Full-stack software engineer crafting web, mobile &amp; cloud systems —
          currently supporting a <span className="hl">$14B portfolio</span> at the
          Robert Wood Johnson Foundation.
        </motion.p>

        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.4 }}
        >
          <NavLink to="/resume" className="btn btn-primary">
            View Résumé
          </NavLink>
          <a href="#contact" className="btn btn-ghost">
            Open a channel
          </a>
        </motion.div>

        <motion.div
          className="hero__coords"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <span>40.64° N, 74.07° W</span>
          <span className="sep">·</span>
          <span>staten island, ny</span>
          <span className="sep">·</span>
          <span className="pulse">open to orbit</span>
        </motion.div>
      </div>

      <motion.div
        className="hero__visual"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...spring, delay: 0.3 }}
      >
        <div className="planet">
          <div className="orbit orbit-1" />
          <div className="orbit orbit-2" />
          <img src={images.profile2} alt="Frank Pizzella" className="planet__photo" />
          {ORBITERS.map((o) => (
            <div key={o.alt} className={`orbiter ${o.className}`}>
              <img src={o.src} alt={o.alt} />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.a
        href="#about"
        className="hero__scroll"
        aria-label="Scroll to about"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <HiArrowDown />
      </motion.a>
    </div>
  );
};

export default AppWrap(Header, "home");
