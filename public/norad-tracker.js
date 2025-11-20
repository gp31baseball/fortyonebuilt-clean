(function () {
  const NORAD_ENDPOINT = "https://fortyonebuilt.com/api/norad/track";

  // --- Generate or reuse device ID ---
  function getDeviceId() {
    let id = localStorage.getItem("norad_device_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("norad_device_id", id);
    }
    return id;
  }

  // --- Generate or reuse session ID ---
  function getSessionId() {
    let id = sessionStorage.getItem("norad_session_id");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("norad_session_id", id);
    }
    return id;
  }

  async function sendEvent(eventType, extras = {}) {
    try {
      await fetch(NORAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true, // allows calls during navigation
        body: JSON.stringify({
          projectId: window.__NORAD_PROJECT_ID__,
          eventType,
          timestamp: Date.now(),
          origin: location.origin,
          path: location.pathname,
          referrer: document.referrer || null,
          country: null, // (optional enhancement: edge resolver)
          deviceId: getDeviceId(),
          sessionId: getSessionId(),
          dataSourceName: "client",
          ...extras,
        }),
      });
    } catch (err) {
      // NORAD should NEVER break the site
      console.warn("NORAD error:", err);
    }
  }

  // --- Send initial pageview ---
  window.addEventListener("load", () => {
    sendEvent("pageview");
  });

  // --- Track page changes for SPA (Next.js) ---
  let lastPath = location.pathname;
  setInterval(() => {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      sendEvent("pageview");
    }
  }, 800);

})();
