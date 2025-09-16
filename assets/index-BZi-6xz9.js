import{d as s,l as C,r as i,j as e}from"./index-Dc1G47kE.js";import{M as w}from"./index-C8kpoQ0F.js";import{g as I,a as S,s as z}from"./local-_-uFRhSF.js";const ee=(...c)=>({shouldForwardProp:l=>!c.includes(l)}),n={Page:s.div`
        min-height: 100dvh;
        background: var(--bg);
        color: var(--text);
        padding: var(--space-6) var(--space-4);
    `,HeaderBar:s.header`
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        margin: 0 auto var(--space-6);
        max-width: 1440px;
    `,Title:s.h1`
        font-size: 28px;
        line-height: 1.2;
        margin: 0;
        letter-spacing: -0.01em;
    `,Subtitle:s.p`
        margin: 4px 0 0;
        color: var(--text-muted);
    `,Actions:s.div`
        display: flex;
        gap: var(--space-3);
        flex-wrap: wrap;
    `,Button:s.button.withConfig(ee("variant"))`
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

        ${c=>c.variant==="primary"&&C`
                background: var(--primary);
                color: var(--primary-contrast);
                border-color: transparent;
            `}

        ${c=>c.variant==="ghost"&&C`
                background: transparent;
            `}

    ${c=>c.variant==="danger"&&C`
                background: hsl(0 84% 60%);
                color: #fff;
                border-color: transparent;
            `}
    `,Card:s.div`
        max-width: 1440px;
        margin: 0 auto;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
        padding: var(--space-4);
    `,Table:s.table`
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
    `,Empty:s.div`
        padding: var(--space-8);
        text-align: center;
        color: var(--text-muted);
        border: 2px dashed var(--border);
        border-radius: var(--radius-sm);
    `,Form:s.form`
        display: grid;
        gap: var(--space-4);
    `,Row2:s.div`
        display: grid;
        gap: var(--space-4);
        grid-template-columns: repeat(2, minmax(0, 1fr));
        @media (max-width: 720px) {
            grid-template-columns: 1fr;
        }
    `,Field:s.label`
        display: grid;
        gap: 8px;
        font-weight: 500;
    `,Control:s.input`
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
    `,Select:s.select`
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
    `,Textarea:s.textarea`
        min-height: 80px;
        padding: 10px 12px;
        border: 1px solid var(--border);
        background: var(--card);
        color: var(--text);
        border-radius: var(--radius-sm);
        resize: vertical;
        &:focus-visible {
            outline: none;
            box-shadow: var(--focus-ring);
        }
    `,Error:s.div`
        color: hsl(0 84% 60%);
        font-size: 14px;
    `},te=()=>new Date().toISOString().slice(0,7),P=()=>new Date().toISOString().slice(0,10);function oe(){var T;const[c,l]=i.useState(0),[R,v]=i.useState(!1),[g,j]=i.useState(!1),[$,k]=i.useState(!1),[a,B]=i.useState(null),[o,b]=i.useState({date:P(),type:"expense",amount:"",accountId:"",envelopeId:"",note:""}),[D,p]=i.useState(""),m=te(),H=i.useMemo(()=>I(),[c]),{transactions:E=[],accounts:h=[],envelopes:u=[],settings:G={}}=H,{currency:U="INR",locale:V="en-IN"}=G;i.useEffect(()=>{g&&b(t=>{var r,d;return{...t,accountId:t.accountId||((r=h[0])==null?void 0:r.id)||"",envelopeId:t.envelopeId||((d=u[0])==null?void 0:d.id)||""}})},[g,h,u]);const F=t=>new Intl.NumberFormat(V,{style:"currency",currency:U,maximumFractionDigits:0}).format(t||0),q=i.useMemo(()=>Object.fromEntries(h.map(t=>[t.id,t.name])),[h]),J=i.useMemo(()=>Object.fromEntries(u.map(t=>[t.id,t.name])),[u]),N=i.useMemo(()=>[...E].filter(t=>(t.date||"").slice(0,7)===m).sort((t,r)=>(r.date||"").localeCompare(t.date||"")),[E,m]),K=()=>{S({amount:1200,type:"income",note:"Demo income"}),l(t=>t+1)},L=()=>{S({amount:-250,type:"expense",note:"Demo expense"}),l(t=>t+1)},Q=t=>{const r=I();r.transactions=r.transactions.filter(d=>d.id!==t),z(r),l(d=>d+1)},W=()=>v(!0),M=()=>v(!1),X=()=>{const t=I();t.transactions=t.transactions.filter(r=>(r.date||"").slice(0,7)!==m),z(t),l(r=>r+1),v(!1)},Y=()=>{var t,r;b({date:P(),type:"expense",amount:"",accountId:((t=h[0])==null?void 0:t.id)||"",envelopeId:((r=u[0])==null?void 0:r.id)||"",note:""}),p(""),j(!0)},A=()=>j(!1),x=t=>{const{name:r,value:d}=t.target;b(y=>({...y,[r]:d}))},O=()=>{var d;p("");const t=Number(o.amount);if(!o.date)return p("Please choose a date.");if(!o.type)return p("Please select type.");if(!t||Number.isNaN(t)||t<=0)return p("Enter a positive amount.");if(!o.accountId)return p("Select an account.");const r=o.type==="expense"?-Math.abs(t):Math.abs(t);S({date:o.date,type:o.type,amount:r,accountId:o.accountId,envelopeId:o.envelopeId||null,note:(d=o.note)==null?void 0:d.trim()}),l(y=>y+1),j(!1)},Z=t=>{B(t),k(!0)},f=()=>{k(!1),B(null)},_=()=>{a!=null&&a.id&&Q(a.id),f()};return e.jsxs(n.Page,{children:[e.jsxs(n.HeaderBar,{children:[e.jsx("div",{children:e.jsx(n.Title,{children:"Transactions"})}),e.jsxs(n.Actions,{children:[e.jsx(n.Button,{variant:"primary",onClick:Y,children:"New Transaction"}),e.jsx(n.Button,{variant:"ghost",onClick:K,children:"+ Add ₹1,200 Income"}),e.jsx(n.Button,{variant:"ghost",onClick:L,children:"+ Add -₹250 Expense"}),e.jsx(n.Button,{onClick:W,children:"Clear This Month"})]})]}),e.jsx(n.Card,{children:N.length===0?e.jsxs(n.Empty,{children:["No transactions for ",m,". Use the buttons above to add some."]}):e.jsxs(n.Table,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:120},children:"Date"}),e.jsx("th",{style:{width:120},children:"Type"}),e.jsx("th",{children:"Account"}),e.jsx("th",{children:"Envelope"}),e.jsx("th",{style:{width:140,textAlign:"right"},children:"Amount"}),e.jsx("th",{style:{width:80}})]})}),e.jsx("tbody",{children:N.map(t=>{var r;return e.jsxs("tr",{children:[e.jsx("td",{children:((r=t.date)==null?void 0:r.slice(0,10))||"-"}),e.jsx("td",{children:t.type||(t.amount>=0?"income":"expense")}),e.jsx("td",{children:q[t.accountId]||"—"}),e.jsx("td",{children:J[t.envelopeId]||"—"}),e.jsx("td",{style:{textAlign:"right",color:(t.amount||0)<0?"crimson":"seagreen"},children:F(Math.abs(t.amount||0))}),e.jsx("td",{children:e.jsx(n.Button,{variant:"ghost",onClick:()=>Z(t),children:"Delete"})})]},t.id)})})]})}),e.jsx(w,{open:R,onClose:M,title:`Clear transactions for ${m}?`,actions:e.jsxs(e.Fragment,{children:[e.jsx(n.Button,{variant:"ghost",onClick:M,children:"Cancel"}),e.jsx(n.Button,{variant:"danger",onClick:X,children:"Clear"})]}),children:e.jsx("p",{children:"This action can’t be undone."})}),e.jsx(w,{open:$,onClose:f,title:"Delete this transaction?",actions:e.jsxs(e.Fragment,{children:[e.jsx(n.Button,{variant:"ghost",onClick:f,children:"Cancel"}),e.jsx(n.Button,{variant:"danger",onClick:_,children:"Delete"})]}),children:e.jsxs("div",{style:{lineHeight:1.6},children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Date:"})," ",((T=a==null?void 0:a.date)==null?void 0:T.slice(0,10))||"-"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Type:"})," ",(a==null?void 0:a.type)||((a==null?void 0:a.amount)>=0?"income":"expense")]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Amount:"})," ",((a==null?void 0:a.amount)??0)<0?"-":"",F(Math.abs((a==null?void 0:a.amount)??0))]}),a!=null&&a.note?e.jsxs("div",{children:[e.jsx("strong",{children:"Note:"})," ",a.note]}):null]})}),e.jsx(w,{open:g,onClose:A,title:"New Transaction",actions:e.jsxs(e.Fragment,{children:[e.jsx(n.Button,{variant:"ghost",onClick:A,children:"Cancel"}),e.jsx(n.Button,{variant:"primary",onClick:O,children:"Save"})]}),children:e.jsxs(n.Form,{onSubmit:t=>{t.preventDefault(),O()},children:[D&&e.jsx(n.Error,{children:D}),e.jsxs(n.Row2,{children:[e.jsxs(n.Field,{children:["Date",e.jsx(n.Control,{type:"date",name:"date",value:o.date,onChange:x})]}),e.jsxs(n.Field,{children:["Type",e.jsxs(n.Select,{name:"type",value:o.type,onChange:x,children:[e.jsx("option",{value:"expense",children:"Expense (-)"}),e.jsx("option",{value:"income",children:"Income (+)"})]})]})]}),e.jsxs(n.Row2,{children:[e.jsxs(n.Field,{children:["Amount",e.jsx(n.Control,{type:"number",step:"0.01",inputMode:"decimal",name:"amount",value:o.amount,onChange:x,placeholder:"e.g., 250"})]}),e.jsxs(n.Field,{children:["Account",e.jsx(n.Select,{name:"accountId",value:o.accountId,onChange:x,children:h.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))})]})]}),e.jsxs(n.Field,{children:["Envelope (optional)",e.jsxs(n.Select,{name:"envelopeId",value:o.envelopeId,onChange:x,children:[e.jsx("option",{value:"",children:"— None —"}),u.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]})]}),e.jsxs(n.Field,{children:["Note (optional)",e.jsx(n.Textarea,{name:"note",value:o.note,onChange:x,placeholder:"e.g., Groceries at Big Bazaar"})]})]})})]})}export{oe as default};
