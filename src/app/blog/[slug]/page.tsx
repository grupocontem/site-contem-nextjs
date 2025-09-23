import type { Metadata, ResolvingMetadata } from "next";
import React from "react";
import Script from "next/script";
import {notFound} from "next/navigation";

export const dynamic = "force-dynamic";

export type Post = {
    id: number;
    slug: string;
    titulo: string;
    conteudoHtml: string;
    nomeArquivo: string;
    dataHora: string;
    atualizacao?: string | null;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.grupocontem.com.br";
const POSTS_IMG_BASE =
    process.env.NEXT_PUBLIC_POSTS_IMG_BASE || `${SITE_URL}/src/img/posts`;
const BLOG_ENDPOINT =
    process.env.NEXT_PUBLIC_BLOG_ENDPOINT || "https://blog.grupocontem.com.br/posts.php";

function buildPostImageUrl(file: string) {
    return `${POSTS_IMG_BASE}/${file}`;
}

function fmtBRDateTime(d: string) {
    try {
        const isoish = d.includes("T") ? d : d.replace(" ", "T");
        return new Date(isoish).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return d;
    }
}

async function fetchPostBySlug(slug: string): Promise<Post | null> {
    try {
        const body = new URLSearchParams({ funcao: "post", slug });
        const res = await fetch(BLOG_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
            },
            body,
            next: { revalidate: 0 },
        });
        if (!res.ok) return null;
        const raw = await res.json();

        const atual =
            raw.atualizacao && raw.atualizacao !== "0000-00-00 00:00:00"
                ? String(raw.atualizacao)
                : null;

        return {
            id: Number(raw.id),
            slug: String(raw.nome_pagina),
            titulo: String(raw.titulo),
            conteudoHtml: String(raw.conteudo),
            nomeArquivo: String(raw.nome_arquivo),
            dataHora: String(raw.data_hora),
            atualizacao: atual,
        };
    } catch {
        return null;
    }
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    _parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const post = await fetchPostBySlug(slug);

    const title = post?.titulo || "Post | Grupo Contém";
    const url = `${SITE_URL}/blog/${slug}`;
    const img = post ? buildPostImageUrl(post.nomeArquivo) : `${SITE_URL}/src/img/favicon.ico`;
    const description = post ? post.titulo : "Conteúdo do blog Grupo Contém";

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            locale: "pt_BR",
            url,
            title,
            description,
            images: [{ url: img }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [img],
        },
    };
}

export default async function BlogPostPage({ params }: any) {
    const { slug } = params as { slug: string };
    const post = await fetchPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
    const dataPost = fmtBRDateTime(post.dataHora);
    const atualizacao = post.atualizacao ? fmtBRDateTime(post.atualizacao) : null;
    const heroUrl = buildPostImageUrl(post.nomeArquivo);

    return (
        <>
            <Script
                src="https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v15.0"
                strategy="afterInteractive"
                crossOrigin="anonymous"
            />

            <Script
                src="https://platform-api.sharethis.com/js/sharethis.js#property=633f41544880e9001921bcda&product=inline-share-buttons"
                strategy="afterInteractive"
            />

            <div className="container p-4 p-md-5" style={{ fontFamily: "gotham, sans-serif", fontSize: 20 }}>
                {/* Hero */}
                <div className="text-center">
                    <img
                        src={heroUrl}
                        alt={post.titulo}
                        className="img-fluid rounded"
                        style={{ height: "30rem", width: "100%", objectFit: "cover" }}
                    />
                </div>

                <h1 className="pt-5 fw-bold text-center" style={{ fontSize: 50 }}>
                    {post.titulo}
                </h1>
                <h5 className="p-4 fw-bold text-center">{dataPost}</h5>
                {atualizacao && <h6 className="fst-italic text-center">*Atualizado em: {atualizacao}</h6>}

                <article className="mt-4" dangerouslySetInnerHTML={{ __html: post.conteudoHtml }} />

                <div className="container text-center mt-5">
                    <div className="row align-items-center">
                        <h3 className="col-12 col-md-9 p-3 m-0 text-md-end mb-3 mb-md-0">Compartilhar </h3>
                        <div className="col-12 col-md-3 p-0 d-flex justify-content-center justify-content-md-start">
                            <div className="sharethis-inline-share-buttons" />
                        </div>
                    </div>
                </div>

                <div id="fb-root" />
                <div className="container text-center mt-4">
                    <hr />
                    <div className="fb-comments" data-href={canonicalUrl} data-width="100%" data-numposts="5" />
                </div>
            </div>
        </>
    );
}
