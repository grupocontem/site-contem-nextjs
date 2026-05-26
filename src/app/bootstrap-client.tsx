"use client";

import React, { useEffect } from "react";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import FloatingWhatsApp from "@/components/FloatingWhatsApp/FloatingWhatsApp";
import CorretorSpotlight from "@/components/CorretorSpotlight/CorretorSpotlight";
// Loads Bootstrap JS (requires Popper for some components)
export default function BootstrapClient() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
        <CookieConsent />
        <CorretorSpotlight />
        <FloatingWhatsApp />
    </>
  );
}
