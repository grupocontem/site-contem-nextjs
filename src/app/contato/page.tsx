"use client";

import "../../css/contato.css";
import React, { useState } from "react";
import {CpfFormatter} from "@/utils/CpfFormatter";
import {PhoneFormatter} from "@/utils/PhoneFormatter";

const FORMCARRY_CONTATO = process.env.NEXT_PUBLIC_FORMCARRY_CONTATO!;
const FORMCARRY_OUVIDORIA = process.env.NEXT_PUBLIC_FORMCARRY_OUVIDORIA!;

type Msg = { type: "success" | "danger"; text: string } | null;
type FCResponse = { code: number; message?: string };

async function postJSON(url: string, payload: unknown): Promise<FCResponse> {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(payload),
    });

    try {
        return (await res.json()) as FCResponse;
    } catch {
        return { code: res.ok ? 200 : res.status, message: res.statusText };
    }
}

export default function Contato() {
    const [tab, setTab] = useState<"contato" | "ouvidoria">("contato");

    const [contato, setContato] = useState({
        nome: "",
        email: "",
        telefone: "",
        assunto: "",
        mensagem: "",
    });
    const [contatoMsg, setContatoMsg] = useState<Msg>(null);
    const [loadingContato, setLoadingContato] = useState(false);

    const handleContatoChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        let newVal = value;
        if (name === "telefone") newVal = PhoneFormatter.formatBR(value);
        setContato((prev) => ({ ...prev, [name]: newVal }));
    };

    const handleSubmitContato = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setContatoMsg(null);
        setLoadingContato(true);

        const res = await postJSON(FORMCARRY_CONTATO, {
            nome: contato.nome,
            email: contato.email,
            telefone: contato.telefone,
            assunto: contato.assunto,
            mensagem: contato.mensagem,
            tipo: "Contato",
        }).catch(() => ({ code: 500, message: "Falha na conexão" }));

        if (res.code === 200) {
            setContatoMsg({ type: "success", text: "Mensagem enviada com sucesso!" });
            setContato({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
        } else {
            setContatoMsg({
                type: "danger",
                text: res.message || "Não foi possível enviar. Tente novamente.",
            });
        }
        setLoadingContato(false);
    };

    const [ouvidoria, setOuvidoria] = useState({
        protocolo: "",
        nome: "",
        cpf: "",
        email: "",
        plano: "",
        operadora: "",
        telefone: "",
        celular: "",
        carteira: "",
        mensagem: "",
    });
    const [ouvidoriaMsg, setOuvidoriaMsg] = useState<Msg>(null);
    const [loadingOuvidoria, setLoadingOuvidoria] = useState(false);

    const handleOuvidoriaChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        let newVal = value;
        if (name === "cpf") newVal = CpfFormatter.format(value);
        if (name === "telefone" || name === "celular") newVal = PhoneFormatter.formatBR(value);
        setOuvidoria((prev) => ({ ...prev, [name]: newVal }));
    };

    const handleSubmitOuvidoria = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOuvidoriaMsg(null);
        setLoadingOuvidoria(true);

        const res = await postJSON(FORMCARRY_OUVIDORIA, {
            protocolo: ouvidoria.protocolo,
            nome: ouvidoria.nome,
            cpf: ouvidoria.cpf,
            email: ouvidoria.email,
            plano: ouvidoria.plano,
            operadora: ouvidoria.operadora,
            telefone: ouvidoria.telefone,
            celular: ouvidoria.celular,
            carteira: ouvidoria.carteira,
            mensagem: ouvidoria.mensagem,
            tipo: "Ouvidoria",
        }).catch(() => ({ code: 500, message: "Falha na conexão" }));

        if (res.code === 200) {
            setOuvidoriaMsg({ type: "success", text: "Ouvidoria enviada com sucesso!" });
            setOuvidoria({
                protocolo: "",
                nome: "",
                cpf: "",
                email: "",
                plano: "",
                operadora: "",
                telefone: "",
                celular: "",
                carteira: "",
                mensagem: "",
            });
        } else {
            setOuvidoriaMsg({
                type: "danger",
                text: res.message || "Não foi possível enviar. Tente novamente.",
            });
        }
        setLoadingOuvidoria(false);
    };

    return (
        <>
            <section className="faixa-titulo">
                <div className="conteudo">
                    <div className="texto">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12">
                                    <h1>Contato</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contato">
                <div className="container">
                    <div className="row">
                        <div className="container">
                            <div className="row">
                                <ul className="nav nav-pills mb-3" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${tab === "contato" ? "active" : ""}`}
                                            type="button"
                                            role="tab"
                                            aria-selected={tab === "contato"}
                                            onClick={() => setTab("contato")}
                                        >
                                            Contato
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${tab === "ouvidoria" ? "active" : ""}`}
                                            type="button"
                                            role="tab"
                                            aria-selected={tab === "ouvidoria"}
                                            onClick={() => setTab("ouvidoria")}
                                        >
                                            Ouvidoria
                                        </button>
                                    </li>
                                </ul>

                                <div className="tab-content" id="pills-tabContent">
                                    {tab === "contato" && (
                                        <div className="tab-pane fade show active" role="tabpanel">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                    <div className="row">
                                                        <h3>SOLUÇÕES EM SAÚDE</h3>
                                                        <p>Sob medida para cada tipo de organização.</p>
                                                    </div>
                                                    <div className="row">
                                                        <div className="cell-xl-5 height-fill" style={{ paddingTop: 30 }}>
                                                            <iframe
                                                                title="Endereço Grupo Contém"
                                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.2355039548174!2d-43.17736818503445!3d-22.904682885012896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f5f788b0ef3%3A0x1d11e8cbac2836e4!2sR.%20do%20Carmo%2C%208%20-%20Centro%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2020011-020!5e0!3m2!1spt-BR!2sbr!4v1638361705218!5m2!1spt-BR!2sbr"
                                                                width="450"
                                                                height="250"
                                                                style={{ border: 0 }}
                                                                loading="lazy"
                                                                allowFullScreen
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                    <form onSubmit={handleSubmitContato}>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="nome"
                                                                        placeholder="Nome Completo"
                                                                        value={contato.nome}
                                                                        onChange={handleContatoChange}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="email"
                                                                        className="form-control"
                                                                        name="email"
                                                                        placeholder="Endereço de email"
                                                                        value={contato.email}
                                                                        onChange={handleContatoChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="telefone"
                                                                        placeholder="Telefone"
                                                                        inputMode="numeric"
                                                                        value={contato.telefone}
                                                                        onChange={handleContatoChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="assunto"
                                                                        placeholder="Assunto"
                                                                        value={contato.assunto}
                                                                        onChange={handleContatoChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <textarea
                                                                        className="form-control"
                                                                        name="mensagem"
                                                                        placeholder="Mensagem"
                                                                        rows={5}
                                                                        value={contato.mensagem}
                                                                        onChange={handleContatoChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex gap-2 align-items-center">
                                                            <button className="btn btn-primary" type="submit" disabled={loadingContato}>
                                                                {loadingContato ? "Enviando..." : "Enviar Contato"}
                                                            </button>
                                                            {contatoMsg && (
                                                                <div className={`alert alert-${contatoMsg.type} py-2 px-3 mb-0`} role="alert">
                                                                    {contatoMsg.text}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {tab === "ouvidoria" && (
                                        <div className="tab-pane fade show active" role="tabpanel">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                    <h3>OUVIDORIA</h3>
                                                    <p>
                                                        Prezado Cliente, entre em contato com a ouvidoria e informe o número do protocolo fornecido. Você receberá
                                                        uma resposta em até (sete) dias úteis.
                                                    </p>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                    <form onSubmit={handleSubmitOuvidoria}>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="protocolo"
                                                                        placeholder="Protocolo do primeiro atendimento"
                                                                        value={ouvidoria.protocolo}
                                                                        onChange={handleOuvidoriaChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="nome"
                                                                        placeholder="Nome"
                                                                        value={ouvidoria.nome}
                                                                        onChange={handleOuvidoriaChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="cpf"
                                                                        placeholder="CPF"
                                                                        inputMode="numeric"
                                                                        value={ouvidoria.cpf}
                                                                        onChange={handleOuvidoriaChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="email"
                                                                        className="form-control"
                                                                        name="email"
                                                                        placeholder="Email"
                                                                        value={ouvidoria.email}
                                                                        onChange={handleOuvidoriaChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="plano"
                                                                        placeholder="Plano"
                                                                        value={ouvidoria.plano}
                                                                        onChange={handleOuvidoriaChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="operadora"
                                                                        placeholder="Operadora"
                                                                        value={ouvidoria.operadora}
                                                                        onChange={handleOuvidoriaChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="telefone"
                                                                        placeholder="Telefone"
                                                                        inputMode="numeric"
                                                                        value={ouvidoria.telefone}
                                                                        onChange={handleOuvidoriaChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="celular"
                                                                        placeholder="Celular"
                                                                        inputMode="numeric"
                                                                        value={ouvidoria.celular}
                                                                        onChange={handleOuvidoriaChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="carteira"
                                                                        placeholder="Carteira de identificação do beneficiário"
                                                                        value={ouvidoria.carteira}
                                                                        onChange={handleOuvidoriaChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <textarea
                                                                        className="form-control"
                                                                        name="mensagem"
                                                                        placeholder="Mensagem"
                                                                        rows={5}
                                                                        value={ouvidoria.mensagem}
                                                                        onChange={handleOuvidoriaChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex gap-2 align-items-center">
                                                            <button className="btn btn-primary" type="submit" disabled={loadingOuvidoria}>
                                                                {loadingOuvidoria ? "Enviando..." : "Enviar Ouvidoria"}
                                                            </button>
                                                            {ouvidoriaMsg && (
                                                                <div className={`alert alert-${ouvidoriaMsg.type} py-2 px-3 mb-0`} role="alert">
                                                                    {ouvidoriaMsg.text}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div
                                className="row justify-content-center text-center py-2 pt-5"
                                style={{ minHeight: "5vh" }}
                            >
                                <div className="col-md-4 p-4">
                                    <h6>Filial Porto Alegre (RS)</h6>
                                    <p className="bi bi-geo-alt-fill">
                                        Rua Vigário José Inácio, 368 - sala 603, Centro, Porto Alegre – RS, CEP: 90020-110.
                                    </p>
                                    <p className="bi bi-envelope-fill">filialpoa@grupocontem.com.br</p>
                                </div>
                                <div className="col-md-4 p-4">
                                    <h6>Filial Brasília (DF)</h6>
                                    <p className="bi bi-geo-alt-fill">
                                        SCS Quadra 6, Bloco A - Lote 141 - Sala 509 - Edifício Presidente, Asa Sul, Brasília/DF, CEP: 70327-900
                                    </p>
                                    <p className="bi bi-envelope-fill">filialdf@grupocontem.com.br</p>
                                </div>
                            </div>

                            {/* Sprites SVG opcionais */}
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </symbol>
                                <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                </symbol>
                                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </symbol>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
