// src/data/db.js
import Dexie from "dexie";

// --- DB instance ---
export const db = new Dexie("pfd"); // personal-finance-dashboard

// --- Schema v1 ---
db.version(1).stores({
    // pk = id (string). Common secondary indexes for fast queries.
    accounts: "id, name, type, archived, createdAt",
    envelopes: "id, name, color, carryover, createdAt",
    transactions:
        "id, date, type, amount, accountId, envelopeId, importBatchId, createdAt",
    settings: "id", // single row: id='app'
});

// --- Helpers ---
const now = () => new Date().toISOString();
const uid = () =>
    crypto && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

/**
 * Initialize defaults on first run.
 * Safe to call multiple times—does nothing if already initialized.
 */
export async function initDb() {
    // settings row ensures one-time init
    const existing = await db.settings.get("app");
    if (!existing) {
        await db.transaction(
            "rw",
            db.settings,
            db.accounts,
            db.envelopes,
            async () => {
                await db.settings.put({
                    id: "app",
                    currency: "INR",
                    locale: "en-IN",
                    createdAt: now(),
                    updatedAt: now(),
                });

                // Optional: a starter "Cash" account & a couple envelopes
                await db.accounts.add({
                    id: uid(),
                    name: "Cash",
                    type: "cash", // cash | bank | credit
                    openingBalance: 0,
                    archived: false,
                    createdAt: now(),
                    updatedAt: now(),
                });

                await db.envelopes.bulkAdd([
                    {
                        id: uid(),
                        name: "Groceries",
                        color: "#7c9cff",
                        carryover: true,
                        createdAt: now(),
                        updatedAt: now(),
                    },
                    {
                        id: uid(),
                        name: "Rent",
                        color: "#ffb86b",
                        carryover: false,
                        createdAt: now(),
                        updatedAt: now(),
                    },
                ]);
            }
        );
    }

    // Expose for debugging in dev
    if (import.meta.env?.DEV) {
        // eslint-disable-next-line no-console
        console.log("[pfd] Dexie ready");
        // @ts-ignore
        window.db = db;
    }
}
