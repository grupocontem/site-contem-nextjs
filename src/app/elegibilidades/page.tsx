import '../../css/elegibilidades.css'
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Elegibilidades | Grupo Contém",
    description: "Entre em contato com a equipe do Grupo Contém",
};

export default function Elegibilidades() {
    const logos = [
        "unipro.jpg",
        "sisergs.png",
        "forca.png",
        "unicom.png",
        "sinttargs.png",
        "sindjustica.png",
        "securitarios.png",
        "sindesc.png",
        "sindec.png",
        "senge.png",
        "aple.png",
        "feneb.png",
        "creci.png",
        "cra.png",
        "core.png",
        "anc.png",
        "untetec.jpg",
        "prime-leste.jpg",
        "assist-baixada.jpg",
        "amicoserv.jpg",
        "abrae.jpg",
        "unpe.jpg",
        "uniservip.jpg",
        "uned.jpg",
        "unapi-brasil.jpg",
        "unapp.jpg",
        "unapra.jpg",
        "aplb.jpg",
    ];

    return (
        <>
            <section className="faixa-titulo">
                <div className="conteudo">
                    <div className="texto">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h1>Elegibilidades</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="elegibilidades">
                <div className="container">
                    <div className="row">
                        <h2>ENTIDADES PARCEIRAS</h2>
                        <div className="row g-3">
                            {logos.map((file, i) => (
                                <div className="col-lg-2 col-md-6 col-sm-6 col-12" key={file + i}>
                                    <div className="card">
                                        <img src={`/img/elegibilidades/${file}`} className="card-img-top" alt={file.replace(/[-_]/g, " ").replace(/\..+$/, "")} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
