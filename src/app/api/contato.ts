"use server";

type ContatoInput = {
    nome: string;
    email: string;
    telefone?: string;
    assunto?: string;
    mensagem: string;
};

type OuvidoriaInput = {
    protocolo?: string;
    nome: string;
    cpf?: string;
    email: string;
    plano?: string;
    operadora?: string;
    telefone?: string;
    celular?: string;
    carteira?: string;
    mensagem: string;
};

const SENDGRID_HOST = process.env.SENDGRID_HOST || "https://api.sendgrid.com";
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;
const FROM_EMAIL = process.env.FROM_EMAIL!;
const TO_CONTATO = process.env.TO_CONTATO!;
const TO_OUVIDORIA = process.env.TO_OUVIDORIA!;

// util interno para chamar a Web API do SendGrid
async function sendgridSend(opts: {
    to: string;
    subject: string;
    text: string;
    replyTo?: { email: string; name?: string };
}) {
    const payload = {
        personalizations: [{ to: [{ email: opts.to }] }],
        from: { email: FROM_EMAIL, name: "Site Grupo Contém" },
        subject: opts.subject,
        content: [{ type: "text/plain", value: opts.text }],
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    };

    const r = await fetch(`${SENDGRID_HOST}/v3/mail/send`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${SENDGRID_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (r.status !== 202) {
        const errText = await r.text();
        throw new Error(errText || "SendGrid error");
    }
}

export async function sendContato(formData: FormData) {
    const nome = String(formData.get("nome") || "");
    const email = String(formData.get("email") || "");
    const telefone = String(formData.get("telefone") || "");
    const assunto = String(formData.get("assunto") || "Sem assunto");
    const mensagem = String(formData.get("mensagem") || "");

    if (!email || !mensagem) {
        return { ok: false, error: "Campos obrigatórios ausentes." };
    }

    const text =
        `Nome: ${nome}
        Email: ${email}
        Telefone: ${telefone}
        Mensagem:
        ${mensagem}`;

    try {
        await sendgridSend({
            to: TO_CONTATO,
            subject: `[Site] Contato: ${assunto}`,
            text,
            replyTo: email ? { email, name: nome || "Contato do Site" } : undefined,
        });
        return { ok: true };
    } catch (e: any) {
        return { ok: false, error: e?.message || "Falha ao enviar" };
    }
}

export async function sendOuvidoria(formData: FormData) {
    const protocolo = String(formData.get("protocolo") || "N/D");
    const nome = String(formData.get("nome") || "");
    const cpf = String(formData.get("cpf") || "");
    const email = String(formData.get("email") || "");
    const plano = String(formData.get("plano") || "");
    const operadora = String(formData.get("operadora") || "");
    const telefone = String(formData.get("telefone") || "");
    const celular = String(formData.get("celular") || "");
    const carteira = String(formData.get("carteira") || "");
    const mensagem = String(formData.get("mensagem") || "");

    if (!email || !mensagem || !nome) {
        return { ok: false, error: "Campos obrigatórios ausentes." };
    }

    const text =
        `Protocolo: ${protocolo}
        Nome: ${nome}
        CPF: ${cpf}
        Email: ${email}
        Plano: ${plano}
        Operadora: ${operadora}
        Telefone: ${telefone}
        Celular: ${celular}
        Carteira: ${carteira}

Mensagem:
${mensagem}`;

    try {
        await sendgridSend({
            to: TO_OUVIDORIA,
            subject: `[Site] Ouvidoria: Protocolo ${protocolo}`,
            text,
            replyTo: email ? { email, name: nome || "Ouvidoria do Site" } : undefined,
        });
        return { ok: true };
    } catch (e: any) {
        return { ok: false, error: e?.message || "Falha ao enviar" };
    }
}
