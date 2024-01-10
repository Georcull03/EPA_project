import{r as p,j as e,an as oe,m as f,k as h,n as Y,ao as ce,R as V,_ as x,g as T,b as X,q as le,a as ue,d as Z,e as ee,aa as de,ap as pe,C as _e,o as W,aq as me,E as L,ac as he,ar as fe,H as F,a9 as be,as as te,G as ve,W as we,A as ge,at as xe,au as ye,av as Ae,aw as Ce,B as Re,a8 as Ie,v as Ne,ad as ke,ax as Se,ai as Le,aj as Fe,ak as Pe,al as Be,ag as G,ah as U,af as J,ae as Oe,am as Te}from"./helpers.b39fb46c.js";function je(t,s){return t?e(oe,{mountContent:n=>t.mountContent(n,s),unmountContent:n=>t.unmountContent(n)},t.id+"-"+s.type):null}function qe(t){return function(n){const[r,o]=p.exports.useState([]),i=p.exports.useRef(null),a=p.exports.useRef(null);return p.exports.useEffect(()=>t(d=>{o(d.map(l=>je(l,{type:n,headerRef:i,contentRef:a})))}),[n]),{discoveredActions:r,headerRef:i,contentRef:a}}}const c={alert:"awsui_alert_mx3cw_19rpp_93","awsui-motion-fade-in":"awsui_awsui-motion-fade-in_mx3cw_19rpp_1",root:"awsui_root_mx3cw_19rpp_119",hidden:"awsui_hidden_mx3cw_19rpp_135","with-dismiss":"awsui_with-dismiss_mx3cw_19rpp_158","with-action":"awsui_with-action_mx3cw_19rpp_158","breakpoint-default":"awsui_breakpoint-default_mx3cw_19rpp_164",header:"awsui_header_mx3cw_19rpp_171",action:"awsui_action_mx3cw_19rpp_175","action-slot":"awsui_action-slot_mx3cw_19rpp_180","action-button":"awsui_action-button_mx3cw_19rpp_181","alert-focus-wrapper":"awsui_alert-focus-wrapper_mx3cw_19rpp_185",text:"awsui_text_mx3cw_19rpp_211",icon:"awsui_icon_mx3cw_19rpp_216",message:"awsui_message_mx3cw_19rpp_219","icon-size-medium":"awsui_icon-size-medium_mx3cw_19rpp_227","icon-size-big":"awsui_icon-size-big_mx3cw_19rpp_230","icon-size-normal":"awsui_icon-size-normal_mx3cw_19rpp_233",content:"awsui_content_mx3cw_19rpp_237",dismiss:"awsui_dismiss_mx3cw_19rpp_241","dismiss-button":"awsui_dismiss-button_mx3cw_19rpp_246","type-error":"awsui_type-error_mx3cw_19rpp_250","type-warning":"awsui_type-warning_mx3cw_19rpp_258","type-success":"awsui_type-success_mx3cw_19rpp_266","type-info":"awsui_type-info_mx3cw_19rpp_274"};const Ee={root:"awsui_root_37gf8_14wux_9"};function De(t,s,n,r){return!s&&n&&(s=e(Y,{className:t.actionButton,onClick:r,formAction:"none",children:n})),s?e("div",{className:t.actionSlot,children:s}):null}function ze({className:t,testUtilClasses:s,action:n,discoveredActions:r,buttonText:o,onButtonClick:i}){const a=De(s,n,o,i);return!a&&r.length===0?null:f("div",{className:h(Ee.root,t),children:[a,r]})}const $e={error:"status-negative",warning:"status-warning",success:"status-positive",info:"status-info"},He=qe(ce.alert.onActionRegistered),Me=V.forwardRef((t,s)=>{var{type:n,statusIconAriaLabel:r,visible:o=!0,dismissible:i,dismissAriaLabel:a,children:d,header:l,buttonText:m,action:_,onDismiss:b,onButtonClick:y,__internalRootRef:A=null}=t,u=x(t,["type","statusIconAriaLabel","visible","dismissible","dismissAriaLabel","children","header","buttonText","action","onDismiss","onButtonClick","__internalRootRef"]);const w=T(u),I=X("alert"),C=p.exports.useRef(null);le(s,C);const[j,q]=ue(["xs"]),E=Z(q,A),P=ee()?"normal":l&&d?"big":"normal",{discoveredActions:B,headerRef:D,contentRef:z}=He(n),$=Boolean(_||m||B.length),H={[me]:n};return e("div",{...Object.assign({},w,H,{"aria-hidden":!o,className:h(c.root,{[c.hidden]:!o},w.className),ref:E}),children:e(de.Provider,{value:{defaultVariant:"primary"},children:e(pe,{contextName:"alert",children:f("div",{className:h(c.alert,c[`type-${n}`],c[`icon-size-${P}`],$&&c["with-action"],i&&c["with-dismiss"],c[`breakpoint-${j}`]),children:[f("div",{className:c["alert-focus-wrapper"],tabIndex:-1,ref:C,children:[e("div",{className:h(c.icon,c.text),role:"img","aria-label":r,children:e(_e,{name:$e[n],size:P})}),f("div",{className:h(c.message,c.text),children:[l&&e("div",{className:c.header,ref:D,children:l}),e("div",{className:c.content,ref:z,children:d})]})]}),e(ze,{className:c.action,testUtilClasses:{actionSlot:c["action-slot"],actionButton:c["action-button"]},action:_,discoveredActions:B,buttonText:m,onButtonClick:()=>W(y)}),i&&e("div",{className:c.dismiss,children:e(Y,{className:c["dismiss-button"],variant:"icon",iconName:"close",formAction:"none",ariaLabel:I("dismissAriaLabel",a),onClick:()=>W(b)})})]})})})})}),Ue=Me,Ve=t=>Object.keys(t).filter(n=>n.indexOf("__")!==0).reduce((n,r)=>(n[r]=t[r],n),{});function ne(t){var{variant:s="default",disableHeaderPaddings:n=!1,disableContentPaddings:r=!1}=t,o=x(t,["variant","disableHeaderPaddings","disableContentPaddings"]);const i=L("Container"),a=Ve(o);return e(he,{children:e(fe,{...Object.assign({variant:s,disableContentPaddings:r,disableHeaderPaddings:n},o,a,i)})})}F(ne,"Container");const g={layout:"awsui_layout_5gtk3_1fwv7_99","is-visual-refresh":"awsui_is-visual-refresh_5gtk3_1fwv7_99",background:"awsui_background_5gtk3_1fwv7_102",header:"awsui_header_5gtk3_1fwv7_105","is-overlap-disabled":"awsui_is-overlap-disabled_5gtk3_1fwv7_121",content:"awsui_content_5gtk3_1fwv7_129","has-header":"awsui_has-header_5gtk3_1fwv7_133"};function se(t){var{children:s,disableOverlap:n,header:r,__internalRootRef:o}=t,i=x(t,["children","disableOverlap","header","__internalRootRef"]);const a=T(i),d=p.exports.useRef(null),l=Z(d,o),m=ee(),_=be(),b=!s||n;return f("div",{...Object.assign({},a,{className:h(a.className,g.layout,{[g["is-overlap-disabled"]]:b,[g["is-visual-refresh"]]:m,[g["has-header"]]:!!r}),ref:l}),children:[e("div",{className:h(g.background,{[g["is-overlap-disabled"]]:b},"awsui-context-content-header"),ref:_}),r&&e("div",{className:h(g.header,"awsui-context-content-header"),children:r}),e("div",{className:g.content,children:s})]})}function re(t){const s=L("ContentLayout");return e(se,{...Object.assign({},t,s)})}F(re,"ContentLayout");const v={root:"awsui_root_1i0s3_tkgee_93",header:"awsui_header_1i0s3_tkgee_106","full-page":"awsui_full-page_1i0s3_tkgee_106",content:"awsui_content_1i0s3_tkgee_110",error:"awsui_error_1i0s3_tkgee_114",footer:"awsui_footer_1i0s3_tkgee_118","actions-section":"awsui_actions-section_1i0s3_tkgee_122","secondary-actions":"awsui_secondary-actions_1i0s3_tkgee_131",actions:"awsui_actions_1i0s3_tkgee_122"};function Ke(t){var{children:s,header:n,errorText:r,errorIconAriaLabel:o,actions:i,secondaryActions:a,variant:d,__internalRootRef:l}=t,m=x(t,["children","header","errorText","errorIconAriaLabel","actions","secondaryActions","variant","__internalRootRef"]);const _=T(m),y=X("form")("errorIconAriaLabel",o),{funnelInteractionId:A,submissionAttempt:u,errorCount:w}=te();return p.exports.useEffect(()=>{if(A&&r)return w.current++,()=>{w.current--}},[A,r,u,w]),e("div",{...Object.assign({},_,{ref:l,className:h(v.root,_.className)}),children:f(Qe,{header:n&&e("div",{className:h(v.header,d==="full-page"&&v["full-page"]),children:n}),variant:d,children:[s&&e("div",{className:v.content,children:s}),r&&e(ve,{margin:{top:"l"},children:e(Ue,{type:"error",statusIconAriaLabel:y,children:e("div",{className:v.error,children:r})})}),(i||a)&&e("div",{className:v.footer,children:f("div",{className:v["actions-section"],children:[i&&e("div",{className:v.actions,children:i}),a&&e("div",{className:v["secondary-actions"],children:a})]})}),r&&f(we,{assertive:!0,children:[y,", ",r]})]})})}function Qe({children:t,header:s,variant:n}){return n==="full-page"&&s?e(se,{header:s,children:t}):f(ge,{children:[s,t]})}const We=t=>{var{variant:s="full-page",actions:n}=t,r=x(t,["variant","actions"]);const{funnelProps:o,funnelSubmit:i,funnelNextOrSubmitAttempt:a}=te(),{funnelStepProps:d}=Ce(),l=({variant:m})=>{m==="primary"&&(a(),i())};return e(Re.Provider,{value:{onClick:l},children:e(Ke,{...Object.assign({variant:s,actions:n},r,o,d)})})};function ae(t){var{variant:s="full-page"}=t,n=x(t,["variant"]);const r=L("Form"),i=xe()||`.${Ie["heading-text"]}`;return e(ye,{funnelType:"single-page",optionalStepNumbers:[],totalFunnelSteps:1,funnelNameSelectors:[i,`.${v.header}`],children:e(Ae,{stepNumber:1,children:e(We,{...Object.assign({variant:s},n,r)})})})}F(ae,"Form");function R(t){var{stretch:s=!1}=t,n=x(t,["stretch"]);const r=L("FormField");return e(Ne,{...Object.assign({stretch:s},n,{__hideLabel:!1},r)})}F(R,"FormField");const ie=V.forwardRef((t,s)=>{var{value:n,type:r="text",step:o,inputMode:i,autoComplete:a=!0,spellcheck:d,disabled:l,readOnly:m,disableBrowserAutocorrect:_,onKeyDown:b,onKeyUp:y,onChange:A,onBlur:u,onFocus:w,ariaRequired:I,name:C,placeholder:j,autoFocus:q,ariaLabel:E,ariaLabelledby:K,ariaDescribedby:P,invalid:B,controlId:D,clearAriaLabel:z}=t,$=x(t,["value","type","step","inputMode","autoComplete","spellcheck","disabled","readOnly","disableBrowserAutocorrect","onKeyDown","onKeyUp","onChange","onBlur","onFocus","ariaRequired","name","placeholder","autoFocus","ariaLabel","ariaLabelledby","ariaDescribedby","invalid","controlId","clearAriaLabel"]);const H=L("Input"),Q=T($),O=p.exports.useRef(null);return p.exports.useImperativeHandle(s,()=>({focus(...N){var M;(M=O.current)===null||M===void 0||M.focus(...N)},select(){var N;(N=O.current)===null||N===void 0||N.select()}}),[O]),e(ke,{...Object.assign({ref:O},Object.assign(Object.assign(Object.assign({},Q),H),{autoComplete:a,ariaLabel:E,ariaRequired:I,autoFocus:q,disabled:l,disableBrowserAutocorrect:_,name:C,onKeyDown:b,onKeyUp:y,onChange:A,onBlur:u,onFocus:w,placeholder:j,readOnly:m,type:r,step:o,inputMode:i,spellcheck:d,value:n,ariaDescribedby:P,ariaLabelledby:K,invalid:B,controlId:D,clearAriaLabel:z}),{className:h(Se.root,Q.className),__inheritFormFieldProps:!0})})});F(ie,"Input");const k=ie,S=t=>!(t!=null&&t.length);function Ge(){const[t,s]=p.exports.useState(!1),[n,r]=p.exports.useState(""),[o,i]=p.exports.useState(""),[a,d]=p.exports.useState(""),[l,m]=p.exports.useState(""),[_,b]=p.exports.useState("");return e(Le,{contentType:"form",breadcrumbs:e(Fe,{active:{text:"Create question",href:"index.html"}}),navigation:e(Pe,{}),tools:e(Be,{header:e("h2",{children:"Help panel"})}),children:e(re,{header:e(G,{variant:"h1",description:"Enter your interview questions, so that others can use them!",children:"Create question"}),children:e("form",{onSubmit:async u=>{u.preventDefault();const I=Oe()+"/put-question";try{(await fetch(I,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({level:n,question:o,Answer:a,ManagerIC:l,Role:_})})).ok?(console.log("PUT request successful"),r(""),i(""),d(""),m(""),b("")):console.error("PUT request failed")}catch(C){console.error("Error during PUT request:",C)}s(!0)},children:e(ae,{actions:f(U,{direction:"horizontal",size:"xs",children:[e(J,{href:"/home/index.html",variant:"link",children:"Return"}),e(J,{formAction:"submit",variant:"primary",onClick:()=>{n!=""&&o!=""&&a!=""&&l!=""&&_!=""&&(location.pathname="home/index.html")},children:"Create Question"})]}),children:e(U,{size:"l",children:e(ne,{header:e(G,{variant:"h2",children:"Form container header"}),children:f(U,{direction:"vertical",size:"l",children:[e(R,{label:"Level",errorText:t&&S(n)&&"Level is required.",i18nStrings:{errorIconAriaLabel:"Error"},children:e(k,{value:n,onChange:({detail:u})=>r(u.value),type:"text"})}),e(R,{label:"Question",errorText:t&&S(o)&&"Question is required.",i18nStrings:{errorIconAriaLabel:"Error"},children:e(k,{value:o,onChange:({detail:u})=>i(u.value),type:"text"})}),e(R,{label:"Answer",errorText:t&&S(a)&&"Answer is required.",i18nStrings:{errorIconAriaLabel:"Error"},children:e(k,{value:a,onChange:({detail:u})=>d(u.value),type:"text"})}),e(R,{label:"Manager/IC",errorText:t&&S(l)&&"Manager/IC is required.",i18nStrings:{errorIconAriaLabel:"Error"},children:e(k,{value:l,onChange:({detail:u})=>m(u.value),type:"text"})}),e(R,{label:"Role",errorText:t&&S(_)&&"Role is required.",i18nStrings:{errorIconAriaLabel:"Error"},children:e(k,{value:_,onChange:({detail:u})=>b(u.value),type:"text"})})]})})})})})})})}const Je=Te.createRoot(document.getElementById("root"));Je.render(e(V.StrictMode,{children:e(Ge,{})}));
