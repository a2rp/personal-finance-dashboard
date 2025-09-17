// src/pages/transactions/index.jsx
import { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import Modal from "../../components/modal/index.jsx";
import { getState, saveState, addTransaction } from "../../data/local.js";
import { exportTransactionsCSV } from "../../utils/csv.js";
import { toast } from "react-toastify";

// --- Local (timezone-safe) month helpers ---
const toYyyyMmLocal = (dt) =>
    `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
const monthNow = () => toYyyyMmLocal(new Date());
const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const monthKey = (d) => {
    if (typeof d === "string") return d.slice(0, 7);
    const dt = d instanceof Date ? d : new Date(d);
    return toYyyyMmLocal(dt);
};
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SORT_KEYS = { date: "date", type: "type", account: "account", envelope: "envelope", amount: "amount" };
const TYPE_ORDER = { income: 1, expense: 2 };

export default function Transactions() {
    const [version, setVersion] = useState(0);

    // Modals
    const [confirmOpen, setConfirmOpen] = useState(false); // clear-month
    const [txOpen, setTxOpen] = useState(false);           // new transaction
    const [delOpen, setDelOpen] = useState(false);         // delete confirm
    const [delTx, setDelTx] = useState(null);              // tx selected to delete

    // Month state + navigation
    const [month, setMonth] = useState(monthNow());
    const shiftMonth = (delta) => {
        const [y, m] = month.split("-").map(Number);
        const dt = new Date(y, (m - 1) + delta, 1);
        setMonth(toYyyyMmLocal(dt));
    };
    const prevMonth = () => shiftMonth(-1);
    const nextMonth = () => shiftMonth(1);

    // Filters & search
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [accountFilter, setAccountFilter] = useState("");
    const [envelopeFilter, setEnvelopeFilter] = useState("");

    // Sorting
    const [sortKey, setSortKey] = useState(SORT_KEYS.date);
    const [sortDir, setSortDir] = useState("desc");

    // re-read state whenever version changes
    const state = useMemo(() => getState(), [version]);
    const { transactions = [], accounts = [], envelopes = [], settings = {} } = state;
    const { currency = "INR", locale = "en-IN" } = settings;

    // Month label e.g., "Sep 2025"
    const monthLabel = useMemo(() => {
        const d = new Date(`${month}-01T00:00:00`);
        return new Intl.DateTimeFormat(locale || "en-IN", { month: "short", year: "numeric" }).format(d);
    }, [month, locale]);

    // Build year options from data (+/- 1 year padding)
    const years = useMemo(() => {
        const set = new Set();
        for (const t of transactions) {
            const y = Number((t.date || "").slice(0, 4));
            if (y) set.add(y);
        }
        set.add(new Date().getFullYear());
        let arr = Array.from(set).sort((a, b) => a - b);
        if (arr.length === 0) {
            const y = new Date().getFullYear();
            arr = [y - 1, y, y + 1];
        } else {
            const min = arr[0], max = arr[arr.length - 1];
            if (!arr.includes(min - 1)) arr.unshift(min - 1);
            if (!arr.includes(max + 1)) arr.push(max + 1);
        }
        return arr;
    }, [transactions]);

    // Form state (new tx)
    const defaultDateForMonth = useMemo(() => {
        const nowM = monthKey(new Date());
        return nowM === month ? today() : `${month}-15`;
    }, [month]);

    const [form, setForm] = useState({
        date: defaultDateForMonth,
        type: "expense",
        amount: "",
        accountId: "",
        envelopeId: "",
        note: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (!txOpen) {
            setForm((f) => ({ ...f, date: defaultDateForMonth }));
        }
    }, [defaultDateForMonth, txOpen]);

    // default selects when modal opens
    useEffect(() => {
        if (!txOpen) return;
        setForm((f) => ({
            ...f,
            accountId: f.accountId || accounts[0]?.id || "",
            envelopeId: f.envelopeId || envelopes[0]?.id || "",
        }));
    }, [txOpen, accounts, envelopes]);

    const fmt = (n) =>
        new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(n || 0);

    const accName = useMemo(() => Object.fromEntries(accounts.map((a) => [a.id, a.name])), [accounts]);
    const envName = useMemo(() => Object.fromEntries(envelopes.map((e) => [e.id, e.name])), [envelopes]);

    // Month rows
    const monthRows = useMemo(() => {
        return [...transactions]
            .filter((t) => (t.date || "").slice(0, 7) === month);
    }, [transactions, month]);

    // Apply filters
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return monthRows.filter((t) => {
            const amt = Number(t.amount) || 0;
            const type = t.type || (amt >= 0 ? "income" : "expense");
            if (typeFilter !== "all" && type !== typeFilter) return false;
            if (accountFilter && t.accountId !== accountFilter) return false;
            if (envelopeFilter && t.envelopeId !== envelopeFilter) return false;
            if (!q) return true;
            const hay = [
                t.note || "",
                accName[t.accountId] || "",
                envName[t.envelopeId] || "",
                t.date?.slice(0, 10) || "",
                String(Math.abs(amt))
            ].join(" ").toLowerCase();
            return hay.includes(q);
        });
    }, [monthRows, search, typeFilter, accountFilter, envelopeFilter, accName, envName]);

    // Sort
    const sorted = useMemo(() => {
        const arr = [...filtered];
        const dir = sortDir === "asc" ? 1 : -1;
        arr.sort((a, b) => {
            if (sortKey === SORT_KEYS.amount) {
                const av = Math.abs(Number(a.amount) || 0);
                const bv = Math.abs(Number(b.amount) || 0);
                return (av - bv) * dir;
            }
            if (sortKey === SORT_KEYS.date) {
                const av = a.date || "";
                const bv = b.date || "";
                return av.localeCompare(bv) * dir;
            }
            if (sortKey === SORT_KEYS.type) {
                const at = a.type || ((a.amount || 0) >= 0 ? "income" : "expense");
                const bt = b.type || ((b.amount || 0) >= 0 ? "income" : "expense");
                return (TYPE_ORDER[at] - TYPE_ORDER[bt]) * dir;
            }
            if (sortKey === SORT_KEYS.account) {
                const av = accName[a.accountId] || "";
                const bv = accName[b.accountId] || "";
                return av.localeCompare(bv) * dir;
            }
            if (sortKey === SORT_KEYS.envelope) {
                const av = envName[a.envelopeId] || "";
                const bv = envName[b.envelopeId] || "";
                return av.localeCompare(bv) * dir;
            }
            return 0;
        });
        return arr;
    }, [filtered, sortKey, sortDir, accName, envName]);

    // Totals (selected rows)
    const totals = useMemo(() => {
        let income = 0, expense = 0;
        for (const t of sorted) {
            const amt = Number(t.amount) || 0;
            const type = t.type || (amt >= 0 ? "income" : "expense");
            if (type === "income") income += Math.abs(amt);
            else expense += Math.abs(amt);
        }
        return { income, expense, net: income - expense };
    }, [sorted]);

    // demo add uses selected month
    const pickDateInSelectedMonth = () => defaultDateForMonth;

    const addSampleIncome = () => {
        addTransaction({ date: pickDateInSelectedMonth(), amount: 1200, type: "income", note: "Demo income" });
        setVersion((v) => v + 1);
        toast.success("Income added");
    };
    const addSampleExpense = () => {
        addTransaction({ date: pickDateInSelectedMonth(), amount: -250, type: "expense", note: "Demo expense" });
        setVersion((v) => v + 1);
        toast.success("Expense added");
    };

    // Export CSV for selected month
    const exportCsv = () => {
        try {
            exportTransactionsCSV(state, { month, filename: `transactions-${month}.csv` });
            toast.success(`Exported CSV for ${monthLabel}`);
        } catch (e) {
            console.error(e);
            toast.error("Export failed");
        }
    };

    // delete (actual write)
    const deleteById = (id) => {
        const s = getState();
        s.transactions = s.transactions.filter((t) => t.id !== id);
        saveState(s);
        setVersion((v) => v + 1);
    };

    // Clear month
    const openClearModal = () => setConfirmOpen(true);
    const closeClearModal = () => setConfirmOpen(false);
    const confirmClearMonth = () => {
        const s = getState();
        const removed = s.transactions.filter((t) => (t.date || "").slice(0, 7) === month);
        s.transactions = s.transactions.filter((t) => (t.date || "").slice(0, 7) !== month);
        saveState(s);
        setVersion((v) => v + 1);
        setConfirmOpen(false);

        // Toast with Undo
        toast(({ closeToast }) => (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>Cleared {removed.length} transaction{removed.length === 1 ? "" : "s"} for {monthLabel}</span>
                {removed.length > 0 && (
                    <button
                        onClick={() => {
                            const st = getState();
                            st.transactions = [...st.transactions, ...removed];
                            saveState(st);
                            setVersion((v) => v + 1);
                            toast.success("Restore complete");
                            closeToast?.();
                        }}
                        style={{ marginLeft: 8, border: 0, background: "transparent", textDecoration: "underline", cursor: "pointer" }}
                    >
                        Undo
                    </button>
                )}
            </div>
        ), { autoClose: 5000 });
    };

    // New transaction modal
    const openTx = () => {
        setForm({
            date: defaultDateForMonth,
            type: "expense",
            amount: "",
            accountId: accounts[0]?.id || "",
            envelopeId: envelopes[0]?.id || "",
            note: "",
        });
        setError("");
        setTxOpen(true);
    };
    const closeTx = () => setTxOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleCreate = () => {
        setError("");
        const amt = Number(form.amount);
        if (!form.date) return setError("Please choose a date.");
        if (!form.type) return setError("Please select type.");
        if (!amt || Number.isNaN(amt) || amt <= 0) return setError("Enter a positive amount.");
        if (!form.accountId) return setError("Select an account.");

        const signed = form.type === "expense" ? -Math.abs(amt) : Math.abs(amt);
        addTransaction({
            date: form.date,
            type: form.type,
            amount: signed,
            accountId: form.accountId,
            envelopeId: form.envelopeId || null,
            note: form.note?.trim(),
        });

        setVersion((v) => v + 1);
        setTxOpen(false);
        toast.success("Transaction saved");
    };

    // Delete confirm modal
    const openDelete = (tx) => {
        setDelTx(tx);
        setDelOpen(true);
    };
    const closeDelete = () => {
        setDelOpen(false);
        setDelTx(null);
    };
    const confirmDelete = () => {
        const tx = delTx;
        if (tx?.id) {
            deleteById(tx.id);
            // Toast with Undo
            toast(({ closeToast }) => (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span>Deleted transaction</span>
                    <button
                        onClick={() => {
                            const st = getState();
                            st.transactions = [...st.transactions, tx];
                            saveState(st);
                            setVersion((v) => v + 1);
                            toast.success("Restored");
                            closeToast?.();
                        }}
                        style={{ marginLeft: 8, border: 0, background: "transparent", textDecoration: "underline", cursor: "pointer" }}
                    >
                        Undo
                    </button>
                </div>
            ), { autoClose: 5000 });
        }
        closeDelete();
    };

    // Month selects (Prev • Month • Next)
    const y = Number(month.slice(0, 4));
    const m = Number(month.slice(5, 7));
    const changeMonth = (newM) => setMonth(`${y}-${String(newM).padStart(2, "0")}`);
    const changeYear = (newY) => setMonth(`${newY}-${String(m).padStart(2, "0")}`);

    // Sorting handler
    const clickSort = (key) => {
        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir(key === SORT_KEYS.date ? "desc" : "asc");
        }
    };
    const sortArrow = (key) => (sortKey === key ? (sortDir === "asc" ? " ▲" : " ▼") : "");

    // Clear filters
    const clearFilters = () => {
        setSearch("");
        setTypeFilter("all");
        setAccountFilter("");
        setEnvelopeFilter("");
        toast.info("Filters cleared");
    };

    return (
        <Styled.Page>
            <Styled.HeaderBar>
                <div>
                    <Styled.Title>Transactions</Styled.Title>
                    <Styled.Subtitle>Month — {monthLabel}</Styled.Subtitle>
                </div>

                <Styled.Actions>
                    {/* Month navigation — Prev • Month • Next (with selects) */}
                    <div
                        className="month-nav"
                        style={{
                            display: "inline-flex",
                            gap: 8,
                            alignItems: "center",
                            marginRight: 12,
                        }}
                    >
                        <Styled.Button type="button" variant="ghost" onClick={prevMonth} aria-label="Previous month">‹</Styled.Button>

                        <div style={{ display: "inline-flex", gap: 8 }}>
                            <select
                                aria-label="Select month"
                                value={m}
                                onChange={(e) => changeMonth(Number(e.target.value))}
                                style={{
                                    height: 40,
                                    padding: "0 8px",
                                    border: "1px solid var(--border)",
                                    background: "var(--card)",
                                    color: "var(--text)",
                                    borderRadius: "var(--radius-sm)",
                                }}
                            >
                                {MONTHS.map((label, idx) => (
                                    <option key={label} value={idx + 1}>
                                        {label}
                                    </option>
                                ))}
                            </select>

                            <select
                                aria-label="Select year"
                                value={y}
                                onChange={(e) => changeYear(Number(e.target.value))}
                                style={{
                                    height: 40,
                                    padding: "0 8px",
                                    border: "1px solid var(--border)",
                                    background: "var(--card)",
                                    color: "var(--text)",
                                    borderRadius: "var(--radius-sm)",
                                    minWidth: 88,
                                }}
                            >
                                {years.map((yy) => (
                                    <option key={yy} value={yy}>{yy}</option>
                                ))}
                            </select>
                        </div>

                        <Styled.Button type="button" variant="ghost" onClick={nextMonth} aria-label="Next month">›</Styled.Button>
                    </div>

                    <Styled.Button variant="primary" onClick={openTx}>New Transaction</Styled.Button>
                    <Styled.Button onClick={exportCsv}>Export CSV</Styled.Button>
                    <Styled.Button variant="ghost" onClick={addSampleIncome}>+ Add ₹1,200 Income</Styled.Button>
                    <Styled.Button variant="ghost" onClick={addSampleExpense}>+ Add -₹250 Expense</Styled.Button>
                    <Styled.Button onClick={openClearModal}>Clear This Month</Styled.Button>
                </Styled.Actions>
            </Styled.HeaderBar>

            {/* Filter bar */}
            <Styled.FilterBar>
                <Styled.Control
                    aria-label="Search"
                    placeholder="Search note, account, envelope, amount, date…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Styled.Select
                    aria-label="Filter by type"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                >
                    <option value="all">All types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </Styled.Select>

                <Styled.Select
                    aria-label="Filter by account"
                    value={accountFilter}
                    onChange={(e) => setAccountFilter(e.target.value)}
                >
                    <option value="">All accounts</option>
                    {accounts.map((a) => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                </Styled.Select>

                <Styled.Select
                    aria-label="Filter by envelope"
                    value={envelopeFilter}
                    onChange={(e) => setEnvelopeFilter(e.target.value)}
                >
                    <option value="">All envelopes</option>
                    {envelopes.map((e) => (
                        <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                </Styled.Select>

                <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "flex-end" }}>
                    <Styled.SmallMeta>{sorted.length} result{sorted.length === 1 ? "" : "s"}</Styled.SmallMeta>
                    <Styled.Button type="button" variant="ghost" onClick={clearFilters}>Clear</Styled.Button>
                </div>
            </Styled.FilterBar>

            <Styled.Card>
                {sorted.length === 0 ? (
                    <Styled.Empty>No transactions for {monthLabel} (or none match filters).</Styled.Empty>
                ) : (
                    <Styled.Table>
                        <thead>
                            <tr>
                                <th style={{ width: 140 }}>
                                    <Styled.SortButton
                                        type="button"
                                        onClick={() => clickSort(SORT_KEYS.date)}
                                        aria-sort={sortKey === SORT_KEYS.date ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                                    >
                                        Date{sortArrow(SORT_KEYS.date)}
                                    </Styled.SortButton>
                                </th>
                                <th style={{ width: 120 }}>
                                    <Styled.SortButton
                                        type="button"
                                        onClick={() => clickSort(SORT_KEYS.type)}
                                        aria-sort={sortKey === SORT_KEYS.type ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                                    >
                                        Type{sortArrow(SORT_KEYS.type)}
                                    </Styled.SortButton>
                                </th>
                                <th>
                                    <Styled.SortButton
                                        type="button"
                                        onClick={() => clickSort(SORT_KEYS.account)}
                                        aria-sort={sortKey === SORT_KEYS.account ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                                    >
                                        Account{sortArrow(SORT_KEYS.account)}
                                    </Styled.SortButton>
                                </th>
                                <th>
                                    <Styled.SortButton
                                        type="button"
                                        onClick={() => clickSort(SORT_KEYS.envelope)}
                                        aria-sort={sortKey === SORT_KEYS.envelope ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                                    >
                                        Envelope{sortArrow(SORT_KEYS.envelope)}
                                    </Styled.SortButton>
                                </th>
                                <th style={{ width: 160, textAlign: "right" }}>
                                    <Styled.SortButton
                                        type="button"
                                        onClick={() => clickSort(SORT_KEYS.amount)}
                                        aria-sort={sortKey === SORT_KEYS.amount ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                                    >
                                        Amount{sortArrow(SORT_KEYS.amount)}
                                    </Styled.SortButton>
                                </th>
                                <th style={{ width: 80 }}></th>
                            </tr>
                        </thead>

                        <tbody>
                            {sorted.map((t) => {
                                const type = t.type || ((t.amount || 0) >= 0 ? "income" : "expense");
                                return (
                                    <tr key={t.id}>
                                        <td>{t.date?.slice(0, 10) || "-"}</td>
                                        <td>{type}</td>
                                        <td>{accName[t.accountId] || "—"}</td>
                                        <td>{envName[t.envelopeId] || "—"}</td>
                                        <td style={{ textAlign: "right", color: (t.amount || 0) < 0 ? "crimson" : "seagreen" }}>
                                            {fmt(Math.abs(t.amount || 0))}
                                        </td>
                                        <td>
                                            <Styled.Button variant="ghost" onClick={() => openDelete(t)}>Delete</Styled.Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                        {/* Totals row (for filtered+sorted rows) */}
                        <tfoot>
                            <tr>
                                <th colSpan={4} style={{ textAlign: "right", paddingRight: 12 }}>Total Income</th>
                                <th style={{ textAlign: "right" }}>{fmt(totals.income)}</th>
                                <th></th>
                            </tr>
                            <tr>
                                <th colSpan={4} style={{ textAlign: "right", paddingRight: 12 }}>Total Expense</th>
                                <th style={{ textAlign: "right", color: "hsl(0 84% 60%)" }}>
                                    -{fmt(totals.expense)}
                                </th>
                                <th></th>
                            </tr>
                            <tr>
                                <th colSpan={4} style={{ textAlign: "right", paddingRight: 12 }}>Net</th>
                                <th style={{ textAlign: "right", color: totals.net < 0 ? "hsl(0 84% 60%)" : "seagreen" }}>
                                    {totals.net < 0 ? `-${fmt(Math.abs(totals.net))}` : fmt(totals.net)}
                                </th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </Styled.Table>
                )}
            </Styled.Card>

            {/* Clear-month modal */}
            <Modal
                open={confirmOpen}
                onClose={closeClearModal}
                title={`Clear transactions for ${monthLabel}?`}
                actions={
                    <>
                        <Styled.Button variant="ghost" onClick={closeClearModal}>Cancel</Styled.Button>
                        <Styled.Button variant="danger" onClick={confirmClearMonth}>Clear</Styled.Button>
                    </>
                }
            >
                <p>This action can’t be undone.</p>
            </Modal>

            {/* Delete transaction modal */}
            <Modal
                open={delOpen}
                onClose={closeDelete}
                title="Delete this transaction?"
                actions={
                    <>
                        <Styled.Button variant="ghost" onClick={closeDelete}>Cancel</Styled.Button>
                        <Styled.Button variant="danger" onClick={confirmDelete}>Delete</Styled.Button>
                    </>
                }
            >
                <div style={{ lineHeight: 1.6 }}>
                    <div><strong>Date:</strong> {delTx?.date?.slice(0, 10) || "-"}</div>
                    <div><strong>Type:</strong> {delTx?.type || (delTx?.amount >= 0 ? "income" : "expense")}</div>
                    <div>
                        <strong>Amount:</strong>{" "}
                        {(delTx?.amount ?? 0) < 0 ? "-" : ""}
                        {fmt(Math.abs(delTx?.amount ?? 0))}
                    </div>
                    {delTx?.note ? <div><strong>Note:</strong> {delTx.note}</div> : null}
                </div>
            </Modal>

            {/* New Transaction modal */}
            <Modal
                open={txOpen}
                onClose={closeTx}
                title="New Transaction"
                actions={
                    <>
                        <Styled.Button variant="ghost" onClick={closeTx}>Cancel</Styled.Button>
                        <Styled.Button variant="primary" onClick={handleCreate}>Save</Styled.Button>
                    </>
                }
            >
                <Styled.Form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
                    {error && <Styled.Error>{error}</Styled.Error>}

                    <Styled.Row2>
                        <Styled.Field>
                            Date
                            <Styled.Control type="date" name="date" value={form.date} onChange={handleChange} />
                        </Styled.Field>

                        <Styled.Field>
                            Type
                            <Styled.Select name="type" value={form.type} onChange={handleChange}>
                                <option value="expense">Expense (-)</option>
                                <option value="income">Income (+)</option>
                            </Styled.Select>
                        </Styled.Field>
                    </Styled.Row2>

                    <Styled.Row2>
                        <Styled.Field>
                            Amount
                            <Styled.Control
                                type="number"
                                step="0.01"
                                inputMode="decimal"
                                name="amount"
                                value={form.amount}
                                onChange={handleChange}
                                placeholder="e.g., 250"
                            />
                        </Styled.Field>

                        <Styled.Field>
                            Account
                            <Styled.Select name="accountId" value={form.accountId} onChange={handleChange}>
                                {accounts.map((a) => (
                                    <option key={a.id} value={a.id}>{a.name}</option>
                                ))}
                            </Styled.Select>
                        </Styled.Field>
                    </Styled.Row2>

                    <Styled.Field>
                        Envelope (optional)
                        <Styled.Select name="envelopeId" value={form.envelopeId} onChange={handleChange}>
                            <option value="">— None —</option>
                            {envelopes.map((e) => (
                                <option key={e.id} value={e.id}>{e.name}</option>
                            ))}
                        </Styled.Select>
                    </Styled.Field>

                    <Styled.Field>
                        Note (optional)
                        <Styled.Textarea
                            name="note"
                            value={form.note}
                            onChange={handleChange}
                            placeholder="e.g., Groceries at Big Bazaar"
                        />
                    </Styled.Field>
                </Styled.Form>
            </Modal>
        </Styled.Page>
    );
}
