import React from 'react';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['contato-footer']}>
        <div className="row align-items-center g-0">
          <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center">
            <img
              src="/img/icone-whats.png"
              alt="Ícone do WhatsApp"
            />
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className={styles['titulo-contato']}>
              <h4>Precisa falar com a gente? Manda um WhatsApp!</h4>
              <p>Estamos online de Segunda-Feira à Sexta-Feira | 09h às 17h</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
            <div className={styles['button-contato']}>
              <a
                href="https://api.whatsapp.com/send?phone=552140403737"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir conversa no WhatsApp"
              >
                <button type="button" className="btn btn-outline-light">
                  Fale com a gente
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className={`row ${styles['info-footer']}`}>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <p>
            Capitais e Regiões metropolitanas - <strong>21 2277-8383</strong>.
            {' '}PARA DEMAIS LOCALIDADES, <strong>LIGUE: 0800 718 8885</strong>
            <br />
            Atendimento: Segunda à sexta, das 9h às 17h
            <br />
          </p>
          <p>
            Email:{' '}
            <a
              href="mailto:relacionamentocomocliente@grupocontem.com.br"
              style={{ fontSize: 15 }}
            >
              relacionamentocomocliente@grupocontem.com.br
            </a>
          </p>
          <p className={'text-center'}>
            <img
              src="https://www.grupocontem.com.br/src/img/ans.jpg"
              alt="ANS"
              className="mx-auto d-block"
            />
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className={`row ${styles.copyright}`}>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <p>© Copyright 2025 - Grupo Contém - Todos os direitos reservados.</p>
        </div>
      </div>

    </footer>
  );
}
