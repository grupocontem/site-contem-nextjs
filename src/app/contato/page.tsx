import type { Metadata } from "next";
import Contato from "@/app/contato/Contato";

export const metadata: Metadata = {
    title: "Contato | Grupo Contém",
    description:
        "Entre em contato com o Grupo Contém. Fale conosco ou com a ouvidoria, veja nossos endereços e envie sua mensagem.",
};

const FORMCARRY_CONTATO = process.env.NEXT_PUBLIC_FORMCARRY_CONTATO!;
const FORMCARRY_OUVIDORIA = process.env.NEXT_PUBLIC_FORMCARRY_OUVIDORIA!;

export default function Page() {
    return (
        <Contato
            formcarryContato={FORMCARRY_CONTATO}
            formcarryOuvidoria={FORMCARRY_OUVIDORIA}
        />
    );
}
