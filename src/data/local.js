// src/data/local.js
// Ultra-simple localStorage “DB” with a few helpers.
// No external deps. Everything is synchronous & tiny.

const KEY = "pfd.v1";

// utils
const now = () => new Date().toISOString();
const today = () => new Date().toISOString().slice(0, 10);
const uid = () =>
    typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

const monthKey = (d) =>
    (typeof d === "string" ? d : new Date(d).toISOString()).slice(0, 7);
const inMonth = (iso, yyyyMm) => monthKey(iso) === yyyyMm;

// ---- default state (very small seed) ----
function defaultState() {
    return {
        settings: {
            currency: "INR",
            locale: "en-IN",
            createdAt: now(),
            updatedAt: now(),
        },
        accounts: [
            {
                id: uid(),
                name: "Cash",
                type: "cash", // cash | bank | credit
                openingBalance: 0,
                archived: false,
                createdAt: now(),
                updatedAt: now(),
            },
        ],
        envelopes: [
            {
                id: uid(),
                name: "Groceries",
                color: "#7c9cff",
                carryover: true,
                budget: 10000,
                createdAt: now(),
                updatedAt: now(),
            },
            {
                id: uid(),
                name: "Rent",
                color: "#ffb86b",
                carryover: false,
                budget: 15000,
                createdAt: now(),
                updatedAt: now(),
            },
        ],
        transactions: [
            // example (comment/keep as you like)
            // { id: uid(), date: today(), amount: -500, type: "expense", accountId: null, envelopeId: null, note: "Sample", createdAt: now(), updatedAt: now() }
        ],
    };
}

// ---- core read/write ----
function read() {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) {
            const seed = defaultState();
            localStorage.setItem(KEY, JSON.stringify(seed));
            return seed;
        }
        return JSON.parse(raw);
    } catch {
        const seed = defaultState();
        localStorage.setItem(KEY, JSON.stringify(seed));
        return seed;
    }
}

function write(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
}

// ---- simple API you can call from pages ----
export function getState() {
    return read();
}

export function saveState(nextState) {
    write(nextState);
    return nextState;
}

export function resetState() {
    const seed = defaultState();
    write(seed);
    return seed;
}

export function addTransaction(tx) {
    const s = read();
    const record = {
        id: uid(),
        date: tx?.date || today(),
        amount: Number(tx?.amount) || 0, // +income, -expense
        type: tx?.type || (Number(tx?.amount) >= 0 ? "income" : "expense"),
        accountId: tx?.accountId || s.accounts[0]?.id || null,
        envelopeId: tx?.envelopeId || null,
        note: tx?.note || "",
        createdAt: now(),
        updatedAt: now(),
    };
    s.transactions.push(record);
    write(s);
    return record;
}

export function addAccount(partial = {}) {
    const s = read();
    const acc = {
        id: uid(),
        name: partial.name || "Account",
        type: partial.type || "cash",
        openingBalance: Number(partial.openingBalance) || 0,
        archived: false,
        createdAt: now(),
        updatedAt: now(),
    };
    s.accounts.push(acc);
    write(s);
    return acc;
}

export function addEnvelope(partial = {}) {
    const s = read();
    const env = {
        id: uid(),
        name: partial.name || "Category",
        color: partial.color || "#9aa0a6",
        carryover: !!partial.carryover,
        budget: Number(partial.budget) || 0,
        createdAt: now(),
        updatedAt: now(),
    };
    s.envelopes.push(env);
    write(s);
    return env;
}

// ---- derived KPIs for Overview ----
export function kpisForMonth(yyyyMm = monthKey(new Date())) {
    const s = read();

    const income = s.transactions
        .filter(
            (t) =>
                inMonth(t.date, yyyyMm) && (t.type === "income" || t.amount > 0)
        )
        .reduce((a, t) => a + Math.abs(Number(t.amount) || 0), 0);

    const expense = s.transactions
        .filter(
            (t) =>
                inMonth(t.date, yyyyMm) &&
                (t.type === "expense" || t.amount < 0)
        )
        .reduce((a, t) => a + Math.abs(Number(t.amount) || 0), 0);

    const opening = s.accounts.reduce(
        (a, acc) => a + (Number(acc.openingBalance) || 0),
        0
    );
    const balance = opening + (income - expense);

    const totalBudget = s.envelopes.reduce(
        (a, e) => a + (Number(e.budget) || 0),
        0
    );
    const remainingBudget = totalBudget - expense; // <-- no clamp
    const overspent = Math.max(0, -remainingBudget); // helpful extra

    return {
        income,
        expense,
        balance,
        totalBudget,
        remainingBudget,
        overspent,
    };
}
