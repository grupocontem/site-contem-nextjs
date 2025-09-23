import '../../css/sobrenos.css'
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Sobre Nós | Grupo Contém",
    description: "Conheça o Grupo Contém, sua missão, visão e valores",
};

export default function Sobrenos(){
    return (
        <>
            {/* Section Título */}
            <section className="faixa-titulo">
                <div className="conteudo">
                    <div className="texto">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12">
                                    <h1>O GRUPO</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* O grupo Section */}
            <section className="descricao-grupo">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ textAlign: "justify" }}>
                            <h2>missão, visão e valores</h2>
                            <p>
                                Desde 2004, nossa missão tem sido oferecer as melhores soluções de planos e seguros,
                                combinando preços acessíveis com um atendimento excepcional. Nos comprometemos com uma
                                governança corporativa responsável e com o desenvolvimento profissional de nossos contemplados,
                                o que nos habilita a oferecer um atendimento diferenciado, através de nossa equipe de
                                profissionais experientes e capacitados.
                            </p>
                            <p>
                                Nossos valores de transparência, respeito, espírito de dono, trabalho em equipe, cuidado e ética
                                permeiam tudo o que fazemos. Nos dedicamos a uma comunicação clara, valorizamos a diversidade e
                                atuamos com responsabilidade e zelo, sempre buscando fazer o correto.
                            </p>
                            <p>
                                Nossa visão é sermos reconhecidos como um grupo moderno e qualificado, liderando o mercado com
                                inovação e expertise. Convidamos você a explorar como podemos atender suas necessidades e superar
                                suas expectativas com soluções personalizadas e eficientes.
                            </p>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ textAlign: "center" }}>
                            <div className="row g-4">
                                <div className="col-12">
                                    <div className="bloco-item">
                                        <div className="bloco-conteudo">
                                            <img src={'/img/missao.png'} className="img-bloco" alt="Missão" />
                                            <div className="bloco-titulos">
                                                <h4><b>MISSÃO</b></h4>
                                                <p>Proporcionar acesso à saúde de qualidade, com valores acessíveis e acolhimento que faz a diferença.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="bloco-item">
                                        <div className="bloco-conteudo">
                                            <img src={"/img/valores.png"} className="img-bloco" alt="Valores" />
                                            <div className="bloco-titulos text-start">
                                                <h4><b>VALORES</b></h4>
                                                <p><b>Transparência:</b> Valorizamos a comunicação clara e a confiança que ela gera.</p>
                                                <p><b>Respeito:</b> Acolhemos a diversidade com igualdade.</p>
                                                <p><b>Espírito de Dono:</b> Vestimos a camisa com orgulho e entregamos resultados como dono.</p>
                                                <p><b>Time:</b> Jogamos juntos, crescemos juntos.</p>
                                                <p><b>Cuidado:</b> Zelo é nossa marca no agir, no falar e no servir.</p>
                                                <p><b>Ética:</b> Fazemos o que é certo mesmo quando ninguém está olhando.</p>
                                                <p style={{ margin: 0, padding: 0 }}><b>Agilidade:</b> Respondemos com rapidez e entregamos com eficiência, sem perder a excelência.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="bloco-item">
                                        <div className="bloco-conteudo">
                                            <img src={'/img/visao.png'} className="img-bloco" alt="Visão" />
                                            <div className="bloco-titulos">
                                                <h4><b>VISÃO</b></h4>
                                                <p>
                                                    Ser reconhecida como a melhor administradora de planos de saúde e odontológico do Brasil pelos
                                                    corretores e clientes, por um atendimento incomparável, pela agilidade nas soluções e por crescer
                                                    com solidez e respeito.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}