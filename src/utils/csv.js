// src/utils/csv.js

// Escape a single CSV cell
function esc(v) {
    if (v === null || v === undefined) return "";
    const s = String(v);
    // Quote if it contains comma, quote, newline, or leading/trailing spaces
    if (/[",\r\n]|^\s|\s$/.test(s)) {
        return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
}

function monthKey(d) {
    if (!d) return null;
    const s = typeof d === "string" ? d : new Date(d).toISOString();
    return s.slice(0, 7); // YYYY-MM
}

function triggerDownload(filename, blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

// --- NEW: strict "Sep 15, 2025" formatter (no timezone surprises) ---
const MMM = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
function formatCsvDate(input) {
    if (!input) return "";
    // Prefer ISO splitting to avoid tz shifts
    if (typeof input === "string") {
        const m = input.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (m) {
            const y = Number(m[1]);
            const mon = Number(m[2]);
            const d = Number(m[3]);
            if (y && mon >= 1 && mon <= 12 && d)
                return `${MMM[mon - 1]} ${d}, ${y}`;
        }
    }
    // Fallback to Date parsing (UTC parts)
    const dt = new Date(input);
    if (Number.isNaN(dt.getTime())) return "";
    const y = dt.getUTCFullYear();
    const mon = dt.getUTCMonth() + 1;
    const d = dt.getUTCDate();
    return `${MMM[mon - 1]} ${d}, ${y}`;
}

/**
 * Export transactions to CSV and trigger a download.
 *
 * Columns: id,date,type,amount,account,envelope,note
 * - date: "Sep 15, 2025"
 * - amount: signed number (expenses negative)
 * - account/envelope: human names (not IDs)
 *
 * @param {object} state  - app state from getState()
 * @param {object} opts   - { month?: 'YYYY-MM' | null, filename?: string }
 * @returns {{count:number, filename:string}}
 */
export function exportTransactionsCSV(state, opts = {}) {
    const { month = null, filename = null } = opts;

    const { transactions = [], accounts = [], envelopes = [] } = state;
    const accName = Object.fromEntries(accounts.map((a) => [a.id, a.name]));
    const envName = Object.fromEntries(envelopes.map((e) => [e.id, e.name]));

    const rows = [
        ["id", "date", "type", "amount", "account", "envelope", "note"], // header
    ];

    for (const t of transactions) {
        if (month && monthKey(t.date) !== month) continue;

        rows.push([
            t.id ?? "",
            formatCsvDate(t.date), // <-- formatted date
            t.type ?? (Number(t.amount) >= 0 ? "income" : "expense"),
            String(t.amount ?? ""),
            accName[t.accountId] ?? "",
            envName[t.envelopeId] ?? "",
            t.note ?? "",
        ]);
    }

    const csv = rows.map((r) => r.map(esc).join(",")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    const name = filename || `transactions-${month || "all"}.csv`;
    triggerDownload(name, blob);
    return { count: rows.length - 1, filename: name };
}
