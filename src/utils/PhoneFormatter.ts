import { onlyDigits } from "./stringUtils";

export class PhoneFormatter {
    static formatBR(v: string): string {
        const d = onlyDigits(v).slice(0, 11);
        const ddd = d.slice(0, 2);
        const p1 = d.length > 10 ? d.slice(2, 7) : d.slice(2, 6);
        const p2 = d.length > 10 ? d.slice(7, 11) : d.slice(6, 10);

        let out = ddd ? `(${ddd}` : "";
        if (ddd && (p1 || p2)) out += ") ";
        if (p1) out += p1;
        if (p2) out += `-${p2}`;
        return out;
    }
}
