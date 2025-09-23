import './../css/home.css'
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Página Inicial | Grupo Contém",
    description: "Bem-vindo ao Grupo Contém, onde você encontra os melhores planos de saúde e serviços para sua empresa.",
};

export default function Home() {
    return (
        <>
              <section>
                  <div
                      id="carouselExampleSlidesOnly"
                      className="carousel carousel-dark slide"
                      data-bs-ride="carousel"
                  >
                      <div className="carousel-indicators">
                          <button
                              type="button"
                              data-bs-target="#carouselExampleSlidesOnly"
                              data-bs-slide-to="0"
                              className="active"
                              aria-current="true"
                              aria-label="Slide 1"
                          ></button>
                          <button
                              type="button"
                              data-bs-target="#carouselExampleSlidesOnly"
                              data-bs-slide-to="1"
                              aria-label="Slide 2"
                          ></button>
                      </div>

                      <div className="carousel-inner">
                          <div className="carousel-item active" id="carousel-container" data-bs-interval="5000">
                              <img src={'/img/Banner02.jpg'} className="d-block w-100" id="img-carousel" alt="Banner 02" />
                              <div className="carousel-caption d-md-block">
                                  <h5>Planos empresariais<br />do tamanho da sua empresa</h5>
                                  <br />
                                  <img src={'/img/logos-banner2.png'} alt="logos" className="ans" height="50" />
                                  <br />
                                  <img src={'/img/ans-banner2.png'} alt="ANS" height="18" className="ans" />
                              </div>
                          </div>

                          <div className="carousel-item" id="carousel-container" data-bs-interval="5000">
                              <img src={'/img/Banner03.jpg'} className="d-block w-100" id="img-carousel" alt="Banner 02" />
                              <div className="carousel-caption d-md-block">
                                  <h5>PLANEJE <br /> SUA VIDA.</h5>
                                  <p>Do resto a gente cuida!</p>
                                  <br />
                                  <img src={'/img/logos-banner3.png'} alt="logos" height="50" />
                                  <br />
                                  <img src={'/img/ans-banner3.png'} alt="ANS" height="18" className="ans" />
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              <section>
                  <div className="faixa-laranja d-flex flex-column align-items-center gap-3 text-center p-5">
                      <h3 className="m-0">Simule, compare e contrate planos direto por aqui</h3>
                      <a href="/cotacao" className="text-decoration-none">
                          <button type="button" className="btn btn-outline-light">Compare</button>
                      </a>
                  </div>
              </section>

              <section className="descricao-section">
                  <div className="conteudo-descricao text-center">
                      <h1>É TUDO MUITO FÁCIL</h1>
                      <p>O Grupo Contém oferece os melhores planos e preços acessíveis para<br />você ter mais tranquilidade, e serviços online pra facilitar sua vida.</p>
                  </div>

                  <div className="container">
                      <div className="row descricao-item">
                          <div className="col-12 col-md-12">
                              <div className="row align-items-center">
                                  <div className="col-lg-3" id="icone-descricao">
                                      <img src={'/img/icone-barras.png'} alt="Ícone barras" />
                                  </div>
                                  <div className="col-lg-6" id="descricao-texto">
                                      <p><strong>2º VIA DO BOLETO</strong></p>
                                      <p>Seu boleto não chegou? Ou será que você perdeu? Não tem problema, em poucos cliques você imprime um novo.</p>
                                  </div>
                                  <div className="col-lg-3" id="button-descricao">
                                      <a href="/boleto">
                                          <button type="button" className="btn btn-primary">Clique Aqui</button>
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <hr />

                      <div className="row descricao-item">
                          <div className="col-12 col-md-12">
                              <div className="row align-items-center">
                                  <div className="col-lg-3" id="icone-descricao">
                                      <img src={'/img/icone-corretor.png'} alt="Ícone corretor" />
                                  </div>
                                  <div className="col-lg-6" id="descricao-texto">
                                      <p><strong>SITE DO CORRETOR</strong></p>
                                      <p>Aqui o corretor encontra tudo que precisa atualizado diariamente para seu trabalho.</p>
                                  </div>
                                  <div className="col-lg-3" id="button-descricao">
                                      <a href="/pj-contem">
                                          <button type="button" className="btn btn-primary">Clique Aqui</button>
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
        </>
  );
}
