import '../../css/boleto.css'

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contato | Grupo Contém",
    description: "Busque a segunda via do seu boleto de forma rápida e fácil. Fale conosco pelo WhatsApp ou acesse o Portal do Cliente.",
};

export default function Elegibilidades() {
    return (
        <>
            <section className="faixa-titulo">
                <div className="conteudo">
                    <div className="texto">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h1>Boleto</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="boleto">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <p>
                                Para sua comodidade, a nossa plataforma oferece duas formas
                                práticas e rápidas de solicitar a segunda via do boleto.
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 text-center">
                            <p className="mb-4">
                                Escolha o canal que melhor se adequa à sua rotina e resolva
                                rapidamente a emissão do seu boleto de forma prática e eficiente.
                            </p>
                        </div>
                    </div>

                    <div className="row g-0 mb-4">
                        <div className="col-12">
                            <div className="btn-container d-flex flex-wrap gap-2 justify-content-center">
                                <a
                                    href="https://api.whatsapp.com/send?phone=552140403737"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-whatsapp btn-sm d-inline-flex align-items-center gap-2"
                                    aria-label="Fale conosco no WhatsApp"
                                >
                                    <i className="fab fa-whatsapp" aria-hidden="true" />
                                    Fale Conosco no WhatsApp
                                </a>

                                <a
                                    href="https://digitalsaude.com.br/portal/contem"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-laranja btn-sm"
                                >
                                    Acessar o Portal do Cliente
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
