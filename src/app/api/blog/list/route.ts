// app/api/blog/list/route.ts

export const runtime = "nodejs";
// @ts-ignore
import { decode } from "he";

type ApiRow = {
    id: string;
    titulo: string;
    conteudo: string;
    nome_arquivo: string;
    nome_pagina: string;
    id_usuario: string;
    data_hora: string;     // "YYYY-MM-DD HH:mm:ss"
    atualizacao: string;   // pode ser "0000-00-00 00:00:00"
    status: string;        // "1"
};

function normalizeDate(s?: string | null) {
    if (!s || s.startsWith("0000-00-00")) return null;
    return s.includes(" ") ? s.replace(" ", "T") : s;
}

const stripHtml = (html: string) => html.replace(/<\/?[^>]+(>|$)/g, "");
const truncate = (s: string, n = 255) => (s.length > n ? s.slice(0, n) : s);

export async function GET() {
    try {
        const url = "https://blog.grupocontem.com.br/posts.php";
        const body = new URLSearchParams({ funcao: "listar_posts" });

        const resp = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body,
        });

        if (!resp.ok) {
            const txt = await resp.text().catch(() => "");
            return new Response(txt || "Falha ao buscar posts", { status: resp.status });
        }

        const data: ApiRow[] = await resp.json();

        const rows = data.map((p) => ({
            id: Number(p.id),
            titulo: p.titulo ?? "",
            conteudo: truncate(stripHtml(decode(p.conteudo.replace(/<\/?[^>]+(>|$)/g, "").substring(0,255) || "")), 255) ?? "",
            nome_arquivo: p.nome_arquivo ?? "",
            nome_pagina: p.nome_pagina ?? "",
            data_hora: normalizeDate(p.data_hora) ?? (p.data_hora || ""),
            atualizacao: normalizeDate(p.atualizacao),
        }));

        // garante no máximo 30 itens
        return Response.json(rows.slice(0, 30));
    } catch (err: any) {
        return new Response(`Erro ao proxyficiar posts: ${err?.message ?? err}`, { status: 500 });
    }
}
