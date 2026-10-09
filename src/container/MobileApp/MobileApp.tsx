import React from "react";
import { motion } from "framer-motion";
import { DiAndroid, DiApple } from "react-icons/di";

import { images } from "../../constants";

const TECH = ["React Native", "Node.js", "AWS", "MySQL", "Firebase"];

const MobileApp = () => {
  return (
    <motion.article
      className="mission glass-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mission__media">
        <img src={images.mobileapp} alt="BeerPassport app home screen" loading="lazy" />
        <span className="mission__status">
          <span className="pulse-dot" /> live on the app store
        </span>
      </div>
      <div className="mission__body">
        <span className="mission__code">mission 01</span>
        <h3 className="mission__title">BeerPassport</h3>
        <p className="mission__desc">
          An iOS social app for tracking tried-and-liked beers, completing
          collections, and adding friends — backed by a custom AWS server and an
          admin dashboard managing 6,000+ beers.
        </p>
        <ul className="mission__tech">
          {TECH.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="mission__actions">
          <a
            href="https://apps.apple.com/us/app/beerpassport/id6476255138"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mission__btn"
          >
            <DiApple /> App Store
          </a>
          <a
            href={process.env.REACT_APP_ANDROID_APK}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost mission__btn"
          >
            <DiAndroid /> Android APK
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default MobileApp;
