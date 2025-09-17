import styled, { css } from "styled-components";

// Stop forwarding non-DOM props
const stop = (...blocked) => ({
    shouldForwardProp: (prop) => !blocked.includes(prop),
});

export const Styled = {
    Page: styled.div`
        min-height: 100dvh;
        background: var(--bg);
        color: var(--text);
        padding: var(--space-6) var(--space-4);
    `,

    HeaderBar: styled.header`
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        margin: 0 auto var(--space-6);
        max-width: 1440px;
    `,

    Title: styled.h1`
        font-size: 28px;
        line-height: 1.2;
        margin: 0;
        letter-spacing: -0.01em;
    `,

    Subtitle: styled.p`
        margin: 4px 0 0;
        color: var(--text-muted);
    `,

    Actions: styled.div`
        display: flex;
        gap: var(--space-3);
        flex-wrap: wrap;
    `,

    Button: styled.button.withConfig(stop("variant"))`
        height: 40px;
        padding: 0 14px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--border);
        background: var(--surface);
        color: var(--text);
        display: inline-flex;
        align-items: center;
        gap: 8px;
        box-shadow: var(--shadow-sm);
        cursor: pointer;

        &:focus-visible {
            outline: none;
            box-shadow: var(--focus-ring);
        }

        ${(p) =>
            p.variant === "primary" &&
            css`
                background: var(--primary);
                color: var(--primary-contrast);
                border-color: transparent;
            `}

        ${(p) =>
            p.variant === "ghost" &&
            css`
                background: transparent;
            `}

    ${(p) =>
            p.variant === "danger" &&
            css`
                background: hsl(0 84% 60%);
                color: #fff;
                border-color: transparent;
            `}
    `,

    Card: styled.div`
        max-width: 1440px;
        margin: 0 auto;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
        padding: var(--space-4);
        overflow: auto; /* allow sticky header to work within */
    `,

    /* ---------------- Filter Bar ---------------- */
    FilterBar: styled.div`
        max-width: 1440px;
        margin: 0 auto var(--space-3);
        display: grid;
        grid-template-columns: 1fr auto auto auto auto;
        gap: 8px;
        align-items: center;

        @media (max-width: 900px) {
            grid-template-columns: 1fr 1fr;
            row-gap: 10px;
            & > * {
                min-width: 0;
            }
        }
    `,

    /* Reusable form controls */
    Control: styled.input`
        height: 40px;
        padding: 0 10px;
        border: 1px solid var(--border);
        background: var(--surface);
        color: var(--text);
        border-radius: var(--radius-sm);

        &:focus-visible {
            outline: none;
            box-shadow: var(--focus-ring);
        }
    `,

    Select: styled.select`
        height: 40px;
        padding: 0 10px;
        border: 1px solid var(--border);
        background: var(--surface);
        color: var(--text);
        border-radius: var(--radius-sm);
        min-width: 160px;

        &:focus-visible {
            outline: none;
            box-shadow: var(--focus-ring);
        }
    `,

    SmallMeta: styled.span`
        color: var(--text-muted);
        font-size: 13px;
        white-space: nowrap;
    `,

    /* ---------------- Table ---------------- */
    Table: styled.table`
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;

        thead th {
            position: sticky;
            top: 0;
            z-index: 2;
            background: var(--card);
            box-shadow: 0 1px 0 var(--border);
            font-weight: 600;
            text-align: left;
            color: var(--text);
            padding: 10px 12px;
            border-bottom: 1px solid var(--border);
        }

        tbody td {
            padding: 10px 12px;
            color: var(--text);
            border-bottom: 1px solid var(--border);
        }

        tbody tr:hover {
            background: var(--surface);
        }

        tfoot th,
        tfoot td {
            padding: 12px;
            background: var(--surface);
            border-top: 2px solid var(--border);
            font-weight: 600;
        }

        tfoot th {
            text-align: right;
        }
    `,

    /* Sort button used inside table headers */
    SortButton: styled.button`
        background: transparent;
        border: 0;
        padding: 0;
        cursor: pointer;
        font: inherit;
        color: inherit;
        display: inline-flex;
        align-items: center;
        gap: 4px;

        &:hover {
            text-decoration: underline;
        }
    `,

    Empty: styled.div`
        padding: var(--space-8);
        text-align: center;
        color: var(--text-muted);
        border: 2px dashed var(--border);
        border-radius: var(--radius-sm);
    `,

    /* ----- Modal form controls (used in New Transaction) ----- */
    Form: styled.form`
        display: grid;
        gap: 14px;
    `,

    Row2: styled.div`
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;

        @media (max-width: 600px) {
            grid-template-columns: 1fr;
        }
    `,

    Field: styled.label`
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-size: 14px;
        color: var(--text);
    `,

    Textarea: styled.textarea`
        min-height: 84px;
        padding: 10px;
        border: 1px solid var(--border);
        background: var(--surface);
        color: var(--text);
        border-radius: var(--radius-sm);
        resize: vertical;

        &:focus-visible {
            outline: none;
            box-shadow: var(--focus-ring);
        }
    `,

    Error: styled.div`
        color: #b91c1c;
        background: hsl(0 84% 96%);
        border: 1px solid hsl(0 84% 86%);
        border-radius: var(--radius-sm);
        padding: 10px 12px;
        font-size: 14px;
    `,
};
