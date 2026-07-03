"use client";

import React, { useEffect } from "react";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import FloatingWhatsApp from "@/components/FloatingWhatsApp/FloatingWhatsApp";
import CorretorSpotlight from "@/components/CorretorSpotlight/CorretorSpotlight";
import AnuncioModal from "@/components/AnuncioModal/AnuncioModal";
// Loads Bootstrap JS (requires Popper for some components)
export default function BootstrapClient() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
        <CookieConsent />
        <AnuncioModal />
        <CorretorSpotlight />
        <FloatingWhatsApp />
    </>
  );
}
