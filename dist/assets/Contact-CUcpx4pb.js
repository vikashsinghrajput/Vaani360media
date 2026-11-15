import{r,j as e}from"./index-RQ4PmMld.js";const t={saffron:"#C8860A",gold:"#B8860B",goldLight:"#E8C87A",goldPale:"#FDF6E3",maroon:"#7B1D1D",ivory:"#FDFAF3",cream:"#FAF6ED",textDark:"#111111",textMid:"#444444",textLight:"#666666"},A="service_efgqrfq",B="template_uxwycqq",C="W4G86M_g7xq2ZPgSn",S="template_63o7kbq",F="6LfDeoctAAAAAGDA9ty2egIf1trKByn_k7NU2gtH",W=`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  @keyframes ping { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.7); opacity: 0; } }

  .ping-ring {
    position: absolute; inset: 0; border-radius: 12px;
    border: 2px solid #c9963a;
    animation: ping 1.8s ease-out infinite;
    pointer-events: none;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: 40px;
    align-items: start;
  }

  .services-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 4px;
  }

  .name-phone-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .contact-input {
    width: 100%;
    background: ${t.cream};
    border: 1px solid ${t.goldLight};
    border-radius: 10px;
    padding: 13px 16px;
    font-size: 17px;
    color: ${t.textDark};
    outline: none;
    font-family: 'Inter', sans-serif;
  }

  .contact-input:focus {
    border-color: ${t.gold};
    box-shadow: 0 0 0 3px rgba(184,134,11,0.15);
  }

  .contact-heading {
    font-family: 'Inter', sans-serif;
    font-size: clamp(30px, 5vw, 46px);
  }

  @media (max-width: 860px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 28px;
    }
  }

  @media (max-width: 560px) {
    .name-phone-grid {
      grid-template-columns: 1fr;
      gap: 0;
    }
    .services-grid {
      grid-template-columns: 1fr 1fr;
    }
    .stats-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
`,R=["SEO","Paid Ads","Social Media","Web Design","Content","Everything"];function $(){const[g,h]=r.useState(["SEO"]),[o,m]=r.useState({name:"",phone:"",email:"",business:"",budget:"",message:""}),[x,s]=r.useState(""),[w,f]=r.useState(!1),[u,y]=r.useState(!1),[l,b]=r.useState(!1),[L,k]=r.useState(!1),p=r.useRef(null),c=r.useRef(null);r.useEffect(()=>{const n=()=>{window.grecaptcha&&p.current&&c.current===null&&(c.current=window.grecaptcha.render(p.current,{sitekey:F}),k(!0))};if(window.grecaptcha&&window.grecaptcha.render){n();return}if(document.getElementById("recaptcha-script"))window.onRecaptchaLoad=n;else{window.onRecaptchaLoad=n;const a=document.createElement("script");a.id="recaptcha-script",a.src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit",a.async=!0,a.defer=!0,document.body.appendChild(a)}},[]);const I=n=>{h(i=>i.includes(n)?i.filter(a=>a!==n):[...i,n])},d=n=>{m({...o,[n.target.name]:n.target.value})},v=async(n,i,a)=>{const j={...i};if(a&&(j["g-recaptcha-response"]=a),!(await fetch("https://api.emailjs.com/api/v1.0/email/send",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({service_id:A,template_id:n,user_id:C,template_params:j})})).ok)throw new Error("Email send failed")},E=async()=>{if(!o.name.trim()||!o.phone.trim()||!o.email.trim()){s("Please fill in your name, phone, and email.");return}let n="";if(n=window.grecaptcha?window.grecaptcha.getResponse(c.current):"",!n){s("Please verify you're not a robot before submitting.");return}s(""),b(!0);try{const i={name:o.name,phone:o.phone,email:o.email,business:o.business,budget:o.budget,message:o.message,services:g.join(", ")};await v(B,i,n),S&&await v(S,i,null),f(!0)}catch{s("Something went wrong sending your message. Please try again, or contact us directly.")}finally{b(!1),window.grecaptcha&&window.grecaptcha.reset(c.current)}},z=()=>{m({name:"",phone:"",email:"",business:"",budget:"",message:""}),h(["SEO"]),s(""),f(!1)};return e.jsxs("div",{style:{fontFamily:"'Inter', sans-serif",background:t.ivory,position:"relative",overflow:"hidden"},children:[e.jsx("style",{children:W}),e.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",opacity:.35,backgroundImage:`radial-gradient(circle, ${t.goldLight} 1.5px, transparent 1.5px)`,backgroundSize:"30px 30px"}}),e.jsx("div",{style:{position:"absolute",width:320,height:320,background:"#FFE8B0",opacity:.4,top:-80,right:"5%",borderRadius:"50%",filter:"blur(70px)",pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",width:220,height:220,background:"#F5C07A",opacity:.25,bottom:0,left:0,borderRadius:"50%",filter:"blur(60px)",pointerEvents:"none"}}),e.jsxs("div",{style:{maxWidth:960,margin:"0 auto",padding:"clamp(28px, 6vw, 52px) clamp(16px, 5vw, 28px) 64px",position:"relative",zIndex:5},children:[e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:t.goldPale,border:`1px solid ${t.goldLight}`,borderRadius:999,padding:"6px 20px 6px 10px",fontSize:13,fontWeight:700,color:t.maroon,letterSpacing:".4px",marginBottom:18,fontFamily:"'Inter', sans-serif"},children:[e.jsx("span",{style:{width:20,height:20,borderRadius:"50%",background:`linear-gradient(135deg, ${t.saffron}, ${t.gold})`,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"white",fontWeight:900},children:"✦"}),"Free Consultation Available"]}),e.jsxs("h1",{className:"contact-heading",style:{fontWeight:900,color:t.textDark,lineHeight:1.2,margin:"0 0 12px"},children:["Let's Talk ",e.jsx("span",{style:{color:t.gold,fontStyle:"italic"},children:"Growth"}),e.jsx("br",{}),"Today!"]}),e.jsx("p",{style:{color:t.textMid,fontSize:20,margin:"0 0 32px",lineHeight:1.7},children:"Start your brand's growth journey — fill out a simple form and we'll reply within 24 hours."}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:36},children:[e.jsx("div",{style:{height:1,flex:1,background:`linear-gradient(90deg, transparent, ${t.gold})`}}),e.jsx("span",{style:{color:t.gold,fontSize:15},children:"✦"}),e.jsx("span",{style:{color:t.saffron,fontSize:18},children:"✳"}),e.jsx("span",{style:{color:t.gold,fontSize:15},children:"✦"}),e.jsx("div",{style:{height:1,flex:1,background:`linear-gradient(90deg, ${t.gold}, transparent)`}})]}),e.jsxs("div",{className:"contact-grid",children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[[{icon:"📍",label:"",val:"Hindon Airport, Ghaziabad, Uttar Pradesh - 201005, India",sub:"M-6 3rd Floor Near Hindon Airport, Krishna Vihar Ghaziabad, Uttar Pradesh 201005",href:" https://maps.google.com/?cid=16207116013512532703 "},{icon:"📞",label:"Phone / WhatsApp",val:"+91 75629 59515",sub:"Mon–Sat, 10am – 7pm"},{icon:"📧",label:"Email",val:"hello@elevionmedia.com",sub:"Reply within 24 hours",href:"mailto:hello@elevionmedia.com"},{icon:"⏱️",label:"Response Time",val:"Same-day reply",sub:"Guaranteed on weekdays"}].map(n=>e.jsxs("div",{onClick:()=>n.href&&(window.location.href=n.href),role:n.href?"link":void 0,tabIndex:n.href?0:void 0,onKeyDown:i=>{n.href&&(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),window.location.href=n.href)},style:{background:t.cream,border:`1px solid ${t.goldLight}`,borderRadius:16,padding:"20px 22px",display:"flex",alignItems:"flex-start",gap:14,cursor:n.href?"pointer":"default"},children:[e.jsx("div",{style:{width:46,height:46,borderRadius:12,background:t.goldPale,border:`1px solid ${t.goldLight}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0},children:n.icon}),e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:12,textTransform:"uppercase",letterSpacing:".7px",color:t.gold,fontWeight:700,margin:"0 0 4px"},children:n.label}),e.jsx("p",{style:{fontSize:17,color:t.textDark,fontWeight:700,margin:0},children:n.val}),e.jsx("p",{style:{fontSize:14,color:t.textLight,margin:"3px 0 0"},children:n.sub})]})]},n.label)),e.jsx("div",{className:"stats-grid",children:[["2.4K+","Happy Clients"],["98%","Success Rate"],["340%","Avg. ROI"],["5★","Rating"]].map(([n,i])=>e.jsxs("div",{style:{background:t.goldPale,border:`1px solid ${t.goldLight}`,borderRadius:12,padding:"16px 16px",textAlign:"center"},children:[e.jsx("p",{style:{fontFamily:"'Inter', sans-serif",fontSize:25,fontWeight:900,color:t.gold,margin:0},children:n}),e.jsx("p",{style:{fontSize:13,color:t.textLight,margin:"4px 0 0"},children:i})]},i))})]}),e.jsx("div",{style:{background:"#fff",border:`1px solid ${t.goldLight}`,borderRadius:20,padding:"clamp(22px, 4vw, 32px) clamp(18px, 4vw, 28px)",boxShadow:"0 4px 32px rgba(201,150,58,0.1)"},children:w?e.jsxs("div",{style:{textAlign:"center",padding:"32px 16px"},children:[e.jsx("div",{style:{fontSize:56,marginBottom:16},children:"🎉"}),e.jsx("h2",{style:{fontFamily:"'Inter', sans-serif",fontSize:24,fontWeight:900,color:t.textDark,margin:"0 0 10px"},children:"Thank You!"}),e.jsxs("p",{style:{fontSize:17,color:t.textMid,fontStyle:"italic",lineHeight:1.7,margin:"0 0 24px"},children:["We've received your message. We'll reach out via ",e.jsx("strong",{style:{color:t.textDark},children:"WhatsApp or Email within 24 hours"}),". Talk soon!"]}),e.jsxs("div",{style:{background:t.goldPale,border:`1px solid ${t.goldLight}`,borderRadius:14,padding:"18px 20px",marginBottom:24,textAlign:"left"},children:[e.jsx("p",{style:{fontSize:14,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px",color:t.gold,margin:"0 0 12px",fontFamily:"'Inter', sans-serif"},children:"What Happens Next?"}),["Our expert will call or WhatsApp you","We'll discuss your business goals — free of charge","You'll receive a custom strategy plan"].map((n,i)=>e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-start",fontSize:15,color:t.textMid,marginBottom:i<2?10:0},children:[e.jsx("span",{style:{background:t.saffron,color:"white",borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0},children:i+1}),n]},i))]}),e.jsx("button",{onClick:z,style:{background:t.cream,border:`1px solid ${t.goldLight}`,borderRadius:10,padding:"11px 26px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"'Inter', sans-serif",color:t.maroon},children:"← Go Back"})]}):e.jsxs(e.Fragment,{children:[e.jsx("p",{style:{fontFamily:"'Inter', sans-serif",fontSize:19,fontWeight:700,color:t.textDark,margin:"0 0 22px"},children:"✦ Book Your Free Consultation"}),e.jsx("div",{className:"name-phone-grid",children:[{label:"Your Name *",name:"name",type:"text",placeholder:"Full name"},{label:"Phone / WhatsApp *",name:"phone",type:"tel",placeholder:"+91 XXXXX XXXXX"}].map(n=>e.jsxs("div",{style:{marginBottom:18},children:[e.jsx("label",{style:{display:"block",fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px",color:t.gold,marginBottom:8,fontFamily:"'Inter', sans-serif"},children:n.label}),e.jsx("input",{name:n.name,type:n.type,placeholder:n.placeholder,value:o[n.name],onChange:d,className:"contact-input"})]},n.name))}),e.jsxs("div",{style:{marginBottom:18},children:[e.jsx("label",{style:{display:"block",fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px",color:t.gold,marginBottom:8,fontFamily:"'Inter', sans-serif"},children:"Email Address *"}),e.jsx("input",{name:"email",type:"email",placeholder:"you@email.com",value:o.email,onChange:d,className:"contact-input"})]}),e.jsxs("div",{style:{marginBottom:18},children:[e.jsx("label",{style:{display:"block",fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px",color:t.gold,marginBottom:8,fontFamily:"'Inter', sans-serif"},children:"Business / Brand Name"}),e.jsx("input",{name:"business",type:"text",placeholder:"Your company name",value:o.business,onChange:d,className:"contact-input"})]}),e.jsxs("div",{style:{marginBottom:18},children:[e.jsx("label",{style:{display:"block",fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px",color:t.gold,marginBottom:8,fontFamily:"'Inter', sans-serif"},children:"Which Service Do You Need? *"}),e.jsx("div",{className:"services-grid",children:R.map(n=>{const i=g.includes(n);return e.jsx("button",{onClick:()=>I(n),style:{padding:"10px 10px",borderRadius:10,border:`1px solid ${i?t.gold:t.goldLight}`,background:i?`linear-gradient(135deg, ${t.saffron}, ${t.gold})`:t.cream,color:i?"white":t.maroon,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"'Inter', sans-serif",transition:"all 0.18s"},children:n},n)})})]}),e.jsxs("div",{style:{marginBottom:18},children:[e.jsx("label",{style:{display:"block",fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px",color:t.gold,marginBottom:8,fontFamily:"'Inter', sans-serif"},children:"Monthly Budget"}),e.jsxs("select",{name:"budget",value:o.budget,onChange:d,className:"contact-input",children:[e.jsx("option",{value:"",children:"Select a budget"}),e.jsx("option",{children:"₹10,000 – ₹25,000"}),e.jsx("option",{children:"₹25,000 – ₹50,000"}),e.jsx("option",{children:"₹50,000 – ₹1,00,000"}),e.jsx("option",{children:"₹1,00,000+"})]})]}),e.jsxs("div",{style:{marginBottom:18},children:[e.jsx("label",{style:{display:"block",fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px",color:t.gold,marginBottom:8,fontFamily:"'Inter', sans-serif"},children:"Tell Us About Your Needs"}),e.jsx("textarea",{name:"message",placeholder:"What does your brand need? Growth, leads, sales — tell us anything...",value:o.message,onChange:d,rows:4,className:"contact-input",style:{resize:"vertical"}})]}),e.jsx("div",{style:{marginBottom:16,display:"flex",justifyContent:"center"},children:e.jsx("div",{ref:p})}),x&&e.jsx("p",{style:{color:"#C0392B",fontSize:14,margin:"0 0 12px"},children:x}),e.jsxs("button",{onClick:E,disabled:l,onMouseEnter:()=>y(!0),onMouseLeave:()=>y(!1),style:{position:"relative",overflow:"hidden",width:"100%",background:`linear-gradient(135deg, ${t.saffron}, ${t.gold})`,color:"white",border:"none",borderRadius:12,padding:"15px",fontSize:16,fontWeight:700,cursor:l?"not-allowed":"pointer",opacity:l?.7:1,fontFamily:"'Inter', sans-serif",letterSpacing:".5px",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:u?"0 10px 28px rgba(201,150,58,0.45)":"0 4px 16px rgba(201,150,58,0.35)",transform:u?"translateY(-2px)":"none",transition:"transform 0.2s, box-shadow 0.2s"},children:[!l&&e.jsx("div",{className:"ping-ring"}),l?"Sending...":"🚀 Book Free Consultation"]}),e.jsx("p",{style:{textAlign:"center",fontSize:14,color:t.textLight,fontStyle:"italic",marginTop:14},children:"🔒 Your details are 100% safe  |  No spam, ever"})]})})]})]})]})}export{$ as default};
