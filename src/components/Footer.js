import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#0A1A2F] text-center py-10 border-t border-[#1C2A45] overflow-hidden">
      {/* === Soft background glow === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(228,179,67,0.06)_0%,rgba(10,26,47,1)_80%)] pointer-events-none"></div>

      {/* === Animated Gradient Divider === */}
      <motion.div
        className="relative w-24 h-[2px] mx-auto mb-8 rounded-full overflow-hidden"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, #C21F1F, #F5F3E7, #0A1A2F, #C21F1F)",
          backgroundSize: "200% 100%",
        }}
      ></motion.div>

      {/* === Scripture Verse === */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 text-sm italic text-[#F5F3E7]/90 animate-[verseGlow_8s_ease-in-out_infinite]"
      >
        “Do not fear, for I am with you.” — Isaiah 41:10
      </motion.p>

      {/* === Copyright === */}
      <p className="text-xs text-[#C0C4CA]/60 mt-4 tracking-wide">
        © {new Date().getFullYear()} FortyOne Built. All rights reserved.
      </p>

      {/* === Gold Border Line === */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[1px]
                   bg-[linear-gradient(90deg,transparent,#E4B343,transparent)]
                   opacity-70"
      ></div>
    </footer>
  );
}
