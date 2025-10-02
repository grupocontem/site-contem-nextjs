import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "FAQ | Grupo Contém",
    description:
        "Perguntas frequentes sobre contratação, utilização, coparticipação, cobranças, cancelamento e suporte do Grupo Contém.",
};

type FaqItem =
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] };

type FaqQuestion = {
    q: string;
    a: FaqItem[];
};

type FaqSection = {
    id: string;
    title: string;
    items: FaqQuestion[];
};

const faq: FaqSection[] = [
    {
        id: "contratacao-gestao",
        title: "1. CONTRATAÇÃO E GESTÃO DO PLANO",
        items: [
            {
                q: "Posso mudar a data de vencimento do meu boleto?",
                a: [
                    {
                        type: "p",
                        text:
                            "Sim. A alteração pode ser solicitada pelos canais oficiais da administradora, desde que o plano esteja em dia e haja vigência disponível na operadora.",
                    },
                ],
            },
            {
                q: "É possível trocar o titular do plano?",
                a: [
                    {
                        type: "p",
                        text:
                            "A troca de titularidade pode ser feita mediante análise da operadora, respeitando as regras do contrato. O novo titular deve comprovar vínculo com a entidade de classe elegível.",
                    },
                ],
            },
            {
                q: "Posso fazer um downgrade ou upgrade de plano?",
                a: [
                    {
                        type: "p",
                        text:
                            "Sim, desde que respeitadas as regras contratuais e operacionais da operadora. Mudanças de plano podem implicar em nova contagem de carências, conforme RN 438/2018 da ANS.",
                    },
                ],
            },
            {
                q: "Quem pode contratar um plano coletivo por adesão?",
                a: [
                    {
                        type: "p",
                        text:
                            "Qualquer pessoa que comprove vínculo com entidade de classe, associação, sindicato ou conselho profissional conveniado. Essa exigência está prevista na regulamentação da ANS.",
                    },
                ],
            },
            {
                q: "Quais documentos são necessários para contratar o plano?",
                a: [
                    {
                        type: "ul",
                        items: [
                            "Documento de identidade com foto (RG ou CNH)",
                            "CPF",
                            "Comprovante de residência",
                            "Comprovante de vínculo com entidade de classe",
                            "Ficha de inscrição e proposta de adesão",
                            "Documentações adicionais podem ser exigidas conforme a operadora.",
                        ],
                    },
                ],
            },
            {
                q: "Posso incluir dependentes no meu plano? Quem pode ser meu dependente?",
                a: [
                    {
                        type: "p",
                        text:
                            "Sim. Dependentes permitidos variam conforme a operadora, mas geralmente incluem: cônjuge, filhos, enteados e, em alguns casos, netos e pais. Consulte as regras específicas do seu contrato.",
                    },
                ],
            },
            {
                q: "Qual a diferença entre plano com coparticipação e plano com franquia?",
                a: [
                    {
                        type: "p",
                        text:
                            "Coparticipação: o beneficiário paga um percentual ou valor fixo por cada procedimento utilizado.",
                    },
                    {
                        type: "p",
                        text:
                            "Franquia: o plano cobre os custos após atingir um valor mínimo acumulado. Ambas as modalidades são regulamentadas pela RN 565/2022 da ANS.",
                    },
                ],
            },
        ],
    },
    {
        id: "utilizacao-cobertura",
        title: "2. UTILIZAÇÃO E COBERTURA",
        items: [
            {
                q: "O plano odontológico cobre clareamento dental?",
                a: [{ type: "p", text: "Não. Procedimentos estéticos não são cobertos pelo Rol da ANS." }],
            },
            {
                q: "O plano de saúde cobre cirurgia plástica?",
                a: [
                    {
                        type: "p",
                        text:
                            "Somente cirurgias reparadoras, como reconstruções pós-trauma, queimaduras ou mastectomia. Cirurgias estéticas não têm cobertura obrigatória.",
                    },
                ],
            },
            {
                q: "O plano tem carência? Quais são os prazos?",
                a: [
                    {
                        type: "ul",
                        items: [
                            "24h para urgência e emergência",
                            "300 dias para parto",
                            "180 dias para demais procedimentos",
                            "Prazos seguem limites da RN 195/2009 da ANS e podem variar conforme negociação com a operadora.",
                            "Importante: prazos podem ser reduzidos a critério de cada operadora.",
                        ],
                    },
                ],
            },
            {
                q: "Como funciona a portabilidade de carências?",
                a: [
                    {
                        type: "p",
                        text:
                            "Permitida após o cumprimento de 2 anos de permanência no plano atual (ou 3 anos em caso de cobertura parcial temporária). Consulte a RN 438/2018 para verificar se você se enquadra.",
                    },
                ],
            },
            {
                q: "Já posso usar o plano logo após a assinatura do contrato?",
                a: [
                    {
                        type: "p",
                        text:
                            "Não. O uso do plano ocorre após início de vigência contratual. Verifique também o cumprimento das carências previstas. Consulte sua carta de carência e o contrato.",
                    },
                ],
            },
            {
                q: "Onde consulto a rede credenciada?",
                a: [
                    {
                        type: "p",
                        text:
                            "No site ou aplicativo da operadora, ou pelos nossos canais de atendimento (WhatsApp ou e-mail).",
                    },
                ],
            },
            {
                q: "Posso usar o plano em outra cidade ou estado?",
                a: [
                    {
                        type: "p",
                        text:
                            "Sim, se o plano contratado possuir abrangência estadual ou nacional. Consulte seu contrato ou nossa equipe.",
                    },
                ],
            },
            {
                q: "Exames laboratoriais e consultas com especialistas estão inclusos?",
                a: [
                    {
                        type: "p",
                        text:
                            "Sim, desde que dentro da segmentação contratada e do Rol de Procedimentos da ANS.",
                    },
                ],
            },
            {
                q: "Os planos cobrem próteses ou tratamentos estéticos?",
                a: [
                    {
                        type: "p",
                        text:
                            "Tratamentos estéticos não são cobertos. Próteses são cobertas apenas nos casos previstos no Rol da ANS.",
                    },
                ],
            },
        ],
    },
    {
        id: "coparticipacao-cobrancas",
        title: "3. COPARTICIPAÇÃO E COBRANÇAS",
        items: [
            {
                q: "Quando são cobradas as coparticipações?",
                a: [
                    {
                        type: "p",
                        text:
                            "Entre 30 e 60 dias após a utilização, conforme o ciclo de faturamento da operadora/administradora.",
                    },
                ],
            },
            {
                q: "Qual o valor da coparticipação?",
                a: [
                    {
                        type: "p",
                        text:
                            "Varia por operadora. Pode ser valor fixo (ex.: R$ 25 por consulta) ou percentual (ex.: 30% do procedimento). O valor consta no contrato; verifique também se há teto por boleto.",
                    },
                ],
            },
            {
                q: "Como funciona a cobrança da coparticipação?",
                a: [{ type: "p", text: "É somada à mensalidade no boleto, após o processamento do uso." }],
            },
            {
                q: "O que é a franquia e como impacta na cobrança?",
                a: [
                    {
                        type: "p",
                        text:
                            "É um valor pago diretamente ao prestador no ato do atendimento, válido para planos com fator moderador do tipo franquia.",
                    },
                ],
            },
            {
                q: "Como recebo meu boleto?",
                a: [
                    {
                        type: "p",
                        text:
                            "Enviamos por e-mail antes do vencimento. Também fica disponível no Portal do Cliente e no WhatsApp Oficial (PDF e código de barras).",
                    },
                ],
            },
            {
                q: "Posso pagar por PIX ou débito automático?",
                a: [
                    {
                        type: "p",
                        text:
                            "PIX: solicite a chave pelo canal do cliente. Débito recorrente: disponível via cartão de crédito no Portal do Cliente. Se precisar de apoio, contate nossa equipe (área financeira).",
                    },
                ],
            },
            {
                q: "O que acontece se eu atrasar o pagamento?",
                a: [
                    {
                        type: "p",
                        text:
                            "Podem ocorrer multa, juros e, em casos prolongados, suspensão e cancelamento do plano (RN 195/2009). Regularize o quanto antes.",
                    },
                ],
            },
            {
                q: "Meu boleto está com valor maior que o habitual. O que pode ser?",
                a: [
                    {
                        type: "p",
                        text:
                            "Se houver coparticipação, pode incluir usos de meses anteriores. Sem coparticipação, pode ser reajuste por faixa etária (contratual) ou reajuste anual. Em caso de dúvidas, consulte o contrato ou a Central.",
                    },
                ],
            },
        ],
    },
    {
        id: "cancelamento-reativacao",
        title: "4. CANCELAMENTO E REATIVAÇÃO",
        items: [
            {
                q: "Meu plano foi cancelado. Posso reativar?",
                a: [
                    {
                        type: "p",
                        text:
                            "Depende. Cancelamento por solicitação (RN 561/ANS) não prevê reativação — é preciso contratar novo plano (com novas carências, observando prazo mínimo de reingresso, se houver). Cancelamento por inadimplência pode permitir reativação após quitação, conforme regras da operadora.",
                    },
                ],
            },
            {
                q: "Quero cancelar meu plano. Como devo proceder?",
                a: [
                    {
                        type: "p",
                        text:
                            "Solicitação formal nos canais de atendimento (telefone, formulário assinado/Portal do Cliente ou presencial). O processo segue a RN 561 da ANS e não prevê reativação.",
                    },
                ],
            },
            {
                q: "Posso excluir um dependente do meu plano? Como faço?",
                a: [
                    {
                        type: "p",
                        text:
                            "Sim. A exclusão deve ser solicitada pelo titular, pelos canais oficiais, com envio do formulário de exclusão assinado (central de atendimento ou presencial), observando a RN 561.",
                    },
                ],
            },
            {
                q: "O plano pode ser cancelado pela administradora?",
                a: [
                    {
                        type: "p",
                        text:
                            "Sim, em caso de inadimplência, perda de vínculo com a entidade de classe, ou descumprimento contratual.",
                    },
                ],
            },
        ],
    },
    {
        id: "atendimento-suporte",
        title: "5. ATENDIMENTO E SUPORTE",
        items: [
            {
                q: "Como entro em contato com a administradora?",
                a: [
                    {
                        type: "p",
                        text:
                            "GRUPO CONTÉM\nCentral: (21) 2277-8383 | 0800 718 8885\nWhatsApp: (21) 4040-3737\nE-mail: relacionamentocomocliente@grupocontem.com.br\nSite: www.grupocontem.com.br\nPortal: https://www.digitalsaude.com.br/portal/contem",
                    },
                ],
            },
            {
                q: "Tenho dúvidas sobre uma cobrança. Com quem falo?",
                a: [{ type: "p", text: "Entre em contato com nossa Central de Atendimento." }],
            },
            {
                q: "Como faço para alterar dados cadastrais (endereço, telefone, e-mail)?",
                a: [
                    {
                        type: "p",
                        text:
                            "Pelo Portal do Cliente ou pelos canais oficiais, com validação dos dados do titular.",
                    },
                ],
            },
            {
                q: "Onde posso acessar o contrato do meu plano e o regulamento da coparticipação?",
                a: [
                    {
                        type: "p",
                        text:
                            "Solicite por e-mail, WhatsApp ou acesse pela área do beneficiário (quando disponível).",
                    },
                ],
            },
        ],
    },
    {
        id: "documentos-solicitacoes",
        title: "6. DOCUMENTOS E SOLICITAÇÕES",
        items: [
            {
                q: "Recebi uma negativa de atendimento. O que devo fazer?",
                a: [
                    {
                        type: "p",
                        text:
                            "Antes, verifique se o local é credenciado e se não há carência a cumprir. Depois, contate imediatamente a operadora para verificação e abertura da reclamação. Questões assistenciais são responsabilidade da operadora.",
                    },
                ],
            },
            {
                q: "Onde solicito minha carta de permanência?",
                a: [
                    {
                        type: "p",
                        text:
                            "Pelos nossos canais oficiais (WhatsApp, e-mail ou telefone) ou diretamente no Portal do Cliente.",
                    },
                ],
            },
            {
                q: "Onde e como solicitar a carta de portabilidade?",
                a: [
                    {
                        type: "p",
                        text:
                            "A carta de portabilidade é fornecida pela operadora do plano. Solicite diretamente nos canais da sua operadora.",
                    },
                ],
            },
            {
                q: "Onde e como solicitar a declaração para Imposto de Renda?",
                a: [
                    {
                        type: "p",
                        text:
                            "A declaração anual de pagamentos pode ser solicitada por WhatsApp, e-mail ou telefone, ou retirada diretamente no Portal do Cliente da nossa administradora.",
                    },
                ],
            },
            {
                q: "Onde e como solicitar o comprovante de cancelamento?",
                a: [
                    {
                        type: "p",
                        text:
                            "Enviado ao e-mail cadastrado do titular em até 10 dias após o cancelamento, mesmo sem solicitação prévia.",
                    },
                ],
            },
            {
                q: "Como solicitar a 2ª via da carteirinha do plano?",
                a: [
                    {
                        type: "p",
                        text:
                            "Nos casos de carteira física, solicite diretamente conosco. Para carteiras digitais, acesse o app da sua operadora.",
                    },
                ],
            },
        ],
    },
];

function renderAnswer(a: FaqItem[]) {
    return a.map((block, idx) => {
        if (block.type === "p") {
            const parts = block.text.split("\n");
            return (
                <p className="mb-2" key={`p-${idx}`}>
                    {parts.map((line, i) => (
                        <span key={i}>
                        {line}
                        {i < parts.length - 1 && <br />}
                        </span>
                    ))}
                </p>
            );
        }
        if (block.type === "ul") {
            return (
                <ul className="mb-2" key={`ul-${idx}`}>
                    {block.items.map((li, i) => (
                        <li key={i}>{li}</li>
                    ))}
                </ul>
            );
        }
        return null;
    });
}

export default function Faq() {
    return (
        <>
            <section className="faixa-titulo">
                <div className="conteudo">
                    <div className="texto">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h1>FAQ</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="faq">
                <div className="container pt-5">

                    {faq.map((section) => (
                        <div className="mb-5" key={section.id}>
                            <h2 className="h4 mb-3">{section.title}</h2>
                            <div className="accordion custom-accordion" id={`acc-${section.id}`}>
                                {section.items.map((item, iIdx) => {
                                    const collapseId = `acc-${section.id}-item-${iIdx}`;
                                    const headingId = `${collapseId}-heading`;
                                    return (
                                        <div className="accordion-item" key={collapseId}>
                                            <h3 className="accordion-header" id={headingId}>
                                                <button
                                                    className={`accordion-button ${iIdx !== 0 ? "collapsed" : ""}`}
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#${collapseId}`}
                                                    aria-expanded={iIdx === 0 ? "true" : "false"}
                                                    aria-controls={collapseId}
                                                >
                                                    {item.q}
                                                </button>
                                            </h3>
                                            <div
                                                id={collapseId}
                                                className={`accordion-collapse collapse ${iIdx === 0 ? "show" : ""}`}
                                                aria-labelledby={headingId}
                                                data-bs-parent={`#acc-${section.id}`}
                                            >
                                                <div className="accordion-body">{renderAnswer(item.a)}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
