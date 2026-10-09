import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

import "./Navbar.scss";

const LINKS: Array<{ label: string; href: string }> = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#skills" },
  { label: "Projects", href: "#missions" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const onResume = useLocation().pathname === "/resume";

  const goTop = () => {
    setOpen(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <nav className="nav">
      <div className="nav__inner">
        <NavLink to="/" className="nav__logo" onClick={goTop} aria-label="Frank Pizzella — home">
          <span className="nav__logo-mark">FP</span>
          <span className="nav__logo-text">
            frank<span className="nav__logo-dot">.</span>pizzella
          </span>
        </NavLink>

        {!onResume && (
          <ul className="nav__links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        )}

        <div className="nav__actions">
          <NavLink to="/resume" className="btn btn-ghost nav__resume" onClick={goTop}>
            Résumé
          </NavLink>
          {!onResume && (
            <button
              className="nav__burger"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <HiX /> : <HiMenuAlt4 />}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && !onResume && (
          <motion.div
            className="nav__mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ul>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <NavLink to="/resume" onClick={goTop}>
                  Résumé
                </NavLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
