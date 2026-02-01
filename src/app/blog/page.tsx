"use client";

import "../../css/blog.css";
import React, { useEffect, useMemo, useState } from "react";

type RawPost = {
    id: string;
    conteudo: string;
    data_hora: string;
    titulo: string;
    nome_arquivo: string;
    nome_pagina: string;
    atualizacao?: string | null;
};

type Meta = {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
};

type Post = RawPost & {
    conteudoPlain: string;
    href: string;
    imgUrl: string;
    dataFormatada: string;
    atualizacaoRotulo: string;
};

const stripHtml = (html: string) => html.replace(/<\/?[^>]+(>|$)/g, "");
const truncate = (s: string, n = 255) => (s.length > n ? s.slice(0, n) : s);
const imgPublicUrl = (fileName: string) => fileName.startsWith("http") ? fileName : `${process.env.NEXT_PUBLIC_BLOG_URL}/src/img/posts/${fileName}`;

const toDate = (s?: string | null) => {
    if (!s) return null;
    const normalized = s.includes(" ") ? s.replace(" ", "T") : s;
    const d = new Date(normalized);
    return Number.isNaN(d.getTime()) ? null : d;
};

export default function Blog() {
    const [loading, setLoading] = useState(true);
    const [raw, setRaw] = useState<RawPost[]>([]);
    const [meta, setMeta] = useState<Meta | null>(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        let alive = true;
        setLoading(true);
        (async () => {
            try {
                const r = await fetch(`/api/blog/list?page=${page}&per_page=9`, { cache: "no-store" });
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                const data: { items: RawPost[], meta: Meta } = await r.json();

                if (alive) {
                    setRaw(data.items);
                    setMeta(data.meta);
                }
            } catch (e) {
                console.error("Erro ao buscar posts:", e);
                if (alive) setRaw([]);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, [page]);

    const posts: Post[] = useMemo(() => {
        return raw.map((p) => {
            const data = toDate(p.data_hora) ?? new Date();
            const atual = toDate(p.atualizacao || undefined);
            const isAtualizado = !!(atual && atual > data);

            const atualizacaoRotulo = isAtualizado
                ? `*Atualizado em: ${atual!.toLocaleDateString("pt-BR")}`
                : "";

            // seu href atual: /post/<slug> (se algum vier .php, o replace não atrapalha)
            const href = `blog/${p.nome_pagina.replace(".php", "")}`;
            const imgUrl = imgPublicUrl(p.nome_arquivo || "");

            const conteudoPlain = truncate(stripHtml(p.conteudo || ""), 255);

            return {
                ...p,
                conteudoPlain,
                href,
                imgUrl,
                dataFormatada: data.toLocaleDateString("pt-BR"),
                atualizacaoRotulo,
            };
        });
    }, [raw]);

    return (
        <>
            <section className="faixa-titulo">
                <div className="conteudo">
                    <div className="texto">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h1>Blog Contém</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="posts">
                <div className="container">
                    <div
                        className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center justify-content-md-start"
                        id="posts"
                    >
                        {loading
                            ? Array.from({ length: 6 }).map((_, i) => (
                                <div className="col" key={`ph-${i}`}>
                                    <div
                                        className="card h-100 mx-auto mx-md-0"
                                        style={{ maxWidth: "22rem", fontFamily: "gotham, sans-serif" }}
                                    >
                                        <div
                                            className="card-img-top placeholder"
                                            style={{ height: "13rem", objectFit: "cover" }}
                                        />
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                <span className="placeholder col-8" />
                                            </h4>
                                            <p className="card-text">
                                                <span className="placeholder col-12" />
                                                <span className="placeholder col-10" />
                                                <span className="placeholder col-9" />
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <p className="mb-0">
                                                <span className="placeholder col-6" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : posts.map((p) => (
                                <div className="col" key={p.id}>
                                    <div
                                        className="card h-100 mx-auto mx-md-0"
                                        style={{ maxWidth: "22rem", fontFamily: "gotham, sans-serif" }}
                                    >
                                        <img
                                            src={p.imgUrl}
                                            className="card-img-top"
                                            style={{ height: "13rem", objectFit: "cover" }}
                                            alt={p.titulo}
                                            loading="lazy"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).style.display = "none";
                                            }}
                                        />
                                        <div className="card-body">
                                            <h4 className="card-title" style={{ color: "#f2552e" }}>
                                                {p.titulo}
                                            </h4>
                                            <p className="card-text fs-6" style={{ textAlign: "left" }}>
                                                {p.conteudoPlain}
                                            </p>
                                            <a href={p.href} className="stretched-link" aria-label={p.titulo} />
                                        </div>
                                        <div className="card-footer">
                                            <p className="mb-0">
                                                {p.dataFormatada}
                                                {"\u00A0".repeat(16)}
                                                <span className="fst-italic">{p.atualizacaoRotulo}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                )
                            )
                        }
                    </div>

                    {meta && meta.last_page > 1 && (
                        <div className="row mt-5">
                            <div className="col-12 d-flex justify-content-center">
                                <nav aria-label="Navegação de posts">
                                    <ul className="pagination">
                                        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                                disabled={page === 1}
                                            >
                                                Anterior
                                            </button>
                                        </li>
                                        {Array.from({ length: meta.last_page }).map((_, i) => {
                                            const p = i + 1;
                                            // Lógica simples para não mostrar muitas páginas se houver dezenas
                                            if (meta.last_page > 7) {
                                                if (p !== 1 && p !== meta.last_page && (p < page - 1 || p > page + 1)) {
                                                    if (p === 2 || p === meta.last_page - 1) return <li key={p} className="page-item disabled"><span className="page-link">...</span></li>;
                                                    return null;
                                                }
                                            }
                                            return (
                                                <li key={p} className={`page-item ${page === p ? 'active' : ''}`}>
                                                    <button className="page-link" onClick={() => setPage(p)}>
                                                        {p}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                        <li className={`page-item ${page === meta.last_page ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => setPage(p => Math.min(meta.last_page, p + 1))}
                                                disabled={page === meta.last_page}
                                            >
                                                Próximo
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
