import{d as p,l as X,r as i,j as e,y}from"./index-B23lBr8y.js";import{M as Z}from"./index-DD52ZInR.js";import{g as P,a as ee,s as q}from"./local-EGMl4JfI.js";const Te=(...a)=>({shouldForwardProp:c=>!a.includes(c)}),r={Page:p.div`
        min-height: 100dvh;
        background: var(--bg);
        color: var(--text);
        padding: var(--space-6) var(--space-4);
    `,HeaderBar:p.header`
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        margin: 0 auto var(--space-6);
        max-width: 1440px;
    `,Title:p.h1`
        font-size: 28px;
        line-height: 1.2;
        margin: 0;
        letter-spacing: -0.01em;
    `,Subtitle:p.p`
        margin: 4px 0 0;
        color: var(--text-muted);
    `,Actions:p.div`
        display: flex;
        gap: var(--space-3);
        flex-wrap: wrap;
    `,Button:p.button.withConfig(Te("variant"))`
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

        ${a=>a.variant==="primary"&&X`
                background: var(--primary);
                color: var(--primary-contrast);
                border-color: transparent;
            `}

        ${a=>a.variant==="ghost"&&X`
                background: transparent;
            `}

    ${a=>a.variant==="danger"&&X`
                background: hsl(0 84% 60%);
                color: #fff;
                border-color: transparent;
            `}
    `,Card:p.div`
        max-width: 1440px;
        margin: 0 auto;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
        padding: var(--space-4);
        overflow: auto; /* allow sticky header to work within */
    `,FilterBar:p.div`
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
    `,Control:p.input`
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
    `,Select:p.select`
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
    `,SmallMeta:p.span`
        color: var(--text-muted);
        font-size: 13px;
        white-space: nowrap;
    `,Table:p.table`
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
    `,SortButton:p.button`
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
    `,Empty:p.div`
        padding: var(--space-8);
        text-align: center;
        color: var(--text-muted);
        border: 2px dashed var(--border);
        border-radius: var(--radius-sm);
    `,Form:p.form`
        display: grid;
        gap: 14px;
    `,Row2:p.div`
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;

        @media (max-width: 600px) {
            grid-template-columns: 1fr;
        }
    `,Field:p.label`
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-size: 14px;
        color: var(--text);
    `,Textarea:p.textarea`
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
    `,Error:p.div`
        color: #b91c1c;
        background: hsl(0 84% 96%);
        border: 1px solid hsl(0 84% 86%);
        border-radius: var(--radius-sm);
        padding: 10px 12px;
        font-size: 14px;
    `};function Le(a){if(a==null)return"";const c=String(a);return/[",\r\n]|^\s|\s$/.test(c)?`"${c.replace(/"/g,'""')}"`:c}function Ue(a){return a?(typeof a=="string"?a:new Date(a).toISOString()).slice(0,7):null}function Ye(a,c){const b=URL.createObjectURL(c),x=document.createElement("a");x.href=b,x.download=a,document.body.appendChild(x),x.click(),x.remove(),URL.revokeObjectURL(b)}const fe=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function ze(a){if(!a)return"";if(typeof a=="string"){const j=a.match(/^(\d{4})-(\d{2})-(\d{2})/);if(j){const k=Number(j[1]),S=Number(j[2]),l=Number(j[3]);if(k&&S>=1&&S<=12&&l)return`${fe[S-1]} ${l}, ${k}`}}const c=new Date(a);if(Number.isNaN(c.getTime()))return"";const b=c.getUTCFullYear(),x=c.getUTCMonth()+1,C=c.getUTCDate();return`${fe[x-1]} ${C}, ${b}`}function Pe(a,c={}){const{month:b=null,filename:x=null}=c,{transactions:C=[],accounts:j=[],envelopes:k=[]}=a,S=Object.fromEntries(j.map(u=>[u.id,u.name])),l=Object.fromEntries(k.map(u=>[u.id,u.name])),N=[["id","date","type","amount","account","envelope","note"]];for(const u of C)b&&Ue(u.date)!==b||N.push([u.id??"",ze(u.date),u.type??(Number(u.amount)>=0?"income":"expense"),String(u.amount??""),S[u.accountId]??"",l[u.envelopeId]??"",u.note??""]);const h=N.map(u=>u.map(Le).join(",")).join(`\r
`),O=new Blob([h],{type:"text/csv;charset=utf-8"}),T=x||`transactions-${b||"all"}.csv`;return Ye(T,O),{count:N.length-1,filename:T}}const te=a=>`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}`,Je=()=>te(new Date),Ke=()=>{const a=new Date;return`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`},He=a=>{if(typeof a=="string")return a.slice(0,7);const c=a instanceof Date?a:new Date(a);return te(c)},Ve=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],d={date:"date",type:"type",account:"account",envelope:"envelope",amount:"amount"},be={income:1,expense:2};function We(){var ve;const[a,c]=i.useState(0),[b,x]=i.useState(!1),[C,j]=i.useState(!1),[k,S]=i.useState(!1),[l,N]=i.useState(null),[h,O]=i.useState(Je()),T=t=>{const[n,o]=h.split("-").map(Number),s=new Date(n,o-1+t,1);O(te(s))},u=()=>T(-1),je=()=>T(1),[G,ne]=i.useState(""),[J,oe]=i.useState("all"),[K,re]=i.useState(""),[H,ae]=i.useState(""),[g,ye]=i.useState(d.date),[w,se]=i.useState("desc"),ie=i.useMemo(()=>P(),[a]),{transactions:V=[],accounts:M=[],envelopes:I=[],settings:Ce={}}=ie,{currency:Se="INR",locale:W="en-IN"}=Ce,L=i.useMemo(()=>{const t=new Date(`${h}-01T00:00:00`);return new Intl.DateTimeFormat(W||"en-IN",{month:"short",year:"numeric"}).format(t)},[h,W]),we=i.useMemo(()=>{const t=new Set;for(const o of V){const s=Number((o.date||"").slice(0,4));s&&t.add(s)}t.add(new Date().getFullYear());let n=Array.from(t).sort((o,s)=>o-s);if(n.length===0){const o=new Date().getFullYear();n=[o-1,o,o+1]}else{const o=n[0],s=n[n.length-1];n.includes(o-1)||n.unshift(o-1),n.includes(s+1)||n.push(s+1)}return n},[V]),U=i.useMemo(()=>He(new Date)===h?Ke():`${h}-15`,[h]),[m,_]=i.useState({date:U,type:"expense",amount:"",accountId:"",envelopeId:"",note:""}),[ce,D]=i.useState("");i.useEffect(()=>{C||_(t=>({...t,date:U}))},[U,C]),i.useEffect(()=>{C&&_(t=>{var n,o;return{...t,accountId:t.accountId||((n=M[0])==null?void 0:n.id)||"",envelopeId:t.envelopeId||((o=I[0])==null?void 0:o.id)||""}})},[C,M,I]);const F=t=>new Intl.NumberFormat(W,{style:"currency",currency:Se,maximumFractionDigits:0}).format(t||0),B=i.useMemo(()=>Object.fromEntries(M.map(t=>[t.id,t.name])),[M]),E=i.useMemo(()=>Object.fromEntries(I.map(t=>[t.id,t.name])),[I]),le=i.useMemo(()=>[...V].filter(t=>(t.date||"").slice(0,7)===h),[V,h]),de=i.useMemo(()=>{const t=G.trim().toLowerCase();return le.filter(n=>{var f;const o=Number(n.amount)||0,s=n.type||(o>=0?"income":"expense");return J!=="all"&&s!==J||K&&n.accountId!==K||H&&n.envelopeId!==H?!1:t?[n.note||"",B[n.accountId]||"",E[n.envelopeId]||"",((f=n.date)==null?void 0:f.slice(0,10))||"",String(Math.abs(o))].join(" ").toLowerCase().includes(t):!0})},[le,G,J,K,H,B,E]),$=i.useMemo(()=>{const t=[...de],n=w==="asc"?1:-1;return t.sort((o,s)=>{if(g===d.amount){const v=Math.abs(Number(o.amount)||0),f=Math.abs(Number(s.amount)||0);return(v-f)*n}if(g===d.date){const v=o.date||"",f=s.date||"";return v.localeCompare(f)*n}if(g===d.type){const v=o.type||((o.amount||0)>=0?"income":"expense"),f=s.type||((s.amount||0)>=0?"income":"expense");return(be[v]-be[f])*n}if(g===d.account){const v=B[o.accountId]||"",f=B[s.accountId]||"";return v.localeCompare(f)*n}if(g===d.envelope){const v=E[o.envelopeId]||"",f=E[s.envelopeId]||"";return v.localeCompare(f)*n}return 0}),t},[de,g,w,B,E]),A=i.useMemo(()=>{let t=0,n=0;for(const o of $){const s=Number(o.amount)||0;(o.type||(s>=0?"income":"expense"))==="income"?t+=Math.abs(s):n+=Math.abs(s)}return{income:t,expense:n,net:t-n}},[$]),ue=()=>U,Me=()=>{ee({date:ue(),amount:1200,type:"income",note:"Demo income"}),c(t=>t+1),y.success("Income added")},Ie=()=>{ee({date:ue(),amount:-250,type:"expense",note:"Demo expense"}),c(t=>t+1),y.success("Expense added")},ke=()=>{try{Pe(ie,{month:h,filename:`transactions-${h}.csv`}),y.success(`Exported CSV for ${L}`)}catch(t){console.error(t),y.error("Export failed")}},Ne=t=>{const n=P();n.transactions=n.transactions.filter(o=>o.id!==t),q(n),c(o=>o+1)},De=()=>x(!0),pe=()=>x(!1),Fe=()=>{const t=P(),n=t.transactions.filter(o=>(o.date||"").slice(0,7)===h);t.transactions=t.transactions.filter(o=>(o.date||"").slice(0,7)!==h),q(t),c(o=>o+1),x(!1),y(({closeToast:o})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("span",{children:["Cleared ",n.length," transaction",n.length===1?"":"s"," for ",L]}),n.length>0&&e.jsx("button",{onClick:()=>{const s=P();s.transactions=[...s.transactions,...n],q(s),c(v=>v+1),y.success("Restore complete"),o==null||o()},style:{marginLeft:8,border:0,background:"transparent",textDecoration:"underline",cursor:"pointer"},children:"Undo"})]}),{autoClose:5e3})},Be=()=>{var t,n;_({date:U,type:"expense",amount:"",accountId:((t=M[0])==null?void 0:t.id)||"",envelopeId:((n=I[0])==null?void 0:n.id)||"",note:""}),D(""),j(!0)},he=()=>j(!1),R=t=>{const{name:n,value:o}=t.target;_(s=>({...s,[n]:o}))},me=()=>{var o;D("");const t=Number(m.amount);if(!m.date)return D("Please choose a date.");if(!m.type)return D("Please select type.");if(!t||Number.isNaN(t)||t<=0)return D("Enter a positive amount.");if(!m.accountId)return D("Select an account.");const n=m.type==="expense"?-Math.abs(t):Math.abs(t);ee({date:m.date,type:m.type,amount:n,accountId:m.accountId,envelopeId:m.envelopeId||null,note:(o=m.note)==null?void 0:o.trim()}),c(s=>s+1),j(!1),y.success("Transaction saved")},Ee=t=>{N(t),S(!0)},Q=()=>{S(!1),N(null)},$e=()=>{const t=l;t!=null&&t.id&&(Ne(t.id),y(({closeToast:n})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("span",{children:"Deleted transaction"}),e.jsx("button",{onClick:()=>{const o=P();o.transactions=[...o.transactions,t],q(o),c(s=>s+1),y.success("Restored"),n==null||n()},style:{marginLeft:8,border:0,background:"transparent",textDecoration:"underline",cursor:"pointer"},children:"Undo"})]}),{autoClose:5e3})),Q()},xe=Number(h.slice(0,4)),ge=Number(h.slice(5,7)),Ae=t=>O(`${xe}-${String(t).padStart(2,"0")}`),Re=t=>O(`${t}-${String(ge).padStart(2,"0")}`),Y=t=>{g===t?se(n=>n==="asc"?"desc":"asc"):(ye(t),se(t===d.date?"desc":"asc"))},z=t=>g===t?w==="asc"?" ▲":" ▼":"",Oe=()=>{ne(""),oe("all"),re(""),ae(""),y.info("Filters cleared")};return e.jsxs(r.Page,{children:[e.jsxs(r.HeaderBar,{children:[e.jsxs("div",{children:[e.jsx(r.Title,{children:"Transactions"}),e.jsxs(r.Subtitle,{children:["Month — ",L]})]}),e.jsxs(r.Actions,{children:[e.jsxs("div",{className:"month-nav",style:{display:"inline-flex",gap:8,alignItems:"center",marginRight:12},children:[e.jsx(r.Button,{type:"button",variant:"ghost",onClick:u,"aria-label":"Previous month",children:"‹"}),e.jsxs("div",{style:{display:"inline-flex",gap:8},children:[e.jsx("select",{"aria-label":"Select month",value:ge,onChange:t=>Ae(Number(t.target.value)),style:{height:40,padding:"0 8px",border:"1px solid var(--border)",background:"var(--card)",color:"var(--text)",borderRadius:"var(--radius-sm)"},children:Ve.map((t,n)=>e.jsx("option",{value:n+1,children:t},t))}),e.jsx("select",{"aria-label":"Select year",value:xe,onChange:t=>Re(Number(t.target.value)),style:{height:40,padding:"0 8px",border:"1px solid var(--border)",background:"var(--card)",color:"var(--text)",borderRadius:"var(--radius-sm)",minWidth:88},children:we.map(t=>e.jsx("option",{value:t,children:t},t))})]}),e.jsx(r.Button,{type:"button",variant:"ghost",onClick:je,"aria-label":"Next month",children:"›"})]}),e.jsx(r.Button,{variant:"primary",onClick:Be,children:"New Transaction"}),e.jsx(r.Button,{onClick:ke,children:"Export CSV"}),e.jsx(r.Button,{variant:"ghost",onClick:Me,children:"+ Add ₹1,200 Income"}),e.jsx(r.Button,{variant:"ghost",onClick:Ie,children:"+ Add -₹250 Expense"}),e.jsx(r.Button,{onClick:De,children:"Clear This Month"})]})]}),e.jsxs(r.FilterBar,{children:[e.jsx(r.Control,{"aria-label":"Search",placeholder:"Search note, account, envelope, amount, date…",value:G,onChange:t=>ne(t.target.value)}),e.jsxs(r.Select,{"aria-label":"Filter by type",value:J,onChange:t=>oe(t.target.value),children:[e.jsx("option",{value:"all",children:"All types"}),e.jsx("option",{value:"income",children:"Income"}),e.jsx("option",{value:"expense",children:"Expense"})]}),e.jsxs(r.Select,{"aria-label":"Filter by account",value:K,onChange:t=>re(t.target.value),children:[e.jsx("option",{value:"",children:"All accounts"}),M.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]}),e.jsxs(r.Select,{"aria-label":"Filter by envelope",value:H,onChange:t=>ae(t.target.value),children:[e.jsx("option",{value:"",children:"All envelopes"}),I.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",justifyContent:"flex-end"},children:[e.jsxs(r.SmallMeta,{children:[$.length," result",$.length===1?"":"s"]}),e.jsx(r.Button,{type:"button",variant:"ghost",onClick:Oe,children:"Clear"})]})]}),e.jsx(r.Card,{children:$.length===0?e.jsxs(r.Empty,{children:["No transactions for ",L," (or none match filters)."]}):e.jsxs(r.Table,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:140},children:e.jsxs(r.SortButton,{type:"button",onClick:()=>Y(d.date),"aria-sort":g===d.date?w==="asc"?"ascending":"descending":"none",children:["Date",z(d.date)]})}),e.jsx("th",{style:{width:120},children:e.jsxs(r.SortButton,{type:"button",onClick:()=>Y(d.type),"aria-sort":g===d.type?w==="asc"?"ascending":"descending":"none",children:["Type",z(d.type)]})}),e.jsx("th",{children:e.jsxs(r.SortButton,{type:"button",onClick:()=>Y(d.account),"aria-sort":g===d.account?w==="asc"?"ascending":"descending":"none",children:["Account",z(d.account)]})}),e.jsx("th",{children:e.jsxs(r.SortButton,{type:"button",onClick:()=>Y(d.envelope),"aria-sort":g===d.envelope?w==="asc"?"ascending":"descending":"none",children:["Envelope",z(d.envelope)]})}),e.jsx("th",{style:{width:160,textAlign:"right"},children:e.jsxs(r.SortButton,{type:"button",onClick:()=>Y(d.amount),"aria-sort":g===d.amount?w==="asc"?"ascending":"descending":"none",children:["Amount",z(d.amount)]})}),e.jsx("th",{style:{width:80}})]})}),e.jsx("tbody",{children:$.map(t=>{var o;const n=t.type||((t.amount||0)>=0?"income":"expense");return e.jsxs("tr",{children:[e.jsx("td",{children:((o=t.date)==null?void 0:o.slice(0,10))||"-"}),e.jsx("td",{children:n}),e.jsx("td",{children:B[t.accountId]||"—"}),e.jsx("td",{children:E[t.envelopeId]||"—"}),e.jsx("td",{style:{textAlign:"right",color:(t.amount||0)<0?"crimson":"seagreen"},children:F(Math.abs(t.amount||0))}),e.jsx("td",{children:e.jsx(r.Button,{variant:"ghost",onClick:()=>Ee(t),children:"Delete"})})]},t.id)})}),e.jsxs("tfoot",{children:[e.jsxs("tr",{children:[e.jsx("th",{colSpan:4,style:{textAlign:"right",paddingRight:12},children:"Total Income"}),e.jsx("th",{style:{textAlign:"right"},children:F(A.income)}),e.jsx("th",{})]}),e.jsxs("tr",{children:[e.jsx("th",{colSpan:4,style:{textAlign:"right",paddingRight:12},children:"Total Expense"}),e.jsxs("th",{style:{textAlign:"right",color:"hsl(0 84% 60%)"},children:["-",F(A.expense)]}),e.jsx("th",{})]}),e.jsxs("tr",{children:[e.jsx("th",{colSpan:4,style:{textAlign:"right",paddingRight:12},children:"Net"}),e.jsx("th",{style:{textAlign:"right",color:A.net<0?"hsl(0 84% 60%)":"seagreen"},children:A.net<0?`-${F(Math.abs(A.net))}`:F(A.net)}),e.jsx("th",{})]})]})]})}),e.jsx(Z,{open:b,onClose:pe,title:`Clear transactions for ${L}?`,actions:e.jsxs(e.Fragment,{children:[e.jsx(r.Button,{variant:"ghost",onClick:pe,children:"Cancel"}),e.jsx(r.Button,{variant:"danger",onClick:Fe,children:"Clear"})]}),children:e.jsx("p",{children:"This action can’t be undone."})}),e.jsx(Z,{open:k,onClose:Q,title:"Delete this transaction?",actions:e.jsxs(e.Fragment,{children:[e.jsx(r.Button,{variant:"ghost",onClick:Q,children:"Cancel"}),e.jsx(r.Button,{variant:"danger",onClick:$e,children:"Delete"})]}),children:e.jsxs("div",{style:{lineHeight:1.6},children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Date:"})," ",((ve=l==null?void 0:l.date)==null?void 0:ve.slice(0,10))||"-"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Type:"})," ",(l==null?void 0:l.type)||((l==null?void 0:l.amount)>=0?"income":"expense")]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Amount:"})," ",((l==null?void 0:l.amount)??0)<0?"-":"",F(Math.abs((l==null?void 0:l.amount)??0))]}),l!=null&&l.note?e.jsxs("div",{children:[e.jsx("strong",{children:"Note:"})," ",l.note]}):null]})}),e.jsx(Z,{open:C,onClose:he,title:"New Transaction",actions:e.jsxs(e.Fragment,{children:[e.jsx(r.Button,{variant:"ghost",onClick:he,children:"Cancel"}),e.jsx(r.Button,{variant:"primary",onClick:me,children:"Save"})]}),children:e.jsxs(r.Form,{onSubmit:t=>{t.preventDefault(),me()},children:[ce&&e.jsx(r.Error,{children:ce}),e.jsxs(r.Row2,{children:[e.jsxs(r.Field,{children:["Date",e.jsx(r.Control,{type:"date",name:"date",value:m.date,onChange:R})]}),e.jsxs(r.Field,{children:["Type",e.jsxs(r.Select,{name:"type",value:m.type,onChange:R,children:[e.jsx("option",{value:"expense",children:"Expense (-)"}),e.jsx("option",{value:"income",children:"Income (+)"})]})]})]}),e.jsxs(r.Row2,{children:[e.jsxs(r.Field,{children:["Amount",e.jsx(r.Control,{type:"number",step:"0.01",inputMode:"decimal",name:"amount",value:m.amount,onChange:R,placeholder:"e.g., 250"})]}),e.jsxs(r.Field,{children:["Account",e.jsx(r.Select,{name:"accountId",value:m.accountId,onChange:R,children:M.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))})]})]}),e.jsxs(r.Field,{children:["Envelope (optional)",e.jsxs(r.Select,{name:"envelopeId",value:m.envelopeId,onChange:R,children:[e.jsx("option",{value:"",children:"— None —"}),I.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]})]}),e.jsxs(r.Field,{children:["Note (optional)",e.jsx(r.Textarea,{name:"note",value:m.note,onChange:R,placeholder:"e.g., Groceries at Big Bazaar"})]})]})})]})}export{We as default};
