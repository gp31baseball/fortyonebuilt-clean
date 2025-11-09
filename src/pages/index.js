import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import GenesisIntro from "../components/GenesisIntro"; 
import SparkleOverlay from "../components/SparkleOverlay"; // ✨ Add this

export default function Home() {
  const [showSite, setShowSite] = useState(false);

  // === Scroll reset logic ===
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      window.scrollTo({ top: 0 });
    }
  }, []);

  return (
    <>
      <Head>
        <title>FortyOne Built | Built with Purpose.</title>
        <meta
          name="description"
          content="Faith-driven web development — American born. Texas built. Modern, clean, purpose-driven websites crafted with excellence."
        />
        <meta property="og:title" content="FortyOne Built" />
        <meta
          property="og:description"
          content="Faith-driven web development — American born. Texas built."
        />
        <meta property="og:image" content="/IMG_3389.PNG" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* === Genesis Intro Sequence === */}
      {!showSite && <GenesisIntro onFinish={() => setShowSite(true)} />}

      {/* === Main Site === */}
      {showSite && (
        <>
          <main className="min-h-screen bg-[#0A1A2F] text-[#F5F3E7] scroll-smooth">
            <Navbar />
            <Hero />
            <Projects />
            <About />
            <Contact />
            <Footer />
            <ScrollToTop />
          </main>

          {/* ✨ Sparkle overlay for 2s on load */}
          <SparkleOverlay />
        </>
      )}
    </>
  );
}
