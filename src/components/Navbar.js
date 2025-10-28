"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      {/* === Top Texas Gradient Line === */}
      <div className="w-full h-[2px] bg-[linear-gradient(90deg,#C21F1F,#F5F3E7,#0A1A2F,#C21F1F)] bg-[length:200%_200%] animate-[gradientShift_10s_linear_infinite]" />

      <div className="flex justify-between items-center px-6 md:px-10">
        {/* === Logo === */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide bg-[linear-gradient(90deg,#C21F1F,#F5F3E7,#0A1A2F,#C21F1F)] bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradientShift_10s_linear_infinite] drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]">
          FORTYONE
        </h1>

        {/* === Desktop Links === */}
        <div className="hidden md:flex space-x-10 text-base uppercase tracking-wider">
          <NavLink href="#projects" label="Projects" />
          <NavLink href="#about" label="About" />
          <NavLink href="#contact" label="Contact" />
        </div>

        {/* === Mobile Menu Button === */}
        <button
          className="md:hidden text-[#F5F3E7]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* === Animated Mobile Dropdown === */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden flex flex-col items-center space-y-4 mt-4 pb-4 bg-[#0A1A2F]/95 border-t border-[#1C2A45]"
          >
            <NavLink
              href="#projects"
              label="Projects"
              onClick={() => setMenuOpen(false)}
            />
            <NavLink
              href="#about"
              label="About"
              onClick={() => setMenuOpen(false)}
            />
            <NavLink
              href="#contact"
              label="Contact"
              onClick={() => setMenuOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ href, label, onClick }) {
  return (
    <Link href={href} onClick={onClick} className="group relative transition">
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
                   scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"
      ></span>
    </Link>
  );
}
