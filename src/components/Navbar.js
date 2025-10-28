"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-300 border-b backdrop-blur-md ${
        scrolled
          ? "py-3 bg-[#0A1A2F]/95 border-[#C21F1F]/40 shadow-[0_0_15px_rgba(194,31,31,0.3)]"
          : "py-6 bg-[#0A1A2F]/90 border-[#1C2A45]"
      }`}
    >
      {/* === Top Texas Flag Gradient Line === */}
      <div
        className="w-full h-[2px] bg-[linear-gradient(90deg,#C21F1F,#F5F3E7,#0A1A2F,#C21F1F)]
                   bg-[length:200%_200%] animate-[gradientShift_10s_linear_infinite]"
      ></div>

      {/* === Navbar Content === */}
      <div className="flex justify-between items-center px-8">
        {/* === FORTYONE Logo === */}
        <h1
          className="text-3xl md:text-4xl font-extrabold tracking-wide bg-[linear-gradient(90deg,#C21F1F,#F5F3E7,#0A1A2F,#C21F1F)]
                     bg-clip-text text-transparent bg-[length:200%_200%]
                     animate-[gradientShift_10s_linear_infinite]
                     drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]"
        >
          FORTYONE
        </h1>

        {/* === Navigation Links === */}
        <div className="hidden md:flex space-x-10 text-base uppercase tracking-wider">
          <NavLink id="projects" label="Projects" />
          <NavLink id="about" label="About" />
          <NavLink id="contact" label="Contact" />
        </div>
      </div>
    </nav>
  );
}

/* === Reusable NavLink Component (guaranteed no hash) === */
function NavLink({ id, label }) {
  const handleClick = (e) => {
    e.preventDefault(); // no navigation
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Completely clear any hash from URL and history
    if (typeof window !== "undefined") {
      const cleanPath = window.location.pathname + window.location.search;
      window.history.replaceState({}, document.title, cleanPath);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group relative transition cursor-pointer bg-transparent border-none outline-none"
    >
      <span
        className="text-lg font-semibold bg-[linear-gradient(90deg,#C21F1F,#F5F3E7,#0A1A2F,#C21F1F)]
                   bg-clip-text text-transparent bg-[length:200%_200%]
                   animate-[gradientShift_10s_linear_infinite]
                   drop-shadow-[0_0_6px_rgba(245,243,231,0.25)]"
      >
        {label}
      </span>
      <span
        className="absolute left-0 -bottom-1 w-full h-[2px] rounded-full
                   bg-[linear-gradient(90deg,#C21F1F,#F5F3E7,#0A1A2F,#C21F1F)]
                   bg-[length:200%_200%] animate-[gradientShift_6s_linear_infinite]
                   scale-x-0 group-hover:scale-x-100 origin-left
                   transition-transform duration-300 ease-out"
      ></span>
    </button>
  );
}
