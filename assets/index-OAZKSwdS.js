import{d as a,j as e,G as c,F as d,a as o,M as h,b as x,c as p,e as j,f as m}from"./index-TVLhC0zA.js";const g={Wrapper:a.div`
        padding: 24px;

        h1 {
            margin-bottom: 30px;
        }

        fieldset {
            padding: 15px;
            margin: 50px 0;
            border: 1px solid #333;

            legend {
                padding: 0 15px;
                font-size: 16px;
                color: #64493d;
            }
            .para {
                display: block;
                margin-bottom: 15px;
                max-width: 900px;
            }
            .points {
                margin-top: 30px;
                margin-bottom: 30px;

                ul.mainList {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 50px;
                    margin-left: 30px;
                    list-style: none;

                    li.listBlock {
                        /* border: 1px solid #f00; */
                        max-width: 45%;

                        .heading {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
    `},s=a.div`
    /* border-bottom: 1px solid #ccc; */
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: space-between;
    padding: 5px 15px;

    &:hover {
        background-color: #222;
        /* color: #000;
        a {
            color: #000;
        } */
    }
`,i=a.div`
    flex: 0 0 80px;
`,n=a.div`
    /* flex: 1 1 100%; */
    /* border: 1px solid #f00; */
    display: flex;
    align-items: center;
    gap: 15px;

    a {
        color: #aaa;
        overflow-wrap: anywhere;
        word-break: break-word;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
    .icon {
        /* border: 1px solid #f00; */
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`,f=({width:l=24,height:t=24})=>e.jsxs("svg",{width:l,height:t,viewBox:"0 0 3 2",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M0,0 H3 V2 H0 Z",fill:"#f93"}),e.jsx("path",{d:"M0,0.667 H3 V1.333 H0 Z",fill:"#fff"}),e.jsx("path",{d:"M0,1.333 H3 V2 H0 Z",fill:"#128807"}),e.jsx("circle",{cx:"1.5",cy:"1",r:"0.2",fill:"#008"})]});function r(l){return c({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4"},child:[]},{tag:"path",attr:{d:"M11.5 3a16.989 16.989 0 0 0 -1.826 4"},child:[]},{tag:"path",attr:{d:"M12.5 3a16.989 16.989 0 0 1 1.828 4"},child:[]},{tag:"path",attr:{d:"M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4"},child:[]},{tag:"path",attr:{d:"M11.5 21a16.989 16.989 0 0 1 -1.826 -4"},child:[]},{tag:"path",attr:{d:"M12.5 21a16.989 16.989 0 0 0 1.828 -4"},child:[]},{tag:"path",attr:{d:"M2 10l1 4l1.5 -4l1.5 4l1 -4"},child:[]},{tag:"path",attr:{d:"M17 10l1 4l1.5 -4l1.5 4l1 -4"},child:[]},{tag:"path",attr:{d:"M9.5 10l1 4l1.5 -4l1.5 4l1 -4"},child:[]}]})(l)}const w=()=>e.jsx(e.Fragment,{children:e.jsxs(g.Wrapper,{children:[e.jsx("h3",{children:"Personal Finance Dashboard - last updated: Sep 17, 2025"}),e.jsxs("fieldset",{children:[e.jsx("legend",{children:"About Project"}),e.jsx("div",{className:"para",children:"Personal Finance Dashboard is a fast, privacy-first budgeting app built with React + styled-components. Plan envelopes, track transactions, visualize spend, and import/export CSV-all offline, no backend, your data stays on your device."}),e.jsx("div",{className:"points",children:e.jsxs("ul",{className:"mainList",children:[e.jsxs("li",{className:"listBlock",children:[e.jsx("h2",{className:"heading",children:"What this is"}),e.jsxs("ul",{children:[e.jsx("li",{children:"A fast, frontend-only personal finance dashboard built with React + styled-components."}),e.jsx("li",{children:"Privacy-first: no backend; all data lives in your browser's localStorage."})]})]}),e.jsxs("li",{className:"listBlock",children:[e.jsx("h2",{className:"heading",children:"Core modules"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Overview: KPIs (Total Balance, Month Spend, Month Income, Net Cash Flow, Remaining Budget/Overspent) + charts."}),e.jsx("li",{children:"Transactions: add income/expense, view/filter/sort ledger, month navigation, totals, CSV export."})]})]}),e.jsxs("li",{className:"listBlock",children:[e.jsx("h2",{className:"heading",children:"Highlights"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Add transactions (account + optional envelope & note)."}),e.jsx("li",{children:"Delete with Undo and Clear month with Undo (react-toastify)."}),e.jsx("li",{children:"Search & filters: text search, type (income/expense), account, envelope."}),e.jsx("li",{children:"Column sorting: date / type / account / envelope / amount."}),e.jsx("li",{children:"Totals row: shows income, expense and net for current filters."}),e.jsx("li",{children:"Month navigation: prev/next + Month/Year selects (timezone-safe)."}),e.jsx("li",{children:"Charts: daily Income vs Expense (area), Top spending categories (bar)."}),e.jsx("li",{children:"Sticky table headers, responsive layout, keyboard-friendly modals."})]})]}),e.jsxs("li",{className:"listBlock",children:[e.jsx("h2",{className:"heading",children:"Data & logic"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Transactions use positive amounts for income and negative for expenses."}),e.jsx("li",{children:"KPIs are computed per selected month; Remaining Budget equals total envelope budgets minus monthly expense and can become Overspent."}),e.jsx("li",{children:"Everything is persisted to localStorage; refresh-safe and works offline."})]})]}),e.jsxs("li",{className:"listBlock",children:[e.jsx("h2",{className:"heading",children:"Tech stack"}),e.jsxs("ul",{children:[e.jsx("li",{children:"React 18, Vite, styled-components, React Router 6"}),e.jsx("li",{children:"Recharts (charts), react-toastify (toasts), react-icons (icons)"})]})]}),e.jsxs("li",{className:"listBlock",children:[e.jsx("h2",{className:"heading",children:"CSV"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Export transactions for the selected month (one click)."}),e.jsx("li",{children:"(Import planned in roadmap.)"})]})]}),e.jsxs("li",{className:"listBlock",children:[e.jsx("h2",{className:"heading",children:"Deployment"}),e.jsx("ul",{children:e.jsx("li",{children:"Optimized for GitHub Pages; router uses a base path for clean deep links."})})]}),e.jsxs("li",{className:"listBlock",children:[e.jsx("h2",{className:"heading",children:"Roadmap (next)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"CSV import with preview/mapping"}),e.jsx("li",{children:"Transfers and account balances timeline"}),e.jsx("li",{children:"Envelope funding & carryover options"}),e.jsx("li",{children:"Settings (currency/locale, theme), Backup/Restore JSON"}),e.jsx("li",{children:"Virtualized ledger for very large datasets"})]})]}),e.jsxs("li",{className:"listBlock",children:[e.jsx("h2",{className:"heading",children:"How to start"}),e.jsx("ul",{children:e.jsx("li",{children:"Pick a month, add a transaction, explore filters, review KPIs, and export CSV when needed."})})]})]})})]}),e.jsxs("fieldset",{children:[e.jsx("legend",{children:"About Developer"}),e.jsxs("div",{className:"aboutDeveloper",children:[e.jsxs(s,{children:[e.jsx(i,{children:"Name"}),e.jsxs(n,{children:["Ashish Ranjan",e.jsx("div",{className:"icon",children:e.jsx(d,{size:20})})]})]}),e.jsxs(s,{children:[e.jsx(i,{children:"Phone"}),e.jsxs(n,{children:[e.jsx("a",{href:"tel:+918123747965",children:"+91 8123747965"}),e.jsx("div",{className:"icon",children:e.jsx(o,{size:20})})]})]}),e.jsxs(s,{children:[e.jsx(i,{children:"Email"}),e.jsxs(n,{children:[e.jsx("a",{href:"mailto:ash.ranjan09@gmail.com",children:"ash.ranjan09@gmail.com"}),e.jsx("div",{className:"icon",children:e.jsx(h,{size:20})})]})]}),e.jsxs(s,{children:[e.jsx(i,{children:"Nationality"}),e.jsxs(n,{children:["The Republic of India",e.jsx("div",{className:"icon",children:e.jsx(f,{})})]})]}),e.jsxs(s,{children:[e.jsx(i,{children:"Website"}),e.jsxs(n,{children:[e.jsx("a",{href:"https://www.ashishranjan.net/",target:"_blank",rel:"noopener noreferrer",children:"https://www.ashishranjan.net/"}),e.jsx("div",{className:"icon",children:e.jsx(r,{size:20})})]})]}),e.jsxs(s,{children:[e.jsx(i,{children:"Old Website"}),e.jsxs(n,{children:[e.jsx("a",{href:"http://www.ashishranjan.in/",target:"_blank",rel:"noopener noreferrer",children:"http://www.ashishranjan.in/"}),e.jsx("div",{className:"icon",children:e.jsx(r,{size:20})})]})]}),e.jsxs(s,{children:[e.jsx(i,{children:"Facebook"}),e.jsxs(n,{children:[e.jsx("a",{href:"https://www.facebook.com/theash.ashish/",target:"_blank",rel:"noopener noreferrer",children:"https://www.facebook.com/theash.ashish/"}),e.jsx("div",{className:"icon",children:e.jsx(x,{size:20})})]})]}),e.jsxs(s,{children:[e.jsx(i,{children:"LinkedIn"}),e.jsxs(n,{children:[e.jsx("a",{href:"https://www.linkedin.com/in/aashishranjan/",target:"_blank",rel:"noopener noreferrer",children:"https://www.linkedin.com/in/aashishranjan/"}),e.jsx("div",{className:"icon",children:e.jsx(p,{size:20})})]})]}),e.jsxs(s,{children:[e.jsx(i,{children:"YouTube"}),e.jsxs(n,{children:[e.jsx("a",{href:"https://www.youtube.com/channel/UCLHIBQeFQIxmRveVAjLvlbQ",target:"_blank",rel:"noopener noreferrer",children:"https://www.youtube.com/channel/UCLHIBQeFQIxmRveVAjLvlbQ"}),e.jsx("div",{className:"icon",children:e.jsx(j,{size:20})})]})]}),e.jsxs(s,{children:[e.jsx(i,{children:"GitHub"}),e.jsxs(n,{children:[e.jsx("a",{href:"https://github.com/a2rp",target:"_blank",rel:"noopener noreferrer",children:"https://github.com/a2rp"}),e.jsx("div",{className:"icon",children:e.jsx(m,{size:20})})]})]})]})]})]})});export{w as default};
