import{d as a,l as g,r as c,j as e}from"./index-Dc1G47kE.js";import{M as F}from"./index-C8kpoQ0F.js";import{g as A,b as H,s as P}from"./local-_-uFRhSF.js";const $=(...o)=>({shouldForwardProp:l=>!o.includes(l)}),r={Page:a.div`
        min-height: 100dvh;
        background: var(--bg);
        color: var(--text);
        padding: var(--space-6) var(--space-4);
    `,HeaderBar:a.header`
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        margin: 0 auto var(--space-6);
        max-width: 1440px;
    `,Title:a.h1`
        font-size: 28px;
        line-height: 1.2;
        margin: 0;
        letter-spacing: -0.01em;
    `,Subtitle:a.p`
        margin: 4px 0 0;
        color: var(--text-muted);
    `,Actions:a.div`
        display: flex;
        gap: var(--space-3);
        flex-wrap: wrap;
    `,Button:a.button.withConfig($("variant"))`
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

        ${o=>o.variant==="primary"&&g`
                background: var(--primary);
                color: var(--primary-contrast);
                border-color: transparent;
            `}

        ${o=>o.variant==="ghost"&&g`
                background: transparent;
            `}

    ${o=>o.variant==="danger"&&g`
                background: hsl(0 84% 60%);
                color: #fff;
                border-color: transparent;
            `}
    `,Card:a.div`
        max-width: 1440px;
        margin: 0 auto;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
        padding: var(--space-4);
    `,Table:a.table`
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
        }

        tbody tr:hover {
            background: var(--surface);
        }
    `,Empty:a.div`
        padding: var(--space-8);
        text-align: center;
        color: var(--text-muted);
        border: 2px dashed var(--border);
        border-radius: var(--radius-sm);
    `,Form:a.form`
        display: grid;
        gap: var(--space-4);
    `,Row2:a.div`
        display: grid;
        gap: var(--space-4);
        grid-template-columns: repeat(2, minmax(0, 1fr));
        @media (max-width: 720px) {
            grid-template-columns: 1fr;
        }
    `,Field:a.label`
        display: grid;
        gap: 8px;
        font-weight: 500;
    `,Control:a.input`
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
    `,Select:a.select`
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
    `,Error:a.div`
        color: hsl(0 84% 60%);
        font-size: 14px;
    `};function J(){const[o,l]=c.useState(0),N=c.useMemo(()=>A(),[o]),{accounts:v=[],transactions:b=[],settings:D={}}=N,{currency:T="INR",locale:E="en-IN"}=D,f=t=>new Intl.NumberFormat(E,{style:"currency",currency:T,maximumFractionDigits:0}).format(t||0),j=c.useMemo(()=>{const t=new Map;for(const n of b)n.accountId&&t.set(n.accountId,(t.get(n.accountId)||0)+(n.amount||0));return v.map(n=>{const s=t.get(n.id)||0,m=(n.openingBalance||0)+s;return{...n,current:m}})},[v,b]),[I,p]=c.useState(!1),[d,y]=c.useState({name:"",type:"cash",openingBalance:""}),[w,h]=c.useState(""),M=()=>{y({name:"",type:"cash",openingBalance:""}),h(""),p(!0)},C=()=>p(!1),k=()=>{if(h(""),!d.name.trim())return h("Enter account name.");const t=Number(d.openingBalance)||0;H({name:d.name.trim(),type:d.type,openingBalance:t}),p(!1),l(n=>n+1)},u=t=>{const{name:n,value:s}=t.target;y(m=>({...m,[n]:s}))},[O,B]=c.useState(!1),[i,S]=c.useState(null),z=t=>{S(t),B(!0)},x=()=>{S(null),B(!1)},R=()=>{const t=A();if(t.transactions.some(s=>s.accountId===i.id)){alert("This account has transactions. Clear them first or move them to another account.");return}t.accounts=t.accounts.filter(s=>s.id!==i.id),P(t),l(s=>s+1),x()};return e.jsxs(r.Page,{children:[e.jsxs(r.HeaderBar,{children:[e.jsxs("div",{children:[e.jsx(r.Title,{children:"Accounts"}),e.jsx(r.Subtitle,{children:"Manage your cash/bank/credit accounts"})]}),e.jsx(r.Actions,{children:e.jsx(r.Button,{variant:"primary",onClick:M,children:"New Account"})})]}),e.jsx(r.Card,{children:j.length===0?e.jsx(r.Empty,{children:"No accounts yet. Create your first account."}):e.jsxs(r.Table,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Name"}),e.jsx("th",{style:{width:140},children:"Type"}),e.jsx("th",{style:{width:160,textAlign:"right"},children:"Opening"}),e.jsx("th",{style:{width:160,textAlign:"right"},children:"Current"}),e.jsx("th",{style:{width:100}})]})}),e.jsx("tbody",{children:j.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:t.name}),e.jsx("td",{style:{textTransform:"capitalize"},children:t.type}),e.jsx("td",{style:{textAlign:"right"},children:f(t.openingBalance||0)}),e.jsx("td",{style:{textAlign:"right"},children:f(t.current||0)}),e.jsx("td",{children:e.jsx(r.Button,{variant:"ghost",onClick:()=>z(t),children:"Delete"})})]},t.id))})]})}),e.jsx(F,{open:I,onClose:C,title:"New Account",actions:e.jsxs(e.Fragment,{children:[e.jsx(r.Button,{variant:"ghost",onClick:C,children:"Cancel"}),e.jsx(r.Button,{variant:"primary",onClick:k,children:"Save"})]}),children:e.jsxs(r.Form,{onSubmit:t=>{t.preventDefault(),k()},children:[w&&e.jsx(r.Error,{children:w}),e.jsxs(r.Field,{children:["Name",e.jsx(r.Control,{name:"name",value:d.name,onChange:u,placeholder:"e.g., HDFC Bank"})]}),e.jsxs(r.Row2,{children:[e.jsxs(r.Field,{children:["Type",e.jsxs(r.Select,{name:"type",value:d.type,onChange:u,children:[e.jsx("option",{value:"cash",children:"Cash"}),e.jsx("option",{value:"bank",children:"Bank"}),e.jsx("option",{value:"credit",children:"Credit"})]})]}),e.jsxs(r.Field,{children:["Opening Balance",e.jsx(r.Control,{type:"number",inputMode:"decimal",step:"0.01",name:"openingBalance",value:d.openingBalance,onChange:u,placeholder:"0"})]})]})]})}),e.jsxs(F,{open:O,onClose:x,title:"Delete this account?",actions:e.jsxs(e.Fragment,{children:[e.jsx(r.Button,{variant:"ghost",onClick:x,children:"Cancel"}),e.jsx(r.Button,{variant:"danger",onClick:R,children:"Delete"})]}),children:[e.jsxs("p",{children:[e.jsx("strong",{children:i==null?void 0:i.name})," (",i==null?void 0:i.type,") will be removed."]}),e.jsx("p",{className:"muted",children:"If this account has transactions, delete/move them first."})]})]})}export{J as default};
