// src/pages/overview/index.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Styled } from "./styled";
import { getState, kpisForMonth, addTransaction } from "../../data/local.js";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { toast } from "react-toastify";

/* ---------- Local (timezone-safe) month helpers ---------- */
const toYyyyMmLocal = (dt) =>
    `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
const monthNow = () => toYyyyMmLocal(new Date());
const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Overview() {
    const navigate = useNavigate();
    const [version, setVersion] = useState(0);

    // Month state + navigation (local-time safe)
    const [month, setMonth] = useState(monthNow());
    const shiftMonth = (delta) => {
        const [y, m] = month.split("-").map(Number);
        const dt = new Date(y, (m - 1) + delta, 1);
        setMonth(toYyyyMmLocal(dt));
    };
    const prevMonth = () => shiftMonth(-1);
    const nextMonth = () => shiftMonth(1);

    // pull current state once per version tick
    const state = useMemo(() => getState(), [version]);
    const { settings = {}, envelopes = [], transactions = [], accounts = [] } = state;
    const { currency = "INR", locale = "en-IN" } = settings;

    const fmt = (n) =>
        new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(n || 0);

    // Pretty month label e.g., "Sep 2025"
    const monthLabel = useMemo(() => {
        const d = new Date(`${month}-01T00:00:00`);
        return new Intl.DateTimeFormat(locale || "en-IN", {
            month: "short",
            year: "numeric",
        }).format(d);
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

    // KPIs
    const k = useMemo(() => kpisForMonth(month), [version, month]);
    const rem = k.remainingBudget ?? 0;
    const net = (k.income || 0) - (k.expense || 0);

    const kpis = [
        { key: "balance", label: "Total Balance", value: fmt(k.balance) },
        { key: "spend", label: "This Month Spend", value: fmt(k.expense) },
        { key: "income", label: "This Month Income", value: fmt(k.income) },
        {
            key: "net",
            label: "Net Cash Flow",
            value: net >= 0 ? fmt(net) : `-${fmt(Math.abs(net))}`,
            negative: net < 0,
        },
        {
            key: "remaining",
            label: rem >= 0 ? "Remaining Budget" : "Overspent",
            value: rem >= 0 ? fmt(rem) : `-${fmt(Math.abs(rem))}`,
            negative: rem < 0,
        },
    ];

    // --- Charts data ---
    const daily = useMemo(() => {
        const [yyyy, mm] = month.split("-").map(Number);
        const last = new Date(yyyy, mm, 0).getDate();
        const base = Array.from({ length: last }, (_, i) => ({
            day: String(i + 1).padStart(2, "0"),
            income: 0,
            expense: 0,
        }));
        const byDay = Object.fromEntries(base.map((d) => [d.day, d]));

        for (const t of transactions) {
            if (!t?.date) continue;
            if (t.date.slice(0, 7) !== month) continue;
            const d = t.date.slice(8, 10);
            if (!byDay[d]) continue;
            const amt = Math.abs(Number(t.amount) || 0);
            if ((t.type || (t.amount >= 0 ? "income" : "expense")) === "income") byDay[d].income += amt;
            else byDay[d].expense += amt;
        }
        return Object.values(byDay);
    }, [transactions, month]);

    const categories = useMemo(() => {
        const name = Object.fromEntries(envelopes.map((e) => [e.id, e.name]));
        const sum = new Map();
        for (const t of transactions) {
            if (!t?.date || t.date.slice(0, 7) !== month) continue;
            const amt = Number(t.amount) || 0;
            const type = t.type || (amt >= 0 ? "income" : "expense");
            if (type !== "expense") continue;
            const label = name[t.envelopeId] || "Uncategorized";
            sum.set(label, (sum.get(label) || 0) + Math.abs(amt));
        }
        return [...sum.entries()]
            .map(([name, total]) => ({ name, total }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 5);
    }, [transactions, envelopes, month]);

    const hasTrend = daily.some((d) => d.income > 0 || d.expense > 0);
    const hasCats = categories.length > 0;

    // Sample adds go into the selected month
    const pickDateInSelectedMonth = () => (toYyyyMmLocal(new Date()) === month ? today() : `${month}-15`);

    const addSampleIncome = () => {
        addTransaction({ date: pickDateInSelectedMonth(), amount: 1000, type: "income", note: "Sample income" });
        setVersion((v) => v + 1);
        toast.success("Income added");
    };
    const addSampleExpense = () => {
        addTransaction({ date: pickDateInSelectedMonth(), amount: -200, type: "expense", note: "Sample expense" });
        setVersion((v) => v + 1);
        toast.success("Expense added");
    };

    // Recent activity (latest 5 of selected month)
    const recent = useMemo(() => {
        return [...transactions]
            .filter((t) => (t.date || "").slice(0, 7) === month)
            .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
            .slice(0, 5);
    }, [transactions, month]);

    const accName = useMemo(() => Object.fromEntries(accounts.map((a) => [a.id, a.name])), [accounts]);
    const envName = useMemo(() => Object.fromEntries(envelopes.map((e) => [e.id, e.name])), [envelopes]);

    // Month selects
    const y = Number(month.slice(0, 4));
    const m = Number(month.slice(5, 7));
    const changeMonth = (newM) => setMonth(`${y}-${String(newM).padStart(2, "0")}`);
    const changeYear = (newY) => setMonth(`${newY}-${String(m).padStart(2, "0")}`);

    return (
        <Styled.Page>
            <Styled.HeaderBar>
                <div>
                    <Styled.Title>Personal Finance Dashboard</Styled.Title>
                    <Styled.Subtitle>Overview — {monthLabel}</Styled.Subtitle>
                </div>

                <Styled.Actions>
                    {/* Month nav */}
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

                    {/* Quick actions */}
                    <Styled.Button variant="primary" onClick={() => navigate("/transactions")}>
                        New Transaction
                    </Styled.Button>
                    <Styled.Button variant="ghost" onClick={addSampleIncome}>+ Add ₹1,000 Income</Styled.Button>
                    <Styled.Button variant="ghost" onClick={addSampleExpense}>+ Add -₹200 Expense</Styled.Button>
                </Styled.Actions>
            </Styled.HeaderBar>

            <Styled.Grid columns={4}>
                {kpis.map((kpi) => (
                    <Styled.Card key={kpi.key}>
                        <Styled.CardLabel>{kpi.label}</Styled.CardLabel>
                        <Styled.CardValue data-negative={kpi.negative ? "true" : undefined}>
                            {kpi.value}
                        </Styled.CardValue>
                    </Styled.Card>
                ))}
            </Styled.Grid>

            <Styled.Grid columns={2}>
                <Styled.Card tall>
                    <Styled.CardHeader>Income vs Expense ({monthLabel})</Styled.CardHeader>
                    {hasTrend ? (
                        <div style={{ width: "100%", height: 260 }}>
                            <ResponsiveContainer>
                                <AreaChart data={daily} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="income" name="Income" stroke="var(--success, #22c55e)" fill="var(--success, #22c55e)" fillOpacity={0.25} />
                                    <Area type="monotone" dataKey="expense" name="Expense" stroke="var(--danger, #ef4444)" fill="var(--danger, #ef4444)" fillOpacity={0.25} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <Styled.Placeholder>No data this month</Styled.Placeholder>
                    )}
                </Styled.Card>

                <Styled.Card tall>
                    <Styled.CardHeader>Top Categories</Styled.CardHeader>
                    {hasCats ? (
                        <div style={{ width: "100%", height: 260 }}>
                            <ResponsiveContainer>
                                <BarChart data={categories} layout="vertical" margin={{ left: 8, right: 16, top: 10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                    <XAxis type="number" />
                                    <YAxis type="category" dataKey="name" width={120} />
                                    <Tooltip />
                                    <Bar dataKey="total" name="Spend" fill="var(--primary)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <Styled.Placeholder>No expense categories yet</Styled.Placeholder>
                    )}
                </Styled.Card>
            </Styled.Grid>

            <Styled.Grid columns={1}>
                <Styled.Card>
                    <Styled.CardHeader>Recent Activity</Styled.CardHeader>
                    {/* (unchanged list) */}
                    {/* ... */}
                </Styled.Card>
            </Styled.Grid>
        </Styled.Page>
    );
}
