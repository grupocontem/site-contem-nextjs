"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/sobrenos", label: "O GRUPO" },
  { href: "/operadoras", label: "OPERADORAS" },
  { href: "/elegibilidades", label: "ELEGIBILIDADES" },
  { href: "/outros-produtos", label: "OUTROS PRODUTOS" },
  { href: "/contato", label: "CONTATO" },
  { href: "/blog", label: "BLOG" },
  { href: '/faq', label: 'FAQ' }
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className={styles.header}>
      <div className="bg-white border-bottom">
        <div className="container d-none d-lg-flex justify-content-end gap-2 py-2">
          <a
            href="https://www.digitalsaude.com.br/portal/contem"
            className="btn btn-sm btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Área do Cliente
          </a>
          <a
            href="/boleto"
            className="btn btn-sm btn-success"
            target="_blank"
            rel="noreferrer"
          >
            2ª via de boleto
          </a>
            {/*<a
            href="https://www.grupocontem.com.br/cotacao.php"
            className="btn btn-sm btn-success"
            target="_blank"
            rel="noreferrer"
          >
            Faça sua Cotação
          </a>*/}
            {/*<a
          <a
            href="https://www.grupocontem.com.br/curriculo.php"
            className="btn btn-sm btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Trabalhe Conosco
          </a>*/}
        </div>
      </div>

      {/* Main navbar */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light" data-bs-theme="light">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={"../img/logo.png"} alt="Grupo Contem" height={36} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navItems.map(({ href, label }) => (
                <li key={href} className="nav-item">
                  {/* Next Link for internal routes, fallback to anchor if it's external */}
                  {href.startsWith("http") ? (
                    <a className={`nav-link ${styles.navLink}`} href={href}>
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className={`nav-link ${styles.navLink} ${isActive(href) ? styles.navLinkActive : ""}`}
                      aria-current={isActive(href) ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Right action buttons for mobile inside collapse */}
            <div className="d-lg-none d-flex flex-column gap-2 mb-3">
              <a
                href="https://www.digitalsaude.com.br/portal/contem"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Área do Cliente
              </a>
                {/*<a
                href="https://www.grupocontem.com.br/pj-contem?origin=contem"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Área do Corretor
              </a>*/}
              <a
                href="https://www.grupocontem.com.br/boleto.php"
                className="btn btn-success"
                target="_blank"
                rel="noreferrer"
              >
                2ª via de boleto
              </a>
              {/*<a
                href="https://www.grupocontem.com.br/cotacao.php"
                className="btn btn-success"
                target="_blank"
                rel="noreferrer"
              >
                Faça sua Cotação
              </a>*/}
                {/*<a
                href="https://www.grupocontem.com.br/curriculo.php"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Trabalhe Conosco
              </a>*/}
            </div>

            {/* Social icons (right side on desktop) */}
            <div className="d-none d-lg-flex align-items-center gap-2 ms-4">
              <a href="https://www.facebook.com/grupocontem" target="_blank" rel="noopener noreferrer">
                <span className={styles.iconWrap}>
                  <img src="/img/facebook_icon.png" alt="Facebook" />
                </span>
              </a>
              <a href="https://www.instagram.com/grupocontem/" target="_blank" rel="noopener noreferrer">
                <span className={styles.iconWrap}>
                  <img src="/img/instagram_icon.png" alt="Instagram" />
                </span>
              </a>
              <a href="https://www.linkedin.com/company/grupocontem/" target="_blank" rel="noopener noreferrer">
                <span className={styles.iconWrap}>
                  <img src="/img/linkedin_icon.png" alt="LinkedIn" />
                </span>
              </a>
              <a href="https://www.tiktok.com/@grupocontemadm" target="_blank" rel="noopener noreferrer">
                <span className={styles.iconWrap}>
                  <img src="/img/tiktok_icon.png" alt="TikTok" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
