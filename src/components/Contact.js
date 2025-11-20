import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 px-8 bg-[#0E223C] flex flex-col items-center justify-center text-center relative overflow-hidden"
    >
      {/* Subtle gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(228,179,67,0.05)_0%,rgba(10,26,47,1)_80%)] pointer-events-none"></div>

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-extrabold mb-8 z-10 uppercase tracking-wide text-[#F5F3E7]"
      >
        Let’s Build <span className="text-[#E4B343]">Something</span>
      </motion.h2>

      {/* Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-2xl text-[#C0C4CA] leading-relaxed text-lg z-10 tracking-wide mb-10"
      >
        Ready to bring your project to life?{" "}
        <span className="text-[#F5F3E7] font-semibold">
          Let’s get started today.
        </span>
      </motion.p>

      {/* Refined Gold Button */}
      <motion.a
        href="mailto:info@fortyonebuilt.com"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="relative mt-4 px-10 py-3 rounded-md font-semibold tracking-wide uppercase
                   text-[#0A1A2F] bg-[#E4B343] hover:bg-[#CDA138]
                   shadow-[0_0_20px_rgba(228,179,67,0.4)] hover:shadow-[0_0_25px_rgba(228,179,67,0.6)]
                   transition-all duration-300"
      >
        Email Us
      </motion.a>
    </section>
  );
}
