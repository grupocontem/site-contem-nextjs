"use client";

import { useEffect, useState } from "react";
import styles from "./corretorSpotlight.module.css";

const SPOTLIGHT_KEY = "gc_corretor_spotlight_v1";
const COOKIE_KEY = "gc_cookie_consent_v1";
const ANUNCIO_KEY = "gc_anuncio_negocia_v1";

interface BtnRect { top: number; left: number; width: number; height: number; }

export default function CorretorSpotlight() {
  const [visible, setVisible] = useState(false);
  const [btnRect, setBtnRect] = useState<BtnRect | null>(null);

  useEffect(() => {
    try { if (localStorage.getItem(SPOTLIGHT_KEY)) return; } catch { return; }

    const show = () => {
      const btn = document.getElementById("corretor-btn-desktop");
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      setBtnRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      setVisible(true);
    };

    let timer: ReturnType<typeof setTimeout>;
    const tryShow = () => { timer = setTimeout(show, 600); };
    // On the home page, let the promo modal go first (wait until it's dismissed).
    const anuncioPending = () => {
      if (window.location.pathname !== "/") return false;
      try { return !localStorage.getItem(ANUNCIO_KEY); } catch { return false; }
    };
    const readyToShow = () => {
      try { return !!localStorage.getItem(COOKIE_KEY) && !anuncioPending(); } catch { return false; }
    };

    if (readyToShow()) {
      tryShow();
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      if (readyToShow()) {
        clearInterval(interval);
        tryShow();
      }
    }, 500);

    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try { localStorage.setItem(SPOTLIGHT_KEY, "1"); } catch {}
  };

  if (!visible || !btnRect) return null;

  const PAD = 8;

  return (
    <div className={styles.overlay} onClick={dismiss}>
      <div
        className={styles.highlight}
        style={{
          top: btnRect.top - PAD,
          left: btnRect.left - PAD,
          width: btnRect.width + PAD * 2,
          height: btnRect.height + PAD * 2,
        }}
      />
      <div
        className={styles.callout}
        style={{
          top: btnRect.top + btnRect.height + PAD + 14,
          left: btnRect.left + btnRect.width / 2,
        }}
        onClick={e => e.stopPropagation()}
      >
        <p className={styles.calloutText}>
          Clique aqui para acessar o <strong>Portal do Corretor</strong>
        </p>
        <a
          href="https://corretor.grupocontem.com.br"
          target="_blank"
          rel="noreferrer"
          className={styles.calloutCta}
          onClick={dismiss}
        >
          Ir ao Portal do Corretor
        </a>
        <button className={styles.calloutDismiss} onClick={dismiss}>
          Ok, entendi
        </button>
      </div>
    </div>
  );
}
