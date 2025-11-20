import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="relative overflow-hidden">
      {/* === Frosted Glass Overlay with Hero Glow === */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]
                   bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.06)_40%,transparent_80%)]
                   backdrop-blur-[3px]
                   before:content-[''] before:absolute before:inset-0
                   before:bg-[radial-gradient(circle_at_50%_15%,rgba(228,179,67,0.12)_0%,transparent_70%)]
                   before:animate-[heroGlow_12s_ease-in-out_infinite]
                   animate-[frostShift_20s_linear_infinite]"
      />

      {/* === Main Site === */}
      <div className="relative z-[2]">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
