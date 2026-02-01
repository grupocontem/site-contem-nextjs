// app/api/blog/list/route.ts

export const runtime = "nodejs";
// @ts-ignore
import { decode } from "he";

type ApiItem = {
    id: string;
    title: string;
    content: string;
    slug: string;
    banner: string;
    created_at: string;
    updated_at: string;
};

type ApiResponse = {
    status: string;
    ok: boolean;
    data: {
        items: ApiItem[];
        meta: {
            total: number;
            per_page: number;
            current_page: number;
            last_page: number;
        };
    }[];
};

function normalizeDate(s?: string | null) {
    if (!s) return null;
    // Formato vindo da API: "DD/MM/YYYY HH:mm:ss"
    // Precisa converter para "YYYY-MM-DDTHH:mm:ss" para ser compatível com Date do JS
    const parts = s.split(" ");
    if (parts.length < 1) return null;
    const dateParts = parts[0].split("/");
    if (dateParts.length !== 3) return null;
    const isoDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    return parts[1] ? `${isoDate}T${parts[1]}` : isoDate;
}

const stripHtml = (html: string) => html.replace(/<\/?[^>]+(>|$)/g, "");
const truncate = (s: string, n = 255) => (s.length > n ? s.slice(0, n) : s);

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get("page") || "1";
        const perPage = searchParams.get("per_page") || "9";

        const apiUrl = new URL("https://api.grupocontem.com.br/api/site/contem/blog/");
        apiUrl.searchParams.set("order_by[column]", "created_at");
        apiUrl.searchParams.set("order_by[direction]", "desc");
        apiUrl.searchParams.set("per_page", perPage);
        apiUrl.searchParams.set("page", page);

        const resp = await fetch(apiUrl.toString(), {
            method: "GET",
            headers: { 
                "Accept": "application/json",
                "User-Agent": "next-app"
            },
            next: { revalidate: 60 } // Revalidar a cada minuto
        });

        if (!resp.ok) {
            const txt = await resp.text().catch(() => "");
            return new Response(txt || "Falha ao buscar posts", { status: resp.status });
        }

        const json: ApiResponse = await resp.json();
        const data = json.data[0];

        const rows = data.items.map((p) => ({
            id: p.id,
            titulo: p.title ?? "",
            conteudo: truncate(stripHtml(decode(p.content || "")), 255) ?? "",
            nome_arquivo: p.banner ?? "", // Usando banner como nome_arquivo para compatibilidade
            nome_pagina: p.slug ?? "",
            data_hora: normalizeDate(p.created_at) ?? p.created_at,
            atualizacao: normalizeDate(p.updated_at),
        }));

        return Response.json({
            items: rows,
            meta: data.meta
        });
    } catch (err: any) {
        return new Response(`Erro ao buscar posts: ${err?.message ?? err}`, { status: 500 });
    }
}
