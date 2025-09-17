// src/pages/envelopes/index.jsx
import { useMemo, useState } from "react";
import { Styled } from "./styled";
import Modal from "../../components/modal/index.jsx";
import { getState, saveState, addEnvelope } from "../../data/local";

const monthNow = () => new Date().toISOString().slice(0, 7);

export default function Envelopes() {
    const [version, setVersion] = useState(0);
    const month = monthNow();

    // read state
    const state = useMemo(() => getState(), [version]);
    const { envelopes = [], transactions = [], settings = {} } = state;
    const { currency = "INR", locale = "en-IN" } = settings;

    const fmt = (n) =>
        new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(n || 0);

    // Pretty month label e.g., "Sep 2025"
    const monthLabel = useMemo(() => {
        const d = new Date(`${month}-01T00:00:00`);
        return new Intl.DateTimeFormat(locale || "en-IN", { month: "short", year: "numeric" }).format(d);
    }, [month, locale]);

    // spend per envelope (this month)
    const spentMap = useMemo(() => {
        const m = new Map();
        for (const t of transactions) {
            if (!t?.date || (t.date || "").slice(0, 7) !== month) continue;
            const amt = Number(t.amount) || 0;
            const type = t.type || (amt >= 0 ? "income" : "expense");
            if (type !== "expense") continue;
            const key = t.envelopeId || "__uncat__";
            m.set(key, (m.get(key) || 0) + Math.abs(amt));
        }
        return m;
    }, [transactions, month]);

    const rows = envelopes
        .map((e) => ({
            ...e,
            spent: spentMap.get(e.id) || 0,
            remaining: (Number(e.budget) || 0) - (spentMap.get(e.id) || 0),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

    const totalBudget = rows.reduce((a, r) => a + (Number(r.budget) || 0), 0);
    const totalSpent = rows.reduce((a, r) => a + (Number(r.spent) || 0), 0);
    const uncatSpent = spentMap.get("__uncat__") || 0;

    // --- inline updates ---
    const setBudget = (id, budget) => {
        const s = getState();
        s.envelopes = s.envelopes.map((e) =>
            e.id === id ? { ...e, budget: Number(budget) || 0, updatedAt: new Date().toISOString() } : e
        );
        saveState(s);
        setVersion((v) => v + 1);
    };

    const setCarryover = (id, carry) => {
        const s = getState();
        s.envelopes = s.envelopes.map((e) =>
            e.id === id ? { ...e, carryover: !!carry, updatedAt: new Date().toISOString() } : e
        );
        saveState(s);
        setVersion((v) => v + 1);
    };

    const setColor = (id, color) => {
        const s = getState();
        s.envelopes = s.envelopes.map((e) =>
            e.id === id ? { ...e, color, updatedAt: new Date().toISOString() } : e
        );
        saveState(s);
        setVersion((v) => v + 1);
    };

    // --- New envelope modal ---
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: "", color: "#7c9cff", budget: "", carryover: true });
    const [error, setError] = useState("");

    const openNew = () => {
        setForm({ name: "", color: "#7c9cff", budget: "", carryover: true });
        setError("");
        setOpen(true);
    };
    const closeNew = () => setOpen(false);

    const handleCreate = () => {
        setError("");
        if (!form.name.trim()) return setError("Enter category name.");
        addEnvelope({
            name: form.name.trim(),
            color: form.color || "#9aa0a6",
            budget: Number(form.budget) || 0,
            carryover: !!form.carryover,
        });
        setOpen(false);
        setVersion((v) => v + 1);
    };

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    };

    // --- Delete modal ---
    const [delOpen, setDelOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const openDelete = (env) => {
        setSelected(env);
        setDelOpen(true);
    };
    const closeDelete = () => {
        setSelected(null);
        setDelOpen(false);
    };
    const confirmDelete = () => {
        const s = getState();
        // transactions tagged to this envelope become Uncategorized
        s.transactions = s.transactions.map((t) => (t.envelopeId === selected.id ? { ...t, envelopeId: null } : t));
        s.envelopes = s.envelopes.filter((e) => e.id !== selected.id);
        saveState(s);
        setVersion((v) => v + 1);
        closeDelete();
    };

    return (
        <Styled.Page>
            <Styled.HeaderBar>
                <div>
                    <Styled.Title>Envelopes</Styled.Title>
                    <Styled.Subtitle>Budgets — {monthLabel}</Styled.Subtitle>
                </div>
                <Styled.Actions>
                    <Styled.Button variant="primary" onClick={openNew}>New Envelope</Styled.Button>
                </Styled.Actions>
            </Styled.HeaderBar>

            <Styled.Card>
                {rows.length === 0 ? (
                    <Styled.Empty>No envelopes yet. Create your first category.</Styled.Empty>
                ) : (
                    <Styled.Table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th style={{ width: 120 }}>Color</th>
                                <th style={{ width: 160, textAlign: "right" }}>Budget</th>
                                <th style={{ width: 200, textAlign: "right" }}>Spent ({monthLabel})</th>
                                <th style={{ width: 160, textAlign: "right" }}>Remaining</th>
                                <th style={{ width: 140 }}>Carryover</th>
                                <th style={{ width: 100 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((e) => (
                                <tr key={e.id}>
                                    <td>
                                        <Styled.ColorDot color={e.color} />
                                        {e.name}
                                    </td>
                                    <td>
                                        <Styled.Control
                                            type="color"
                                            value={e.color || "#9aa0a6"}
                                            onChange={(ev) => setColor(e.id, ev.target.value)}
                                            title="Pick color"
                                            style={{ width: 48, padding: 0, height: 32 }}
                                        />
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                        <Styled.Control
                                            type="number"
                                            inputMode="decimal"
                                            step="0.01"
                                            value={e.budget ?? 0}
                                            onChange={(ev) => setBudget(e.id, ev.target.value)}
                                            style={{ maxWidth: 120, textAlign: "right" }}
                                        />
                                    </td>
                                    <td style={{ textAlign: "right" }}>{fmt(e.spent)}</td>
                                    <td style={{ textAlign: "right", color: e.remaining < 0 ? "hsl(0 84% 60%)" : "inherit" }}>
                                        {e.remaining < 0 ? `-${fmt(Math.abs(e.remaining))}` : fmt(e.remaining)}
                                    </td>
                                    <td>
                                        <Styled.CheckboxRow title="Carry leftover to next month">
                                            <input
                                                type="checkbox"
                                                checked={!!e.carryover}
                                                onChange={(ev) => setCarryover(e.id, ev.target.checked)}
                                            />
                                            Carryover
                                        </Styled.CheckboxRow>
                                    </td>
                                    <td>
                                        <Styled.Button variant="ghost" onClick={() => openDelete(e)}>Delete</Styled.Button>
                                    </td>
                                </tr>
                            ))}
                            {/* Uncategorized (read-only) */}
                            {uncatSpent > 0 && (
                                <tr>
                                    <td><Styled.ColorDot color="#9aa0a6" />Uncategorized</td>
                                    <td></td>
                                    <td style={{ textAlign: "right" }}>—</td>
                                    <td style={{ textAlign: "right" }}>{fmt(uncatSpent)}</td>
                                    <td style={{ textAlign: "right" }}>—</td>
                                    <td>—</td>
                                    <td></td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th></th>
                                <th style={{ textAlign: "right" }}>{fmt(totalBudget)}</th>
                                <th style={{ textAlign: "right" }}>{fmt(totalSpent)}</th>
                                <th style={{ textAlign: "right" }}>
                                    {totalBudget - totalSpent < 0
                                        ? `-${fmt(Math.abs(totalBudget - totalSpent))}`
                                        : fmt(totalBudget - totalSpent)}
                                </th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </Styled.Table>
                )}
            </Styled.Card>

            {/* New Envelope */}
            <Modal
                open={open}
                onClose={closeNew}
                title="New Envelope"
                actions={
                    <>
                        <Styled.Button variant="ghost" onClick={closeNew}>Cancel</Styled.Button>
                        <Styled.Button variant="primary" onClick={handleCreate}>Save</Styled.Button>
                    </>
                }
            >
                <Styled.Form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
                    {error && <Styled.Error>{error}</Styled.Error>}

                    <Styled.Field>
                        Name
                        <Styled.Control
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            placeholder="e.g., Groceries"
                        />
                    </Styled.Field>

                    <Styled.Row2>
                        <Styled.Field>
                            Color
                            <Styled.Control type="color" name="color" value={form.color} onChange={onChange} style={{ width: 64, height: 40, padding: 0 }} />
                        </Styled.Field>

                        <Styled.Field>
                            Monthly Budget
                            <Styled.Control
                                type="number"
                                inputMode="decimal"
                                step="0.01"
                                name="budget"
                                value={form.budget}
                                onChange={onChange}
                                placeholder="0"
                            />
                        </Styled.Field>
                    </Styled.Row2>

                    <Styled.CheckboxRow>
                        <input type="checkbox" name="carryover" checked={!!form.carryover} onChange={onChange} />
                        Carry leftover to next month
                    </Styled.CheckboxRow>
                </Styled.Form>
            </Modal>

            {/* Delete Envelope */}
            <Modal
                open={delOpen}
                onClose={closeDelete}
                title="Delete this envelope?"
                actions={
                    <>
                        <Styled.Button variant="ghost" onClick={closeDelete}>Cancel</Styled.Button>
                        <Styled.Button variant="danger" onClick={confirmDelete}>Delete</Styled.Button>
                    </>
                }
            >
                <p>
                    <strong>{selected?.name}</strong> will be removed. Any transactions in this category will become
                    <em> Uncategorized</em>.
                </p>
            </Modal>
        </Styled.Page>
    );
}
