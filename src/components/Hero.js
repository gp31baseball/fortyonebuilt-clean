import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-[#0A1A2F] pt-28 md:pt-32 pb-8 md:pb-12 overflow-hidden">
      {/* Subtle radial glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(228,179,67,0.08)_0%,rgba(10,26,47,1)_70%)] pointer-events-none" />

      {/* === Hero Graphic with Texas Flag Gradient Border and Glow === */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full max-w-[700px] mx-auto px-4 z-10"
      >
        {/* Glow halo behind image */}
        <div className="absolute inset-0 blur-3xl rounded-xl bg-[radial-gradient(circle_at_center,rgba(194,31,31,0.25)_0%,rgba(228,179,67,0.25)_40%,transparent_80%)]"></div>

        {/* Animated border */}
        <div className="relative p-[3px] rounded-lg bg-[linear-gradient(90deg,#C21F1F,#F5F3E7,#0A1A2F)] bg-[length:200%_200%] animate-[gradientShift_8s_linear_infinite]">
          <div className="rounded-lg bg-[#0A1A2F] p-1">
            <Image
              src="/hero-banner.png"
              alt="FortyOne Built Banner"
              width={700}
              height={220}
              priority
              className="w-full h-auto object-contain mx-auto rounded-lg"
            />
          </div>
        </div>
      </motion.div>

      {/* === Texas Flag Gradient Divider Line === */}
      <motion.div
        className="relative w-32 h-[2px] mx-auto mt-6 rounded-full overflow-hidden"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, #C21F1F, #F5F3E7, #0A1A2F, #C21F1F)",
          backgroundSize: "200% 100%",
        }}
      ></motion.div>
    </section>
  );
}
