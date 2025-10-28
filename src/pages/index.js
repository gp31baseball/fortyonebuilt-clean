import { useEffect } from "react"; // ✅ Add this
import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop"; // ✅ Added import

export default function Home() {
  // ✅ Fix for auto-scroll on page refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Disable automatic scroll restoration
      window.history.scrollRestoration = "manual";

      // ✅ Remove any lingering hash (#contact, #about, etc.)
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }

      // Scroll to top cleanly
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

      <main className="min-h-screen bg-[#0A1A2F] text-[#F5F3E7] scroll-smooth">
        {/* === NAVIGATION === */}
        <Navbar />

        {/* === HERO === */}
        <Hero />

        {/* === PROJECT SHOWCASE === */}
        <Projects />

        {/* === ABOUT SECTION === */}
        <About />

        {/* === CONTACT SECTION === */}
        <Contact />

        {/* === FOOTER === */}
        <Footer />

        {/* === SCROLL-TO-TOP BUTTON === */}
        <ScrollToTop />
      </main>
    </>
  );

}
