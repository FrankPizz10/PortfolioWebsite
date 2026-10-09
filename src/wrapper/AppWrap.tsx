import React from "react";
import { motion } from "framer-motion";

/**
 * Section shell: anchors the section, adds the shared layout,
 * and plays a soft rise-in reveal on first view.
 */
const AppWrap =
  (Component: () => JSX.Element, idName: string, classNames?: string) =>
  function HOC() {
    return (
      <section id={idName} className={`section ${classNames ?? ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Component />
        </motion.div>
      </section>
    );
  };

export default AppWrap;
