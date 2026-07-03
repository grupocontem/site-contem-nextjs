"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./anuncioModal.module.css";

// Bump this suffix to show the promo again after changing the image/campaign.
export const ANUNCIO_KEY = "gc_anuncio_negocia_v1";
const COOKIE_KEY = "gc_cookie_consent_v1";

const IMAGE_SRC = "/img/negocia-contem.png";
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5521923678259";

export default function AnuncioModal() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only on the home page (re-evaluated on client-side navigation).
    if (pathname !== "/") return;
    // Show once per visitor.
    try { if (localStorage.getItem(ANUNCIO_KEY)) return; } catch { return; }

    const cookieDecided = () => {
      try { return !!localStorage.getItem(COOKIE_KEY); } catch { return false; }
    };

    let timer: ReturnType<typeof setTimeout>;
    const show = () => { timer = setTimeout(() => setVisible(true), 400); };

    // Wait for the cookie banner to be dismissed so the modals don't stack.
    if (cookieDecided()) {
      show();
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      if (cookieDecided()) {
        clearInterval(interval);
        show();
      }
    }, 500);

    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;
    document.body.classList.add("modal-open");
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    try { localStorage.setItem(ANUNCIO_KEY, "1"); } catch {}
  };

  if (!visible) return null;

  return (
    <div className={styles.backdrop} onClick={dismiss} role="dialog" aria-modal="true" aria-label="Anúncio Grupo Contém">
      <div className={styles.dialog} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={dismiss} aria-label="Fechar anúncio">
          &times;
        </button>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className={styles.imageLink}
          onClick={dismiss}
        >
          <img
            src={IMAGE_SRC}
            alt="Negocia Contém — novo WhatsApp exclusivo para assuntos financeiros: 21 92367-8259"
            className={styles.image}
          />
        </a>
      </div>
    </div>
  );
}
