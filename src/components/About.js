import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-8 bg-[#0A1A2F] flex flex-col items-center justify-center text-center relative overflow-hidden"
    >
      {/* Subtle background texture glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(228,179,67,0.05)_0%,rgba(10,26,47,1)_70%)] pointer-events-none"></div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-extrabold mb-8 z-10 uppercase tracking-wide text-[#F5F3E7]"
      >
        About <span className="text-[#E4B343]">FortyOne</span>
      </motion.h2>

      {/* Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-3xl text-[#C0C4CA] leading-relaxed text-lg z-10 tracking-wide"
      >
        <span className="text-[#F5F3E7] font-semibold">FortyOne</span> is a
        Texas-built web development studio rooted in faith and craftsmanship.
        Every project is designed with intention, excellence, and purpose —
        helping small businesses and teams bring their digital vision to life.
      </motion.p>

      {/* Static Gold Divider */}
      <div className="w-20 h-[2px] bg-[#E4B343] mx-auto mt-10 rounded-full opacity-70"></div>
    </section>
  );
}
