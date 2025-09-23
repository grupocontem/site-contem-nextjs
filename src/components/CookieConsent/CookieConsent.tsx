"use client";

import React, { useEffect, useState } from "react";

type Consent = "accepted" | "rejected" | null;
const STORAGE_KEY = "gc_cookie_consent_v1";

import './cookieconsent.css';

export default function CookieConsentModal() {
    const [consent, setConsent] = useState<Consent>(null);
    const [open, setOpen] = useState(false);
    const [view, setView] = useState<"consent" | "policy">("consent");

    useEffect(() => {
        if (open) document.body.classList.add("modal-open");
        else document.body.classList.remove("modal-open");
        return () => document.body.classList.remove("modal-open");
    }, [open]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY) as Consent;
            if (saved === "accepted" || saved === "rejected") {
                setConsent(saved);
                setOpen(false);
                if (saved === "accepted") enablePostConsentScripts();
            } else {
                setOpen(true);
            }
        } catch {
            setOpen(true);
        }
    }, []);

    function accept() {
        setConsent("accepted");
        setOpen(false);
        try { localStorage.setItem(STORAGE_KEY, "accepted"); } catch {}
        enablePostConsentScripts();
    }

    function reject() {
        setConsent("rejected");
        setOpen(false);
        try { localStorage.setItem(STORAGE_KEY, "rejected"); } catch {}
    }

    function enablePostConsentScripts() {
        // Ex.: Consent Mode / tags de analytics
        // window.gtag?.("consent", "update", { analytics_storage: "granted" });
    }

    if (!open) return null;

    return (
        <>
            <div className="modal-backdrop show" />

            <div
                className="modal d-block"
                role="dialog"
                aria-modal="true"
                aria-labelledby="cookieConsentTitle"
                aria-describedby="cookieConsentDesc"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content rounded-4 shadow-lg">
                        <div className="modal-header border-0">
                            <h5 className="modal-title" id="cookieConsentTitle">
                                {view === "consent" ? "Consentimento de Cookies" : "Política de Privacidade / Termos de Uso"}
                            </h5>

                            {view === "policy" && (
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Fechar"
                                    onClick={() => setView("consent")}
                                />
                            )}
                        </div>

                        {view === "consent" ? (
                            <>
                                <div className="modal-body">
                                    <p id="cookieConsentDesc" className="mb-2">
                                        Usamos cookies para melhorar sua experiência, analisar tráfego e personalizar conteúdo.
                                        Ao clicar em <strong>Aceitar</strong>, você concorda com o uso de cookies conforme nossa{" "}
                                        <button
                                            type="button"
                                            className="btn btn-link p-0 align-baseline link-gc"
                                            onClick={() => setView("policy")}
                                        >
                                            Política de Privacidade / Termos
                                        </button>.
                                    </p>
                                    <small className="text-muted">
                                        Você pode alterar sua escolha a qualquer momento limpando os dados do site no seu navegador.
                                    </small>
                                </div>

                                <div className="modal-footer border-0 d-flex justify-content-between">
                                    <button type="button" className="btn btn-gc-ghost" onClick={reject}>
                                        Recusar
                                    </button>
                                    <button type="button" className="btn btn-gc-primary" onClick={accept}>
                                        Aceitar
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="modal-body">
                                    <div className="gc-policy-scroll">
                                        <section className="mb-4"><p> Trata-se de Termos e Condições de Uso do site.
                                            Este documento reúne as regras, condições e informações que devem ser
                                            observadas por todos que acessam ou utilizam o site{" "} <a
                                                href="https://www.grupocontem.com.br" target="_blank"
                                                rel="noopener noreferrer"> https://www.grupocontem.com.br </a>,
                                            disponibilizado pela ADMINISTRADORA. Ao utilizar o site, o usuário declara
                                            que leu e concorda integralmente com estas condições. Usuários menores de
                                            idade ou incapazes precisam da permissão de seus responsáveis, que também
                                            devem concordar com estes termos. Caso não concorde, pedimos que não
                                            permaneça no site. </p></section>
                                        <section className="mb-4"><h6 className="fw-bold">1. OBJETO</h6> <p>1.1. O site
                                            tem por objeto a troca de informações administrativas referentes ao seu
                                            plano de saúde, de forma rápida e fácil.</p></section>
                                        <section className="mb-4"><h6 className="fw-bold">2. SERVIÇOS DISPONÍVEIS PELO
                                            SITE</h6> <p> 2.1. Serviços destinados exclusivamente aos beneficiários dos
                                            planos privados de assistência médico-hospitalar e odontológica da
                                            ADMINISTRADORA. <br/> 2.2. Os serviços podem ser descontinuados, cancelados,
                                            interrompidos ou suspensos a qualquer tempo, a critério da ADMINISTRADORA,
                                            sem aviso prévio. <br/> 2.3. Os serviços devem ser interpretados como
                                            benefício, não obrigatoriedade. <br/> 2.4. Diversas funcionalidades podem
                                            ser disponibilizadas para consultas administrativas do plano. </p> <p
                                            className="mb-1">2.5. Exemplos de serviços (podem possuir Termos de Uso
                                            próprios):</p>
                                            <ul className="mb-2">
                                                <li>Rede credenciada</li>
                                                <li>Acesso a faturas vencidas</li>
                                                <li>Acesso a faturas abertas</li>
                                                <li>2ª via de faturas</li>
                                                <li>Carteira provisória</li>
                                                <li>Demonstrativo de Imposto de Renda</li>
                                                <li>Declaração de pagamento</li>
                                                <li>Declaração de Conformidade</li>
                                                <li>Solicitações de cancelamento</li>
                                                <li>Recuperação e alteração de senha</li>
                                                <li>Fale conosco</li>
                                            </ul>
                                            <p>2.5.1. A ADMINISTRADORA poderá incluir ou retirar serviços, ou
                                                disponibilizá-los a determinados usuários conforme a modalidade do
                                                plano.</p></section>
                                        <section className="mb-4"><h6 className="fw-bold">3. OBRIGAÇÕES E
                                            RESPONSABILIDADES DA ADMINISTRADORA</h6> <p> 3.1. O site é apresentado “no
                                            estado em que se encontra” e pode passar por atualizações. A ADMINISTRADORA
                                            compromete-se a: </p>
                                            <ul>
                                                <li>3.1.1. Assegurar bom funcionamento e um layout que respeite
                                                    usabilidade e navegabilidade;
                                                </li>
                                                <li>3.1.2. Disponibilizar serviços de forma clara, completa e precisa;
                                                </li>
                                                <li>3.1.3. Tratar dados pessoais com segurança e boas práticas de
                                                    proteção de dados.
                                                </li>
                                            </ul>
                                            <p className="mb-1">3.2. A ADMINISTRADORA não se responsabiliza por:</p>
                                            <ul>
                                                <li>3.2.1. Falhas de acesso por indisponibilidade da Internet, energia,
                                                    hardware/software do usuário;
                                                </li>
                                                <li>3.2.2. Problemas/bugs/glitches nos recursos do usuário decorrentes
                                                    do uso regular;
                                                </li>
                                                <li>3.2.3. Erros de sistemas que possam alterar dados do site;</li>
                                                <li>3.2.4. Danos causados por ataques de terceiros (vírus, malware,
                                                    etc.);
                                                </li>
                                                <li>3.2.5. Dados cadastrais fornecidos pelos usuários;</li>
                                                <li>3.2.6. Comunicações eletrônicas fraudulentas (phishing) feitas por
                                                    terceiros;
                                                </li>
                                                <li>3.2.7. Publicação de conteúdos que infrinjam direitos de terceiros
                                                    ou tenham natureza ilícita/ofensiva.
                                                </li>
                                            </ul>
                                        </section>
                                        <section className="mb-4"><h6 className="fw-bold">4. OBRIGAÇÕES E
                                            RESPONSABILIDADES DO USUÁRIO</h6> <p className="mb-1">4.1. O usuário
                                            compromete-se, entre outros, a:</p>
                                            <ul>
                                                <li>4.1.1. Utilizar o site de forma ética e conforme sua finalidade;
                                                </li>
                                                <li>4.1.2. Responder pelas atividades sob sua conta (login/senha de uso
                                                    exclusivo);
                                                </li>
                                                <li>4.1.3. Guardar sigilo de suas credenciais;</li>
                                                <li>4.1.4. Usar senha forte e não reutilizá-la em outros serviços;</li>
                                                <li>4.1.5. Evitar senhas de fácil acerto;</li>
                                                <li>4.1.6. Fornecer dados cadastrais corretos e atualizados;</li>
                                                <li>4.1.7. Manter antivírus/firewall atualizados e conexão compatível;
                                                </li>
                                                <li>4.1.8. Respeitar direitos de propriedade intelectual;</li>
                                                <li>4.1.9–4.1.14. Não acessar áreas restritas, não realizar engenharia
                                                    reversa, mineração automatizada, transmitir malware ou explorar a
                                                    segurança do site;
                                                </li>
                                                <li>4.1.15. Providenciar os meios necessários para acesso ao site.</li>
                                            </ul>
                                        </section>
                                        <section className="mb-4"><h6 className="fw-bold">5. PROPRIEDADE
                                            INTELECTUAL</h6> <p> 5.1. Concessão de licença limitada, não transferível,
                                            não exclusiva e revogável para uso das facilidades do site — sem
                                            transferência de titularidade. <br/> 5.2. É proibida a venda, transferência,
                                            modificação, engenharia reversa, distribuição ou cópia de
                                            textos/imagens/partes do site. </p></section>
                                        <section className="mb-4"><h6 className="fw-bold">6. FALHAS TÉCNICAS, ALTERAÇÕES
                                            E RESCISÃO</h6> <p> 6.1. A ADMINISTRADORA pode realizar manutenções
                                            programadas e atualizar termos/funcionalidades. <br/> 6.2. Em caso de
                                            manutenção emergencial, pode haver indisponibilidade sem aviso
                                            prévio. <br/> 6.3. Alterações têm efeito imediato; o uso contínuo implica
                                            concordância. <br/> 6.4–6.8. A ADMINISTRADORA pode alterar/suspender o site,
                                            sem obrigação de suporte, e não responde por perdas/danos decorrentes de
                                            indisponibilidade. Pode restringir acesso em casos de fraude ou prejuízo ao
                                            site. </p></section>
                                        <section className="mb-4"><h6 className="fw-bold">7. PROTEÇÃO DE DADOS</h6>
                                            <p> 7.1. Podem ser coletados dados técnicos do dispositivo (ex.: SO,
                                                conexão). <br/> 7.2. Dados de contas/usuários não são compartilhados sem
                                                consentimento, salvo exigência legal/ordem judicial. <br/> 7.3. Além dos
                                                dados de cadastro/adesão, informações podem ser obtidas automaticamente
                                                durante a navegação. </p></section>
                                        <section className="mb-4"><h6 className="fw-bold">8. ISENÇÃO DE GARANTIAS E
                                            LIMITAÇÕES DE RESPONSABILIDADE</h6> <p> 8.1. O site está em contínuo
                                            desenvolvimento e pode conter erros; é fornecido “no estado em que se
                                            encontra”, sob risco do usuário. <br/> 8.2. Não há outras garantias além das
                                            previstas. A ADMINISTRADORA não garante funcionamento ininterrupto, nem
                                            ausência de perdas/ataques/vírus; não se responsabiliza por danos
                                            relacionados ao uso do site. </p></section>
                                        <section className="mb-2"><h6 className="fw-bold">9. LEI APLICÁVEL E
                                            JURISDIÇÃO</h6> <p> 9.1. Termos interpretados segundo a legislação
                                            brasileira (português), eleito o foro do domicílio do usuário, salvo
                                            competência diversa prevista em lei. </p></section>
                                        </div>
                                </div>

                                <div className="modal-footer border-0 d-flex justify-content-between">
                                    <button type="button" className="btn btn-gc-ghost" onClick={() => setView("consent")}>
                                        Voltar
                                    </button>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-gc-ghost" onClick={reject}>
                                            Recusar
                                        </button>
                                        <button type="button" className="btn btn-gc-primary" onClick={accept}>
                                            Aceitar
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
