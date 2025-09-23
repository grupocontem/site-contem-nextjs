"use client";

import "../../css/blog.css";
import React, { useEffect, useMemo, useState } from "react";

type RawPost = {
    id: number;
    conteudo: string;
    data_hora: string;
    titulo: string;
    nome_arquivo: string;
    nome_pagina: string;
    atualizacao?: string | null;
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
const imgPublicUrl = (fileName: string) => `${process.env.NEXT_PUBLIC_BLOG_URL}/src/img/posts/${fileName}`;

const toDate = (s?: string | null) => {
    if (!s) return null;
    const normalized = s.includes(" ") ? s.replace(" ", "T") : s;
    const d = new Date(normalized);
    return Number.isNaN(d.getTime()) ? null : d;
};

export default function Blog() {
    const [loading, setLoading] = useState(true);
    const [raw, setRaw] = useState<RawPost[]>([]);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const r = await fetch("/api/blog/list", { cache: "no-store" });
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                const rows: RawPost[] = await r.json();

                const latest30 = rows.slice(0, 30);
                if (alive) setRaw(latest30);
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
    }, []);

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
                </div>
            </section>
        </>
    );
}
