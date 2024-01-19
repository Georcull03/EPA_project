import{r as _,j as e,an as oe,m as b,k as f,n as Y,ao as ce,R as V,_ as C,g as T,b as X,q as le,a as ue,d as Z,e as ee,aa as de,ap as pe,C as _e,o as W,aq as me,E as L,ac as he,ar as fe,H as F,a9 as be,as as te,G as ve,W as we,A as ge,at as xe,au as ye,av as Ae,aw as Ce,B as Re,a8 as Ie,v as Ne,ad as ke,ax as Se,ai as Le,aj as Fe,ak as Pe,al as Oe,ag as G,ah as H,af as J,ae as Be,am as Te}from"./helpers.b39fb46c.js";function je(t,s){return t?e(oe,{mountContent:n=>t.mountContent(n,s),unmountContent:n=>t.unmountContent(n)},t.id+"-"+s.type):null}function qe(t){return function(n){const[r,o]=_.exports.useState([]),i=_.exports.useRef(null),a=_.exports.useRef(null);return _.exports.useEffect(()=>t(p=>{o(p.map(u=>je(u,{type:n,headerRef:i,contentRef:a})))}),[n]),{discoveredActions:r,headerRef:i,contentRef:a}}}const c={alert:"awsui_alert_mx3cw_19rpp_93","awsui-motion-fade-in":"awsui_awsui-motion-fade-in_mx3cw_19rpp_1",root:"awsui_root_mx3cw_19rpp_119",hidden:"awsui_hidden_mx3cw_19rpp_135","with-dismiss":"awsui_with-dismiss_mx3cw_19rpp_158","with-action":"awsui_with-action_mx3cw_19rpp_158","breakpoint-default":"awsui_breakpoint-default_mx3cw_19rpp_164",header:"awsui_header_mx3cw_19rpp_171",action:"awsui_action_mx3cw_19rpp_175","action-slot":"awsui_action-slot_mx3cw_19rpp_180","action-button":"awsui_action-button_mx3cw_19rpp_181","alert-focus-wrapper":"awsui_alert-focus-wrapper_mx3cw_19rpp_185",text:"awsui_text_mx3cw_19rpp_211",icon:"awsui_icon_mx3cw_19rpp_216",message:"awsui_message_mx3cw_19rpp_219","icon-size-medium":"awsui_icon-size-medium_mx3cw_19rpp_227","icon-size-big":"awsui_icon-size-big_mx3cw_19rpp_230","icon-size-normal":"awsui_icon-size-normal_mx3cw_19rpp_233",content:"awsui_content_mx3cw_19rpp_237",dismiss:"awsui_dismiss_mx3cw_19rpp_241","dismiss-button":"awsui_dismiss-button_mx3cw_19rpp_246","type-error":"awsui_type-error_mx3cw_19rpp_250","type-warning":"awsui_type-warning_mx3cw_19rpp_258","type-success":"awsui_type-success_mx3cw_19rpp_266","type-info":"awsui_type-info_mx3cw_19rpp_274"};const Ee={root:"awsui_root_37gf8_14wux_9"};function De(t,s,n,r){return!s&&n&&(s=e(Y,{className:t.actionButton,onClick:r,formAction:"none",children:n})),s?e("div",{className:t.actionSlot,children:s}):null}function ze({className:t,testUtilClasses:s,action:n,discoveredActions:r,buttonText:o,onButtonClick:i}){const a=De(s,n,o,i);return!a&&r.length===0?null:b("div",{className:f(Ee.root,t),children:[a,r]})}const $e={error:"status-negative",warning:"status-warning",success:"status-positive",info:"status-info"},Me=qe(ce.alert.onActionRegistered),Ue=V.forwardRef((t,s)=>{var{type:n,statusIconAriaLabel:r,visible:o=!0,dismissible:i,dismissAriaLabel:a,children:p,header:u,buttonText:h,action:m,onDismiss:v,onButtonClick:x,__internalRootRef:y=null}=t,l=C(t,["type","statusIconAriaLabel","visible","dismissible","dismissAriaLabel","children","header","buttonText","action","onDismiss","onButtonClick","__internalRootRef"]);const d=T(l),I=X("alert"),g=_.exports.useRef(null);le(s,g);const[j,q]=ue(["xs"]),E=Z(q,y),P=ee()?"normal":u&&p?"big":"normal",{discoveredActions:O,headerRef:D,contentRef:z}=Me(n),$=Boolean(m||h||O.length),M={[me]:n};return e("div",{...Object.assign({},d,M,{"aria-hidden":!o,className:f(c.root,{[c.hidden]:!o},d.className),ref:E}),children:e(de.Provider,{value:{defaultVariant:"primary"},children:e(pe,{contextName:"alert",children:b("div",{className:f(c.alert,c[`type-${n}`],c[`icon-size-${P}`],$&&c["with-action"],i&&c["with-dismiss"],c[`breakpoint-${j}`]),children:[b("div",{className:c["alert-focus-wrapper"],tabIndex:-1,ref:g,children:[e("div",{className:f(c.icon,c.text),role:"img","aria-label":r,children:e(_e,{name:$e[n],size:P})}),b("div",{className:f(c.message,c.text),children:[u&&e("div",{className:c.header,ref:D,children:u}),e("div",{className:c.content,ref:z,children:p})]})]}),e(ze,{className:c.action,testUtilClasses:{actionSlot:c["action-slot"],actionButton:c["action-button"]},action:m,discoveredActions:O,buttonText:h,onButtonClick:()=>W(x)}),i&&e("div",{className:c.dismiss,children:e(Y,{className:c["dismiss-button"],variant:"icon",iconName:"close",formAction:"none",ariaLabel:I("dismissAriaLabel",a),onClick:()=>W(v)})})]})})})})}),He=Ue,Ve=t=>Object.keys(t).filter(n=>n.indexOf("__")!==0).reduce((n,r)=>(n[r]=t[r],n),{});function ne(t){var{variant:s="default",disableHeaderPaddings:n=!1,disableContentPaddings:r=!1}=t,o=C(t,["variant","disableHeaderPaddings","disableContentPaddings"]);const i=L("Container"),a=Ve(o);return e(he,{children:e(fe,{...Object.assign({variant:s,disableContentPaddings:r,disableHeaderPaddings:n},o,a,i)})})}F(ne,"Container");const A={layout:"awsui_layout_5gtk3_1fwv7_99","is-visual-refresh":"awsui_is-visual-refresh_5gtk3_1fwv7_99",background:"awsui_background_5gtk3_1fwv7_102",header:"awsui_header_5gtk3_1fwv7_105","is-overlap-disabled":"awsui_is-overlap-disabled_5gtk3_1fwv7_121",content:"awsui_content_5gtk3_1fwv7_129","has-header":"awsui_has-header_5gtk3_1fwv7_133"};function se(t){var{children:s,disableOverlap:n,header:r,__internalRootRef:o}=t,i=C(t,["children","disableOverlap","header","__internalRootRef"]);const a=T(i),p=_.exports.useRef(null),u=Z(p,o),h=ee(),m=be(),v=!s||n;return b("div",{...Object.assign({},a,{className:f(a.className,A.layout,{[A["is-overlap-disabled"]]:v,[A["is-visual-refresh"]]:h,[A["has-header"]]:!!r}),ref:u}),children:[e("div",{className:f(A.background,{[A["is-overlap-disabled"]]:v},"awsui-context-content-header"),ref:m}),r&&e("div",{className:f(A.header,"awsui-context-content-header"),children:r}),e("div",{className:A.content,children:s})]})}function re(t){const s=L("ContentLayout");return e(se,{...Object.assign({},t,s)})}F(re,"ContentLayout");const w={root:"awsui_root_1i0s3_tkgee_93",header:"awsui_header_1i0s3_tkgee_106","full-page":"awsui_full-page_1i0s3_tkgee_106",content:"awsui_content_1i0s3_tkgee_110",error:"awsui_error_1i0s3_tkgee_114",footer:"awsui_footer_1i0s3_tkgee_118","actions-section":"awsui_actions-section_1i0s3_tkgee_122","secondary-actions":"awsui_secondary-actions_1i0s3_tkgee_131",actions:"awsui_actions_1i0s3_tkgee_122"};function Ke(t){var{children:s,header:n,errorText:r,errorIconAriaLabel:o,actions:i,secondaryActions:a,variant:p,__internalRootRef:u}=t,h=C(t,["children","header","errorText","errorIconAriaLabel","actions","secondaryActions","variant","__internalRootRef"]);const m=T(h),x=X("form")("errorIconAriaLabel",o),{funnelInteractionId:y,submissionAttempt:l,errorCount:d}=te();return _.exports.useEffect(()=>{if(y&&r)return d.current++,()=>{d.current--}},[y,r,l,d]),e("div",{...Object.assign({},m,{ref:u,className:f(w.root,m.className)}),children:b(Qe,{header:n&&e("div",{className:f(w.header,p==="full-page"&&w["full-page"]),children:n}),variant:p,children:[s&&e("div",{className:w.content,children:s}),r&&e(ve,{margin:{top:"l"},children:e(He,{type:"error",statusIconAriaLabel:x,children:e("div",{className:w.error,children:r})})}),(i||a)&&e("div",{className:w.footer,children:b("div",{className:w["actions-section"],children:[i&&e("div",{className:w.actions,children:i}),a&&e("div",{className:w["secondary-actions"],children:a})]})}),r&&b(we,{assertive:!0,children:[x,", ",r]})]})})}function Qe({children:t,header:s,variant:n}){return n==="full-page"&&s?e(se,{header:s,children:t}):b(ge,{children:[s,t]})}const We=t=>{var{variant:s="full-page",actions:n}=t,r=C(t,["variant","actions"]);const{funnelProps:o,funnelSubmit:i,funnelNextOrSubmitAttempt:a}=te(),{funnelStepProps:p}=Ce(),u=({variant:h})=>{h==="primary"&&(a(),i())};return e(Re.Provider,{value:{onClick:u},children:e(Ke,{...Object.assign({variant:s,actions:n},r,o,p)})})};function ae(t){var{variant:s="full-page"}=t,n=C(t,["variant"]);const r=L("Form"),i=xe()||`.${Ie["heading-text"]}`;return e(ye,{funnelType:"single-page",optionalStepNumbers:[],totalFunnelSteps:1,funnelNameSelectors:[i,`.${w.header}`],children:e(Ae,{stepNumber:1,children:e(We,{...Object.assign({variant:s},n,r)})})})}F(ae,"Form");function R(t){var{stretch:s=!1}=t,n=C(t,["stretch"]);const r=L("FormField");return e(Ne,{...Object.assign({stretch:s},n,{__hideLabel:!1},r)})}F(R,"FormField");const ie=V.forwardRef((t,s)=>{var{value:n,type:r="text",step:o,inputMode:i,autoComplete:a=!0,spellcheck:p,disabled:u,readOnly:h,disableBrowserAutocorrect:m,onKeyDown:v,onKeyUp:x,onChange:y,onBlur:l,onFocus:d,ariaRequired:I,name:g,placeholder:j,autoFocus:q,ariaLabel:E,ariaLabelledby:K,ariaDescribedby:P,invalid:O,controlId:D,clearAriaLabel:z}=t,$=C(t,["value","type","step","inputMode","autoComplete","spellcheck","disabled","readOnly","disableBrowserAutocorrect","onKeyDown","onKeyUp","onChange","onBlur","onFocus","ariaRequired","name","placeholder","autoFocus","ariaLabel","ariaLabelledby","ariaDescribedby","invalid","controlId","clearAriaLabel"]);const M=L("Input"),Q=T($),B=_.exports.useRef(null);return _.exports.useImperativeHandle(s,()=>({focus(...N){var U;(U=B.current)===null||U===void 0||U.focus(...N)},select(){var N;(N=B.current)===null||N===void 0||N.select()}}),[B]),e(ke,{...Object.assign({ref:B},Object.assign(Object.assign(Object.assign({},Q),M),{autoComplete:a,ariaLabel:E,ariaRequired:I,autoFocus:q,disabled:u,disableBrowserAutocorrect:m,name:g,onKeyDown:v,onKeyUp:x,onChange:y,onBlur:l,onFocus:d,placeholder:j,readOnly:h,type:r,step:o,inputMode:i,spellcheck:p,value:n,ariaDescribedby:P,ariaLabelledby:K,invalid:O,controlId:D,clearAriaLabel:z}),{className:f(Se.root,Q.className),__inheritFormFieldProps:!0})})});F(ie,"Input");const k=ie,S=t=>!(t!=null&&t.length);function Ge(){const[t,s]=_.exports.useState(!1),[n,r]=_.exports.useState(""),[o,i]=_.exports.useState(""),[a,p]=_.exports.useState(""),[u,h]=_.exports.useState(""),[m,v]=_.exports.useState(""),x=async l=>{l.preventDefault();const I=Be()+"/put-question";try{const g=await fetch(I,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({level:n,question:o,Answer:a,ManagerIC:u,Role:m})});console.log(g),g.ok?console.log("PUT request successful"):console.error("PUT request failed")}catch(g){console.error("Error during PUT request:",g)}s(!0)},y=()=>{n!=""&&o!=""&&a!=""&&u!=""&&m!=""&&t==!0&&(location.pathname="home/index.html")};return _.exports.useEffect(()=>{const l=new URLSearchParams(window.location.search),d=Object.fromEntries(l.entries());d.editMode==="true"&&Object.keys(d).length>1&&(r(d.level||""),i(d.question||""),p(d.Answer||""),h(d.ManagerIC||""),v(d.Role||""))},[]),e(Le,{contentType:"form",breadcrumbs:e(Fe,{active:{text:"Create question",href:"index.html"}}),navigation:e(Pe,{}),tools:e(Oe,{header:e("h2",{children:"Help panel"})}),children:e(re,{header:e(G,{variant:"h1",description:"Enter your interview questions, so that others can use them!",children:"Create question"}),children:e("form",{onSubmit:x,children:e(ae,{actions:b(H,{direction:"horizontal",size:"xs",children:[e(J,{href:"/home/index.html",variant:"link",children:"Return"}),e(J,{formAction:"submit",variant:"primary",onClick:y,children:"Create Question"})]}),children:e(H,{size:"l",children:e(ne,{header:e(G,{variant:"h2",children:"Form container header"}),children:b(H,{direction:"vertical",size:"l",children:[e(R,{label:"Level",errorText:t&&S(n)&&"Level is required.",i18nStrings:{errorIconAriaLabel:"Error"},children:e(k,{value:n,onChange:({detail:l})=>r(l.value),type:"text"})}),e(R,{label:"Question",errorText:t&&S(o)&&"Question is required.",i18nStrings:{errorIconAriaLabel:"Error"},children:e(k,{value:o,onChange:({detail:l})=>i(l.value),type:"text"})}),e(R,{label:"Answer",errorText:t&&S(a)&&"Answer is required.",i18nStrings:{errorIconAriaLabel:"Error"},children:e(k,{value:a,onChange:({detail:l})=>p(l.value),type:"text"})}),e(R,{label:"Manager/IC",errorText:t&&S(u)&&"Manager/IC is required.",i18nStrings:{errorIconAriaLabel:"Error"},children:e(k,{value:u,onChange:({detail:l})=>h(l.value),type:"text"})}),e(R,{label:"Role",errorText:t&&S(m)&&"Role is required.",i18nStrings:{errorIconAriaLabel:"Error"},children:e(k,{value:m,onChange:({detail:l})=>v(l.value),type:"text"})})]})})})})})})})}const Je=Te.createRoot(document.getElementById("root"));Je.render(e(V.StrictMode,{children:e(Ge,{})}));