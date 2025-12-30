"use client";

import Script from "next/script";
import React, { useEffect } from "react";

function ConsentBanner() {
  const [consentGiven, setConsentGiven] = React.useState(false);

  // Check once on mount if consent was previously stored.
  useEffect(() => {
    const saved = localStorage.getItem("user-consent");
    if (saved === "true") {
      setConsentGiven(true);
    }
  }, []);

  const handleSubmit = () => {
    localStorage.setItem("user-consent", "true");
    setConsentGiven(true);
  };

  return (
    <>
      {!consentGiven && (
        <div className="fixed right-4 bottom-4 z-50 flex w-[260px] flex-col gap-3 rounded-lg border border-black bg-white p-4 shadow-lg">
          <span className="text-sm font-medium">
            Wir nutzen Cookies für Google Analytics. Stimmen Sie zu?
          </span>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSubmit}
              className="rounded bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Zustimmen
            </button>
          </div>
        </div>
      )}
      {consentGiven && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-5FGM5E8TL2"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXX', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}
    </>
  );
}

export default ConsentBanner;
