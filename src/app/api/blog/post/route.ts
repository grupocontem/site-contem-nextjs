// src/app/api/blog/post/route.ts

export const runtime = "nodejs";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");

        if (!slug) {
            return new Response("Slug é obrigatório", { status: 400 });
        }

        // Usar o novo endpoint que busca diretamente pelo slug
        const slugUrl = `https://api.grupocontem.com.br/api/site/contem/blog/post/slug/${slug}`;

        console.log(`[API Blog Post] Chamando API externa: ${slugUrl}`);

        const postRes = await fetch(slugUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "User-Agent": "next-app"
            },
            next: { revalidate: 60 },
        });

        if (!postRes.ok) {
            return new Response("Post não encontrado ou erro na API", { status: postRes.status });
        }

        const postJson = await postRes.json();
        const raw = postJson.data[0];

        if (!raw) {
            return new Response("Dados do post não encontrados", { status: 404 });
        }

        return Response.json({
            id: raw.id,
            slug: raw.slug,
            titulo: raw.title,
            conteudoHtml: raw.content,
            banner: raw.banner || "", // O novo endpoint pode não retornar banner, mas o frontend espera algo
            dataHora: raw.created_at,
            atualizacao: raw.updated_at,
        });
    } catch (err: any) {
        return new Response(`Erro ao buscar post: ${err?.message ?? err}`, { status: 500 });
    }
}
