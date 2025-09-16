import{d as n,r as c,j as o}from"./index-Dc1G47kE.js";const i={Scrim:n.div`
        position: fixed;
        inset: 0;
        background: hsl(0 0% 0% / 0.55);
        display: grid;
        place-items: center;
        padding: 24px;
        z-index: 130;
    `,Card:n.div`
        width: min(100%, 560px);
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-md);
        outline: none;

        &[data-size="sm"] {
            width: min(100%, 420px);
        }
        &[data-size="lg"] {
            width: min(100%, 720px);
        }
    `,Header:n.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-4) var(--space-6) var(--space-3);
        border-bottom: 1px solid var(--border);
    `,Title:n.h3`
        margin: 0;
        font-size: 20px;
        line-height: 1.25;
    `,Close:n.button`
        border: 1px solid var(--border);
        background: var(--surface);
        color: var(--text);
        border-radius: var(--radius-sm);
        width: 32px;
        height: 32px;
        line-height: 1;
        font-size: 20px;
        display: grid;
        place-items: center;
        cursor: pointer;
        &:focus-visible {
            box-shadow: var(--focus-ring);
            outline: none;
        }
    `,Body:n.div`
        padding: var(--space-6);
        color: var(--text);
    `,Footer:n.div`
        padding: var(--space-4) var(--space-6);
        border-top: 1px solid var(--border);
        display: flex;
        gap: var(--space-3);
        justify-content: flex-end;
    `},j='a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';function C({open:f,onClose:p,title:k,children:E,actions:x,size:S="md",closeOnOverlay:z=!0,hideClose:q=!1,autoFocus:b=!1,initialFocus:s=null}){const v=c.useRef(null),r=c.useRef(p),m=c.useId();if(c.useEffect(()=>{r.current=p},[p]),c.useEffect(()=>{var y;if(!f)return;const d=e=>{var t;if(e.key==="Escape"){(t=r.current)==null||t.call(r);return}if(e.key==="Tab"){const a=v.current;if(!a)return;const u=a.querySelectorAll(j);if(!u.length||!a.contains(document.activeElement))return;const h=u[0],g=u[u.length-1],w=document.activeElement;!e.shiftKey&&w===g?(e.preventDefault(),h.focus()):e.shiftKey&&w===h&&(e.preventDefault(),g.focus())}};document.addEventListener("keydown",d);const l=document.body.style.overflow;if(document.body.style.overflow="hidden",b){const e=v.current;let t=null;if(typeof s=="string"?t=e==null?void 0:e.querySelector(s):s&&s.current&&(t=s.current),t||(t=e==null?void 0:e.querySelector("[data-autofocus]")),!t){const a=e==null?void 0:e.querySelector("[data-modal-body]");t=(a==null?void 0:a.querySelector(`${j}:not([aria-label="Close"])`))||null}(y=t||e)==null||y.focus()}return()=>{document.removeEventListener("keydown",d),document.body.style.overflow=l}},[f,b,s]),!f)return null;const T=d=>{var l;d.target===d.currentTarget&&z&&((l=r.current)==null||l.call(r))};return o.jsx(i.Scrim,{onClick:T,role:"dialog","aria-modal":"true","aria-labelledby":m,children:o.jsxs(i.Card,{ref:v,tabIndex:-1,"data-size":S,children:[o.jsxs(i.Header,{children:[o.jsx(i.Title,{id:m,children:k}),!q&&o.jsx(i.Close,{type:"button","aria-label":"Close",onClick:()=>{var d;return(d=r.current)==null?void 0:d.call(r)},children:"×"})]}),o.jsx(i.Body,{"data-modal-body":!0,children:E}),x&&o.jsx(i.Footer,{children:x})]})})}export{C as M};
