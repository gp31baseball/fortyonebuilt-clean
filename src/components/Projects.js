import { motion } from "framer-motion";
import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      name: "GP31 Baseball",
      img: "/projects/gp31.jpg",
      desc: "Elite youth development — powered by purpose and performance.",
    },
    {
      name: "Texas Cages",
      img: "/projects/texas-cages.jpg",
      desc: "Premier baseball training facility. Texas built. Big-league ready.",
    },
    {
      name: "MM Baseball",
      img: "/projects/mm-baseball.jpg",
      desc: "Train with intent. Big-league knowledge, real-game results.",
    },
  ];

  return (
    <section
      id="projects"
      className="py-24 px-8 bg-[#0E223C] flex justify-center"
    >
      {/* === Gradient Outer Border === */}
      <div className="relative w-full max-w-6xl rounded-lg p-[3px]
                      bg-[linear-gradient(90deg,#C21F1F,#F5F3E7,#0A1A2F,#C21F1F)]
                      bg-[length:200%_200%] animate-[gradientShift_12s_linear_infinite]">
        <div className="rounded-lg bg-[#0E223C] py-12 px-6 md:px-12">
          {/* === Section Title === */}
          <h2
            className="text-4xl font-extrabold mb-12 text-center uppercase tracking-wider
                       bg-[linear-gradient(90deg,#C21F1F,#F5F3E7,#0A1A2F,#C21F1F)]
                       bg-clip-text text-transparent bg-[length:200%_200%]
                       animate-[gradientShift_12s_linear_infinite]"
          >
            Projects
          </h2>

          {/* === Project Grid === */}
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {projects.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative rounded-lg overflow-hidden bg-[#0A1A2F]
                           border border-[#1C2A45] transition-all duration-300
                           hover:scale-[1.03] group"
              >
                {/* Hover Glow */}
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100
                             transition-opacity duration-500
                             bg-[radial-gradient(circle_at_center,rgba(228,179,67,0.35)_0%,rgba(194,31,31,0.2)_50%,transparent_80%)]"
                ></div>

                {/* Image Box */}
                <div className="relative w-full aspect-[4/3] flex items-center justify-center bg-[#0A1A2F] overflow-hidden z-10">
                  <Image
                    src={proj.img}
                    alt={proj.name}
                    fill
                    className="object-contain rounded-t-lg p-3 scale-[1.15]"
                  />
                </div>

                {/* Card Content */}
                <div className="relative p-6 z-10 text-center">
                  <h3 className="text-xl font-bold mb-3 text-[#F5F3E7] tracking-wide uppercase">
                    {proj.name}
                  </h3>
                  <p className="text-sm text-[#C0C4CA] leading-relaxed tracking-wide italic group-hover:text-[#E4B343] transition-colors duration-300">
                    {proj.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
