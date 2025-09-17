// src/pages/envelopes/styled.js
import styled, { css } from "styled-components";

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
    `,

    Table: styled.table`
        width: 100%;
        border-collapse: collapse;

        thead th {
            font-weight: 600;
            text-align: left;
            color: var(--text);
            border-bottom: 1px solid var(--border);
            padding: 10px 12px;
            position: sticky;
            top: 0;
            background: var(--card);
            z-index: 1;
        }

        tbody td {
            border-bottom: 1px solid var(--border);
            padding: 10px 12px;
            color: var(--text);
            vertical-align: middle;
        }

        tbody tr:hover {
            background: var(--surface);
        }
    `,

    Empty: styled.div`
        padding: var(--space-8);
        text-align: center;
        color: var(--text-muted);
        border: 2px dashed var(--border);
        border-radius: var(--radius-sm);
    `,

    ColorDot: styled.span`
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid var(--border);
        background: ${(p) => p.color || "#9aa0a6"};
        margin-right: 8px;
        vertical-align: -2px;
    `,

    /* ---------- Form controls ---------- */
    Form: styled.form`
        display: grid;
        gap: var(--space-4);
    `,

    Row2: styled.div`
        display: grid;
        gap: var(--space-4);
        grid-template-columns: repeat(2, minmax(0, 1fr));
        @media (max-width: 720px) {
            grid-template-columns: 1fr;
        }
    `,

    Field: styled.label`
        display: grid;
        gap: 8px;
        font-weight: 500;
    `,

    Control: styled.input`
        height: 40px;
        padding: 0 12px;
        border: 1px solid var(--border);
        background: var(--card);
        color: var(--text);
        border-radius: var(--radius-sm);
        &:focus-visible {
            outline: none;
            box-shadow: var(--focus-ring);
        }
    `,

    Select: styled.select`
        height: 40px;
        padding: 0 12px;
        border: 1px solid var(--border);
        background: var(--card);
        color: var(--text);
        border-radius: var(--radius-sm);
        &:focus-visible {
            outline: none;
            box-shadow: var(--focus-ring);
        }
    `,

    CheckboxRow: styled.label`
        display: inline-flex;
        align-items: center;
        gap: 10px;
        user-select: none;

        input[type="checkbox"] {
            width: 18px;
            height: 18px;
            accent-color: var(--primary);
        }
    `,

    Error: styled.div`
        color: hsl(0 84% 60%);
        font-size: 14px;
    `,
};
