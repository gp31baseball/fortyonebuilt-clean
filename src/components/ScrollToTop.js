"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="scrollTop"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full 
                     overflow-hidden transition-all duration-500 shadow-[0_0_15px_rgba(228,179,67,0.4)]"
        >
          {/* === Gradient Background === */}
          <motion.span
            className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#C21F1F,#F5F3E7,#0A1A2F,#C21F1F)]
                       bg-[length:200%_200%] animate-[gradientShift_12s_linear_infinite]"
          ></motion.span>

          {/* === Gold Glow === */}
          <motion.span
            animate={{
              boxShadow: [
                "0 0 10px rgba(228,179,67,0.2)",
                "0 0 25px rgba(228,179,67,0.5)",
                "0 0 10px rgba(228,179,67,0.2)",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full"
          ></motion.span>

          {/* === Icon === */}
          <ChevronUp className="relative z-10 w-6 h-6 text-[#0A1A2F] font-bold" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
