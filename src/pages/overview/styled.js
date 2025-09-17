// src/pages/overview/styled.js
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

    Grid: styled.div.withConfig(stop("columns"))`
        max-width: 1440px;
        margin: 0 auto var(--space-4);
        display: grid;
        gap: var(--space-4);
        grid-template-columns: repeat(${(p) => p.columns || 1}, minmax(0, 1fr));

        @media (max-width: 900px) {
            grid-template-columns: 1fr;
        }
    `,

    Card: styled.div.withConfig(stop("tall"))`
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
        padding: var(--space-4);
        overflow: auto; /* enables sticky table headers inside */

        ${(p) =>
            p.tall &&
            css`
                min-height: 320px;
            `}
    `,

    CardHeader: styled.h3`
        margin: 0 0 var(--space-3);
        font-size: 16px;
        font-weight: 600;
        color: var(--text);
    `,

    CardLabel: styled.div`
        font-size: 12px;
        color: var(--text-muted);
        margin-bottom: 6px;
    `,

    CardValue: styled.div`
        font-size: 24px;
        font-weight: 700;
        letter-spacing: -0.01em;
        color: var(--text);

        &[data-negative="true"] {
            color: hsl(0 84% 60%);
        }
    `,

    Placeholder: styled.div`
        display: grid;
        place-items: center;
        height: 260px;
        border: 2px dashed var(--border);
        border-radius: var(--radius-sm);
        color: var(--text-muted);
    `,

    RecentList: styled.ul`
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 8px;

        li {
            display: grid;
            grid-template-columns: 100px 1fr 200px 160px;
            align-items: center;
            gap: 12px;
            padding: 8px 10px;
            border-bottom: 1px solid var(--border);
        }

        .date {
            color: var(--text-muted);
            font-variant-numeric: tabular-nums;
        }

        .note {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .meta {
            color: var(--text-muted);
            text-align: left;
        }

        .amt {
            text-align: right;
            font-variant-numeric: tabular-nums;
        }

        .amt[data-negative="true"] {
            color: hsl(0 84% 60%);
        }

        @media (max-width: 900px) {
            li {
                grid-template-columns: 90px 1fr 120px;
            }
            .meta {
                display: none;
            }
        }
    `,

    /* Optional table styling for any Overview tables (sticky thead + styled tfoot) */
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
};
