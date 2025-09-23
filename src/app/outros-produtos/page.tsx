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
            img: "sulamerica-logo.png",
            link: "https://curt.link/plano-saude",
            titulo: "Plano Odontológico",
            target: "_blank"
        },
        {
            img: "porto-seguro.png",
            link: "https://curt.link/plano-saude",
            titulo: "Seguro Viagem",
            target: "_blank"
        },
        {
            img: "porto-seguro.png",
            link: "https://wwws.portoseguro.com.br/vendaonline/residencia/home.ns?cod=c435e27c838445aebdb010459e088186&utm_source=57919J&utm_medium=geradorLinks&utm_campaign=GeradordeLinks_LJ57YJ&utm_content=CONTEM_CORRETORA_DE_SEGUROS",
            titulo: "Seguro Residencial",
            target: "_blank"
        },
        {
            img: "porto-seguro.png",
            link: "https://curt.link/plano-saude",
            titulo: "Seguro de Equipamentos Portáteis",
            target: "_blank"
        },
        {
            img: "porto-seguro.png",
            link: "https://contratafacil-segurovida.paas.sulamerica.com.br/?corretor_id=d99b943e-19d9-46eb-b310-f08c83f5f5b1&utm_source=indicavida",
            titulo: "Seguro de Vida",
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
                    <div className="row">
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
