import React from "react";
import { motion } from "framer-motion";
import { HiPlay } from "react-icons/hi";

import { images } from "../../constants";

const TECH = ["React", "Socket.IO", "Node.js", "PostgreSQL"];

const ChessApp = () => {
  return (
    <motion.article
      className="mission glass-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mission__media">
        <img src={images.chessapp} alt="Online chess app preview" loading="lazy" />
        <span className="mission__status">
          <span className="pulse-dot" /> playable now
        </span>
      </div>
      <div className="mission__body">
        <span className="mission__code">mission 02</span>
        <h3 className="mission__title">Realtime Chess</h3>
        <p className="mission__desc">
          A two-player online chess app with every rule of the game enforced —
          real-time moves over WebSockets in a clean, focused board UI.
        </p>
        <ul className="mission__tech">
          {TECH.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="mission__actions">
          <a
            href="https://chess.frankpizzella.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mission__btn"
          >
            <HiPlay /> Play now
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default ChessApp;
