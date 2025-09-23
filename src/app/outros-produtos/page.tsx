import '../../css/outros-produtos.css'
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Outros Produtos | Grupo Contém",
    description: "Conheça nossos outros produtos e serviços",
};

export default function OutrosProdutos() {
    const produtos = [
        {
            img: "Logo-Clube-de-Benefícios-saude.png",
            link: "https://www.clubesaudecuidado.com.br/",
            titulo: "Clube de Benefícios",
            target: "_blank"
        },
        {
            img: "porto-seguro.png",
            link: "https://curt.link/plano-saude",
            titulo: "Seguro Viagem",
            target: "_blank"
        },
        {
            img: "logo.png",
            link: "https://api.whatsapp.com/send?phone=5521998786297",
            titulo: "Plano Odontológico",
            target: "_blank"
        },
        {
            img: "logo.png",
            link: "https://api.whatsapp.com/send?phone=5521998786297",
            titulo: "Saúde",
            target: "_blank"
        }
    ];

    return (
        <>
            <section className="faixa-titulo">
                <div className="conteudo">
                    <div className="texto">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h1>OUTROS PRODUTOS</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="produtos">
                <div className="container">
                    <div className="row justify-content-center">
                        {produtos.map((produto, index) => (
                            <div
                                className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4"
                                id="card-around"
                                key={index}
                            >
                                <div className="card h-100">
                                    <img
                                        src={'/img/produtos/' + produto.img}
                                        className="card-img-top"
                                        alt={produto.titulo}
                                    />
                                    <div className="card-body">
                                        <a
                                            href={produto.link}
                                            target={produto.target}
                                            rel="noopener noreferrer"
                                            className="btn btn-primary"
                                        >
                                            Contrate aqui
                                        </a>
                                        <h5 className="card-title mt-3">{produto.titulo}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
