import React from "react";

export default function NotFoundPage() {
    return (
        <>
            <section className="faixa-titulo">
                <div className="conteudo">
                    <div className="texto">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h1>Oops!</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container py-5" style={{ fontFamily: "gotham, sans-serif" }}>
                <div className="row justify-content-center text-center">
                    <div className="col-lg-8">
                        <h1 className="display-4 fw-bold mb-3" style={{ color: "#f2552e" }}>
                            404
                        </h1>
                        <h2 className="h3 mb-4">Página não encontrada</h2>
                        <p className="text-muted mb-4" style={{ fontSize: "18px" }}>
                            A página que você está procurando não existe ou foi movida.
                        </p>
                        <a href="/" className="btn btn-primary">
                            Voltar para a página inicial
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
