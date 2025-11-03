import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}   // start slightly faded & moved down
      animate={{ opacity: 1, y: 0 }}    // fade in smoothly
      exit={{ opacity: 0, y: -10 }}     // fade out upward
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="page-wrapper"
    >
      {children}
    </motion.div>
  );
}
