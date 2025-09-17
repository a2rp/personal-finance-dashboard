// src/pages/accounts/index.jsx
import { useMemo, useState } from "react";
import { Styled } from "./styled";
import Modal from "../../components/modal/index.jsx";
import { getState, saveState, addAccount } from "../../data/local";

export default function Accounts() {
    const [version, setVersion] = useState(0);

    // read state
    const state = useMemo(() => getState(), [version]);
    const { accounts = [], transactions = [], settings = {} } = state;
    const { currency = "INR", locale = "en-IN" } = settings;

    const fmt = (n) =>
        new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(n || 0);

    // derive balances
    const rows = useMemo(() => {
        const sumByAccount = new Map();
        for (const tx of transactions) {
            if (!tx.accountId) continue;
            sumByAccount.set(tx.accountId, (sumByAccount.get(tx.accountId) || 0) + (tx.amount || 0));
        }
        return accounts.map((a) => {
            const delta = sumByAccount.get(a.id) || 0;
            const current = (a.openingBalance || 0) + delta;
            return { ...a, current };
        });
    }, [accounts, transactions]);

    // New account modal
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: "", type: "cash", openingBalance: "" });
    const [error, setError] = useState("");

    const openNew = () => {
        setForm({ name: "", type: "cash", openingBalance: "" });
        setError("");
        setOpen(true);
    };
    const closeNew = () => setOpen(false);

    const handleCreate = () => {
        setError("");
        if (!form.name.trim()) return setError("Enter account name.");
        const opening = Number(form.openingBalance) || 0;
        addAccount({ name: form.name.trim(), type: form.type, openingBalance: opening });
        setOpen(false);
        setVersion((v) => v + 1);
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    // Delete modal
    const [delOpen, setDelOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const openDelete = (acc) => {
        setSelected(acc);
        setDelOpen(true);
    };
    const closeDelete = () => {
        setSelected(null);
        setDelOpen(false);
    };
    const confirmDelete = () => {
        const s = getState();
        // prevent deleting if there are transactions tied to this account (simple guard)
        const hasTx = s.transactions.some((t) => t.accountId === selected.id);
        if (hasTx) {
            alert("This account has transactions. Clear them first or move them to another account.");
            return;
        }
        s.accounts = s.accounts.filter((a) => a.id !== selected.id);
        saveState(s);
        setVersion((v) => v + 1);
        closeDelete();
    };

    return (
        <Styled.Page>
            <Styled.HeaderBar>
                <div>
                    <Styled.Title>Accounts</Styled.Title>
                    <Styled.Subtitle>Manage your cash/bank/credit accounts</Styled.Subtitle>
                </div>
                <Styled.Actions>
                    <Styled.Button variant="primary" onClick={openNew}>New Account</Styled.Button>
                </Styled.Actions>
            </Styled.HeaderBar>

            <Styled.Card>
                {rows.length === 0 ? (
                    <Styled.Empty>No accounts yet. Create your first account.</Styled.Empty>
                ) : (
                    <Styled.Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th style={{ width: 140 }}>Type</th>
                                <th style={{ width: 160, textAlign: "right" }}>Opening</th>
                                <th style={{ width: 160, textAlign: "right" }}>Current</th>
                                <th style={{ width: 100 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((a) => (
                                <tr key={a.id}>
                                    <td>{a.name}</td>
                                    <td style={{ textTransform: "capitalize" }}>{a.type}</td>
                                    <td style={{ textAlign: "right" }}>{fmt(a.openingBalance || 0)}</td>
                                    <td style={{ textAlign: "right" }}>{fmt(a.current || 0)}</td>
                                    <td>
                                        <Styled.Button variant="ghost" onClick={() => openDelete(a)}>Delete</Styled.Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Styled.Table>
                )}
            </Styled.Card>

            {/* New Account */}
            <Modal
                open={open}
                onClose={closeNew}
                title="New Account"
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
                            placeholder="e.g., HDFC Bank"
                        />
                    </Styled.Field>

                    <Styled.Row2>
                        <Styled.Field>
                            Type
                            <Styled.Select name="type" value={form.type} onChange={onChange}>
                                <option value="cash">Cash</option>
                                <option value="bank">Bank</option>
                                <option value="credit">Credit</option>
                            </Styled.Select>
                        </Styled.Field>

                        <Styled.Field>
                            Opening Balance
                            <Styled.Control
                                type="number"
                                inputMode="decimal"
                                step="0.01"
                                name="openingBalance"
                                value={form.openingBalance}
                                onChange={onChange}
                                placeholder="0"
                            />
                        </Styled.Field>
                    </Styled.Row2>
                </Styled.Form>
            </Modal>

            {/* Delete Account */}
            <Modal
                open={delOpen}
                onClose={closeDelete}
                title="Delete this account?"
                actions={
                    <>
                        <Styled.Button variant="ghost" onClick={closeDelete}>Cancel</Styled.Button>
                        <Styled.Button variant="danger" onClick={confirmDelete}>Delete</Styled.Button>
                    </>
                }
            >
                <p>
                    <strong>{selected?.name}</strong> ({selected?.type}) will be removed.
                </p>
                <p className="muted">If this account has transactions, delete/move them first.</p>
            </Modal>
        </Styled.Page>
    );
}
