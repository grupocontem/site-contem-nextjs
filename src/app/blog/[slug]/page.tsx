import type { Metadata, ResolvingMetadata } from "next";
import React from "react";
import Script from "next/script";
import {notFound} from "next/navigation";

export const dynamic = "force-dynamic";

export type Post = {
    id: string;
    slug: string;
    titulo: string;
    conteudoHtml: string;
    banner: string;
    dataHora: string;
    atualizacao?: string | null;
};

const BLOG_ENDPOINT = "https://api.grupocontem.com.br/api/site/contem/blog/";

function buildPostImageUrl(banner: string) {
    return banner;
}

function fmtBRDateTime(d: string) {
    try {
        if (d.includes("/")) {
            return d;
        }
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
        // Primeiro, buscamos na listagem para encontrar o ID pelo slug
        const listUrl = new URL(BLOG_ENDPOINT);
        listUrl.searchParams.set("per_page", "100"); // Aumentar chance de encontrar se não for o mais recente

        const listRes = await fetch(listUrl.toString(), {
            method: "GET",
            headers: {
                Accept: "application/json",
                "User-Agent": "next-app"
            },
            next: { revalidate: 60 },
        });

        if (!listRes.ok) return null;
        const listJson = await listRes.json();
        const items = listJson.data[0]?.items || [];
        
        const found = items.find((i: any) => i.slug === slug);
        if (!found) return null;

        const postRes = await fetch(`${BLOG_ENDPOINT}${found.id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "User-Agent": "next-app"
            },
            next: { revalidate: 60 },
        });

        if (!postRes.ok) return null;
        const postJson = await postRes.json();
        const raw = postJson.data[0];

        if (!raw) return null;

        return {
            id: raw.id,
            slug: raw.slug,
            titulo: raw.title,
            conteudoHtml: raw.content,
            banner: raw.banner || found.banner, // Fallback para o banner da lista se não vier no detalhe
            dataHora: raw.created_at,
            atualizacao: raw.updated_at,
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
    const url = `${BLOG_ENDPOINT}/blog/${slug}`;
    const img = post ? buildPostImageUrl(post.banner) : `${BLOG_ENDPOINT}/src/img/favicon.ico`;
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await fetchPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const canonicalUrl = `${BLOG_ENDPOINT}/blog/${post.slug}`;
    const dataPost = fmtBRDateTime(post.dataHora);
    const atualizacao = post.atualizacao ? fmtBRDateTime(post.atualizacao) : null;
    const heroUrl = buildPostImageUrl(post.banner);

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
