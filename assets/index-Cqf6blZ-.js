import{d as a,l as A,r as d,j as e}from"./index-B23lBr8y.js";import{M as O}from"./index-DD52ZInR.js";import{g as x,s as y,c as Q}from"./local-EGMl4JfI.js";const X=(...i)=>({shouldForwardProp:h=>!i.includes(h)}),n={Page:a.div`
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
    `,Button:a.button.withConfig(X("variant"))`
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

        ${i=>i.variant==="primary"&&A`
                background: var(--primary);
                color: var(--primary-contrast);
                border-color: transparent;
            `}

        ${i=>i.variant==="ghost"&&A`
                background: transparent;
            `}

    ${i=>i.variant==="danger"&&A`
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
            vertical-align: middle;
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
    `,ColorDot:a.span`
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid var(--border);
        background: ${i=>i.color||"#9aa0a6"};
        margin-right: 8px;
        vertical-align: -2px;
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
    `,CheckboxRow:a.label`
        display: inline-flex;
        align-items: center;
        gap: 10px;
        user-select: none;

        input[type="checkbox"] {
            width: 18px;
            height: 18px;
            accent-color: var(--primary);
        }
    `,Error:a.div`
        color: hsl(0 84% 60%);
        font-size: 14px;
    `},Y=()=>new Date().toISOString().slice(0,7);function re(){const[i,h]=d.useState(0),g=Y(),T=d.useMemo(()=>x(),[i]),{envelopes:$=[],transactions:D=[],settings:z={}}=T,{currency:P="INR",locale:f="en-IN"}=z,c=t=>new Intl.NumberFormat(f,{style:"currency",currency:P,maximumFractionDigits:0}).format(t||0),N=d.useMemo(()=>{const t=new Date(`${g}-01T00:00:00`);return new Intl.DateTimeFormat(f||"en-IN",{month:"short",year:"numeric"}).format(t)},[g,f]),w=d.useMemo(()=>{const t=new Map;for(const r of D){if(!(r!=null&&r.date)||(r.date||"").slice(0,7)!==g)continue;const s=Number(r.amount)||0;if((r.type||(s>=0?"income":"expense"))!=="expense")continue;const j=r.envelopeId||"__uncat__";t.set(j,(t.get(j)||0)+Math.abs(s))}return t},[D,g]),u=$.map(t=>({...t,spent:w.get(t.id)||0,remaining:(Number(t.budget)||0)-(w.get(t.id)||0)})).sort((t,r)=>t.name.localeCompare(r.name)),m=u.reduce((t,r)=>t+(Number(r.budget)||0),0),v=u.reduce((t,r)=>t+(Number(r.spent)||0),0),B=w.get("__uncat__")||0,H=(t,r)=>{const s=x();s.envelopes=s.envelopes.map(o=>o.id===t?{...o,budget:Number(r)||0,updatedAt:new Date().toISOString()}:o),y(s),h(o=>o+1)},U=(t,r)=>{const s=x();s.envelopes=s.envelopes.map(o=>o.id===t?{...o,carryover:!!r,updatedAt:new Date().toISOString()}:o),y(s),h(o=>o+1)},G=(t,r)=>{const s=x();s.envelopes=s.envelopes.map(o=>o.id===t?{...o,color:r,updatedAt:new Date().toISOString()}:o),y(s),h(o=>o+1)},[L,C]=d.useState(!1),[l,E]=d.useState({name:"",color:"#7c9cff",budget:"",carryover:!0}),[F,k]=d.useState(""),V=()=>{E({name:"",color:"#7c9cff",budget:"",carryover:!0}),k(""),C(!0)},M=()=>C(!1),I=()=>{if(k(""),!l.name.trim())return k("Enter category name.");Q({name:l.name.trim(),color:l.color||"#9aa0a6",budget:Number(l.budget)||0,carryover:!!l.carryover}),C(!1),h(t=>t+1)},b=t=>{const{name:r,value:s,type:o,checked:j}=t.target;E(K=>({...K,[r]:o==="checkbox"?j:s}))},[W,R]=d.useState(!1),[p,_]=d.useState(null),q=t=>{_(t),R(!0)},S=()=>{_(null),R(!1)},J=()=>{const t=x();t.transactions=t.transactions.map(r=>r.envelopeId===p.id?{...r,envelopeId:null}:r),t.envelopes=t.envelopes.filter(r=>r.id!==p.id),y(t),h(r=>r+1),S()};return e.jsxs(n.Page,{children:[e.jsxs(n.HeaderBar,{children:[e.jsxs("div",{children:[e.jsx(n.Title,{children:"Envelopes"}),e.jsxs(n.Subtitle,{children:["Budgets — ",N]})]}),e.jsx(n.Actions,{children:e.jsx(n.Button,{variant:"primary",onClick:V,children:"New Envelope"})})]}),e.jsx(n.Card,{children:u.length===0?e.jsx(n.Empty,{children:"No envelopes yet. Create your first category."}):e.jsxs(n.Table,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Category"}),e.jsx("th",{style:{width:120},children:"Color"}),e.jsx("th",{style:{width:160,textAlign:"right"},children:"Budget"}),e.jsxs("th",{style:{width:200,textAlign:"right"},children:["Spent (",N,")"]}),e.jsx("th",{style:{width:160,textAlign:"right"},children:"Remaining"}),e.jsx("th",{style:{width:140},children:"Carryover"}),e.jsx("th",{style:{width:100}})]})}),e.jsxs("tbody",{children:[u.map(t=>e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx(n.ColorDot,{color:t.color}),t.name]}),e.jsx("td",{children:e.jsx(n.Control,{type:"color",value:t.color||"#9aa0a6",onChange:r=>G(t.id,r.target.value),title:"Pick color",style:{width:48,padding:0,height:32}})}),e.jsx("td",{style:{textAlign:"right"},children:e.jsx(n.Control,{type:"number",inputMode:"decimal",step:"0.01",value:t.budget??0,onChange:r=>H(t.id,r.target.value),style:{maxWidth:120,textAlign:"right"}})}),e.jsx("td",{style:{textAlign:"right"},children:c(t.spent)}),e.jsx("td",{style:{textAlign:"right",color:t.remaining<0?"hsl(0 84% 60%)":"inherit"},children:t.remaining<0?`-${c(Math.abs(t.remaining))}`:c(t.remaining)}),e.jsx("td",{children:e.jsxs(n.CheckboxRow,{title:"Carry leftover to next month",children:[e.jsx("input",{type:"checkbox",checked:!!t.carryover,onChange:r=>U(t.id,r.target.checked)}),"Carryover"]})}),e.jsx("td",{children:e.jsx(n.Button,{variant:"ghost",onClick:()=>q(t),children:"Delete"})})]},t.id)),B>0&&e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx(n.ColorDot,{color:"#9aa0a6"}),"Uncategorized"]}),e.jsx("td",{}),e.jsx("td",{style:{textAlign:"right"},children:"—"}),e.jsx("td",{style:{textAlign:"right"},children:c(B)}),e.jsx("td",{style:{textAlign:"right"},children:"—"}),e.jsx("td",{children:"—"}),e.jsx("td",{})]})]}),e.jsx("tfoot",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Total"}),e.jsx("th",{}),e.jsx("th",{style:{textAlign:"right"},children:c(m)}),e.jsx("th",{style:{textAlign:"right"},children:c(v)}),e.jsx("th",{style:{textAlign:"right"},children:m-v<0?`-${c(Math.abs(m-v))}`:c(m-v)}),e.jsx("th",{}),e.jsx("th",{})]})})]})}),e.jsx(O,{open:L,onClose:M,title:"New Envelope",actions:e.jsxs(e.Fragment,{children:[e.jsx(n.Button,{variant:"ghost",onClick:M,children:"Cancel"}),e.jsx(n.Button,{variant:"primary",onClick:I,children:"Save"})]}),children:e.jsxs(n.Form,{onSubmit:t=>{t.preventDefault(),I()},children:[F&&e.jsx(n.Error,{children:F}),e.jsxs(n.Field,{children:["Name",e.jsx(n.Control,{name:"name",value:l.name,onChange:b,placeholder:"e.g., Groceries"})]}),e.jsxs(n.Row2,{children:[e.jsxs(n.Field,{children:["Color",e.jsx(n.Control,{type:"color",name:"color",value:l.color,onChange:b,style:{width:64,height:40,padding:0}})]}),e.jsxs(n.Field,{children:["Monthly Budget",e.jsx(n.Control,{type:"number",inputMode:"decimal",step:"0.01",name:"budget",value:l.budget,onChange:b,placeholder:"0"})]})]}),e.jsxs(n.CheckboxRow,{children:[e.jsx("input",{type:"checkbox",name:"carryover",checked:!!l.carryover,onChange:b}),"Carry leftover to next month"]})]})}),e.jsx(O,{open:W,onClose:S,title:"Delete this envelope?",actions:e.jsxs(e.Fragment,{children:[e.jsx(n.Button,{variant:"ghost",onClick:S,children:"Cancel"}),e.jsx(n.Button,{variant:"danger",onClick:J,children:"Delete"})]}),children:e.jsxs("p",{children:[e.jsx("strong",{children:p==null?void 0:p.name})," will be removed. Any transactions in this category will become",e.jsx("em",{children:" Uncategorized"}),"."]})})]})}export{re as default};
