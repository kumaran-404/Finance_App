(()=>{var e={45648:(e,t,n)=>{"use strict";n.r(t),n.d(t,{customContext:()=>ke,default:()=>Se});var r=n(15861),a=n(70885),s=n(39385),i=n(75649),l=n(67775),o=n(74880),d=n(95004),u=n(66792),c=n(43287),f=n(84953),h=n(83493),m=n(56267),j=n(23408).default.create({validateStatus:function(e){return 200==e}});j.interceptors.request.use((function(e){var t=localStorage.getItem("jwtToken");return e.headers.Authorization="Bearer "+t,e}));var p=function(){var e=(0,r.default)((function*(){try{return yield j.post("/api/auth/verifyJWT")}catch(e){return null}}));return function(){return e.apply(this,arguments)}}(),x=function(){var e=(0,r.default)((function*(e,t){try{var n=yield j.post("/api/auth/login",e);return t({message:"Welcome back",severity:"success"}),setTimeout((function(){}),4e3),n.data.data.token}catch(r){return t({message:r.response.data.error,severity:"error"}),null}}));return function(t,n){return e.apply(this,arguments)}}(),g=function(){var e=(0,r.default)((function*(e,t,n){try{return console.log(e,t),yield j.post("/api/users/month",{month:e,year:t})}catch(r){return n({message:r.response.data.error,severity:"error"}),null}}));return function(t,n,r){return e.apply(this,arguments)}}(),y=function(){var e=(0,r.default)((function*(e,t){try{return yield j.post("/api/users/search",e)}catch(n){return t({message:n.response.data.error,severity:"error"}),null}}));return function(t,n){return e.apply(this,arguments)}}(),v=function(){var e=(0,r.default)((function*(e,t){try{return yield j.get(`/api/users/${e}`)}catch(n){return t({message:n.response.data.error,severity:"error"}),null}}));return function(t,n){return e.apply(this,arguments)}}(),b=function(){var e=(0,r.default)((function*(e,t){try{var n=yield j.post("/api/users/update",e);return t({message:"Updated!!",severity:"success"}),n}catch(r){return t({message:r.response.data.error,severity:"error"}),null}}));return function(t,n){return e.apply(this,arguments)}}(),w=function(){var e=(0,r.default)((function*(e,t){try{var n=yield j.post("/api/users/create-users",e);return t({message:"Users created successfull",severity:"success"}),n}catch(r){return t({message:r.response.data.error,severity:"error"}),null}}));return function(t,n){return e.apply(this,arguments)}}(),k=n(2629);var S=u.default.create({container:{display:"flex",gap:"1rem",alignItems:"center"},box:{display:"flex",gap:"2rem",padding:"2rem",flexDirection:"column"},shape:{height:"15rem",width:"100%","-webkit-clip-path":" circle(63.3% at 59% 12%)","clip-path":"circle(63.3% at 59% 12%)",backgroundColor:"#0E2375"},image:{height:200,width:200,marginTop:"3rem"},button:{backgroundColor:"#0E2375",borderRadius:10}});const C=function(){var e=(0,d.useState)(!1),t=(0,a.default)(e,2),i=t[0],l=t[1],o=(0,d.useState)(!0),u=(0,a.default)(o,2),j=u[0],p=u[1],g=(0,d.useContext)(ke),y=function(){var e=(0,r.default)((function*(){var e=document.getElementById("phoneNumber").value,t=document.getElementById("password").value;if(10==e.trim().length)if(0!=t.trim().length){l(!0);var n=yield x({phoneNumber:e,password:t},g.setSnackbarData);l(!1),n&&(localStorage.setItem("jwtToken",n),window.location.reload())}else g.setSnackbarData({message:"Empty password",severity:"error"});else g.setSnackbarData({message:"Number should be 10 digits",severity:"error"})}));return function(){return e.apply(this,arguments)}}();return(0,d.useEffect)((function(){document.title="Login|BV_Finance"}),[]),(0,k.jsxs)(s.default,{style:S.container,children:[(0,k.jsx)(c.default,{style:S.image,source:n(89571)}),(0,k.jsxs)(s.default,{style:S.box,children:[(0,k.jsx)(f.default,{variant:"headlineSmall",children:"Login"}),(0,k.jsx)(h.default,{id:"phoneNumber",mode:"outlined",label:"Phone Number"}),(0,k.jsx)(h.default,{id:"password",mode:"outlined",label:"Password",secureTextEntry:j,right:(0,k.jsx)(h.default.Icon,{onPress:function(){p((function(e){return!e}))},icon:j?"eye-off":"eye"})}),(0,k.jsx)(m.default,{mode:"contained",style:{backgroundColor:i?"#EBEBE4":"blue",borderRadius:"7px"},textColor:"white",onPress:y,disabled:i,children:i?"Please Wait...":"Login"})]})]})};var D=n(83224),O=n(13318),P=n(47324);function E(e){var t=e.children,n=e.alignItems,r=e.justifyContent,a=e.gap;return(0,k.jsx)(s.default,{style:{display:"flex",alignItems:"center",flexDirection:"row",alignItems:n||"center",justifyContent:r||"space-around",gap:a||""},children:t})}function M(e){var t=e.children,n=e.alignItems,r=e.justifyContent,a=e.gap;return(0,k.jsx)(s.default,{style:{display:"flex",flexDirection:"column",alignItems:n||"center",justifyContent:r||"space-around",gap:a||""},children:t})}var B=u.default.create({balance:{padding:"2rem",borderRadius:"10px",backgroundColor:"white"}});const I=function(){var e=(0,d.useContext)(ge);return(0,k.jsx)(P.default,{elevation:3,style:B.balance,children:(0,k.jsxs)(E,{children:[(0,k.jsxs)(M,{alignItems:"flex-start",gap:"1rem",children:[(0,k.jsx)(f.default,{children:"Monthly Balance"}),(0,k.jsxs)(s.default,{style:B.balance_amount,children:[(0,k.jsxs)(f.default,{variant:"titleLarge",children:["\u20b9",JSON.stringify(e.amount.paid)," of"]}),(0,k.jsxs)(f.default,{variant:"titleLarge",children:[" ","\u20b9",JSON.stringify(e.amount.total)]})]})]}),(0,k.jsx)(c.default,{source:n(40584),style:{height:100,width:100,resizeMode:"contain"}})]})})};var R=n(69083),T=n(73938),A=n(5647),z=n(33555),_=n(30466);const N=function(){var e=(0,d.useState)(null),t=(0,a.default)(e,2),n=t[0],i=t[1],l=(0,d.useState)((new Date).getMonth()),o=(0,a.default)(l,2),u=o[0],c=o[1],h=(0,d.useState)((new Date).getFullYear()),m=(0,a.default)(h,2),j=m[0],p=m[1],x=(0,d.useState)({}),y=(0,a.default)(x,2),v=y[0],b=y[1],w=(0,d.useContext)(ge),S=((0,d.useContext)(ke),(0,d.useState)(!0)),C=(0,a.default)(S,2),D=C[0],O=C[1];return(0,d.useEffect)((function(){var e={};Object.keys(w.monthWiseData).map((function(t){if("amount"!==t){var n=t.split("-"),r=n[2]+"-"+n[1]+"-"+(1===n[0].length?"0"+n[0]:n[0]);e[r]=w.monthWiseData[t],e[r].marked=!0}})),b(e)}),[w.monthWiseData]),(0,d.useEffect)((function(){D?O(!1):(0,r.default)((function*(){var e=yield g(u,j,w.setSnackbarData);if(e){var t={};Object.keys(e.data.data.dateWise).map((function(n){if("amount"!==n){var r=n.split("-"),a=r[2]+"-"+r[1]+"-"+(1===r[0].length?"0"+r[0]:r[0]);t[a]=e.data.data.dateWise[n],t[a].marked=!0}})),b(t)}}))()}),[u,j]),(0,k.jsxs)(s.default,{style:{marginTop:"2rem",display:"flex",flexDirection:"column",alignItems:"stretch",gap:"2rem"},children:[(0,k.jsx)(f.default,{style:{alignSelf:"center"},children:"Tap on dates to view payments"}),(0,k.jsx)(R.Calendar,{style:{width:"100%"},renderArrow:function(e){return"left"===e?(0,k.jsx)(T.default,{icon:"menu-left"}):(0,k.jsx)(T.default,{icon:"menu-right"})},markedDates:v,onDayPress:function(e){v[e.dateString]&&i(v[e.dateString])},onMonthChange:function(e){c(e.month-1),p(e.year)}}),(0,k.jsx)(A.default,{children:(0,k.jsxs)(z.default,{visible:null!==n,onDismiss:function(){i(null)},style:{borderRadius:"10px",backgroundColor:"white"},children:[(0,k.jsx)(z.default.Title,{children:"DateWise"}),(0,k.jsxs)(z.default.Content,{children:[n&&n.users.map((function(e){return(0,k.jsxs)(s.default,{children:[(0,k.jsxs)(s.default,{style:{display:"flex",paddingTop:"1rem",paddingBottom:"1rem",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},children:[(0,k.jsxs)(M,{alignItems:"flex-start",children:[(0,k.jsx)(f.default,{children:e.name}),(0,k.jsx)(f.default,{children:e.phoneNumber})]}),(0,k.jsxs)(f.default,{children:[" \u20b9",e.amount]})]}),(0,k.jsx)(_.default,{style:{height:"0.1rem"}})]})})),n&&(0,k.jsx)(f.default,{variant:"titleMedium",style:{marginTop:"1rem"},children:"Total : \u20b9"+JSON.stringify(n.amount)})]})]})})]})};var F={0:"Sunday",1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday"};var W=u.default.create({wrapper:{display:"flex",flexDirection:"row",justifyContent:"space-between",padding:"1rem"},header:{width:"max-content",color:"white",display:"flex",flexDirection:"column"},container:{padding:".5rem",display:"flex",flexDirection:"column",gap:"2rem"}});const U=function(){var e=(0,d.useState)([]),t=(0,a.default)(e,2),n=t[0],i=t[1],l=(0,d.useContext)(ge),o=(0,d.useContext)(ke),u=(0,d.useState)(!1),c=(0,a.default)(u,2),h=c[0],j=c[1],p=function(){var e=(0,r.default)((function*(){if(void 0!==document.getElementById("file").files[0]){j(!0);var e=yield w(n,o.setSnackbarData);j(!1),e&&l.setRefetch((function(e){return!e}))}else o.setSnackbarData({message:"Empty File",severity:"error"})}));return function(){return e.apply(this,arguments)}}();return(0,k.jsxs)(D.default,{style:W.container,children:[(0,k.jsxs)(s.default,{style:W.wrapper,children:[(0,k.jsxs)(s.default,{style:W.header,children:[(0,k.jsx)(f.default,{children:F[(new Date).getDay()]}),(0,k.jsxs)(f.default,{variant:"headlineSmall",children:[(new Date).getDate()," / ",(new Date).getMonth()+1]})]}),(0,k.jsx)(m.default,{mode:"outlined",onPress:function(){localStorage.removeItem("jwtToken"),window.location.reload()},style:{borderRadius:"10px",padding:"0.1rem"},icon:"logout",children:"Logout"})]}),(0,k.jsx)(I,{}),(0,k.jsxs)(s.default,{style:{backgroundColor:"white",borderRadius:"10px",marginTop:"2rem",padding:"2rem",display:"flex",flexDirection:"column",gap:"1rem"},children:[(0,k.jsx)("input",{type:"file",id:"file",accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",onChange:function(e){(0,O.default)(e.target.files[0]).then((function(e,t){var n=[],r=e[0];Object.keys(e).map((function(t){if("0"!==t){e[t];for(var a={},s=0;s<r.length;s++)a[r[s]]=e[t][s];n.push(a)}})),i(n)}))}}),(0,k.jsx)(m.default,{mode:"contained",style:{width:"max-content",borderRadius:"10px",backgroundColor:h?"#EBEBE4":"blue"},onPress:p,disabled:h,children:h?"Please Wait ...":"Upload Excel Sheet"})]}),(0,k.jsx)(N,{})]})};var L=n(4942),H=n(42982),J=n(27447),V=n(86343),$=n(61860),q=n(42193),Y=n(36544),K=n(30582),G=n(80039),Q=n(79857);var X=function(e){var t=e.percentage,n=50,r=2*Math.PI*n,a=10,i=t/100*r;return(0,k.jsx)(s.default,{style:Z.circular,children:(0,k.jsxs)(Q.default,{width:120,height:120,children:[(0,k.jsx)(Q.Circle,{cx:60,cy:60,r:n,fill:"transparent",stroke:"#d1d1d1",strokeWidth:a}),(0,k.jsx)(Q.Circle,{cx:60,cy:60,r:n,fill:"transparent",stroke:"#00796B",strokeWidth:a,strokeDasharray:`${r} ${r}`,strokeDashoffset:r-i}),(0,k.jsx)(Q.Text,{x:60,y:65,textAnchor:"middle",fill:"white",fontSize:"20",children:`${t}%`})]})})},Z=u.default.create({container:{padding:"2rem",backgroundColor:"white",borderRadius:"10px",margin:"2rem",marginBottom:"0rem"},container1:{padding:"2rem",borderRadius:"10px",borderTopLeftRadius:"0",borderTopRightRadius:"0",backgroundColor:"rgb(49, 77, 223)",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"},heading:{fontWeight:"600"},circular:{justifyContent:"center",alignItems:"center"},container3:{padding:"2rem",width:"max-content",borderRadius:"10px",margin:"2rem",marginBottom:"0rem",boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",backgroundColor:"#2a52be"}});const ee=function(e){var t=e.data,n=e.navigation,s=e.setRefetch,i=(0,d.useState)(!1),l=(0,a.default)(i,2),o=l[0],u=l[1],c=(0,d.useState)(!1),h=(0,a.default)(c,2),j=h[0],p=h[1],x=(0,d.useContext)(ge),g=(0,d.useContext)(ke);(0,d.useEffect)((function(){var e=(new Date).getMonth();t.Pays.map((function(t){t.month==e&&u(!0)}))}),[]);var y=function(){var e=(0,r.default)((function*(){p(!0);var e=yield b({paid:!o,id:[t.id]},g.setSnackbarData);p(!1),e&&(u((function(e){return!e})),s((function(e){return!e})),x.setRefetch((function(e){return!e})))}));return function(){return e.apply(this,arguments)}}();return(0,k.jsxs)("div",{children:[(0,k.jsxs)("div",{style:Z.container1,children:[(0,k.jsx)(T.default,{style:{backgroundColor:"white"},icon:"arrow-left-bold",onPress:function(){n.navigate("Home")}}),(0,k.jsxs)(M,{alignItems:"center",children:[(0,k.jsx)(G.default,{color:"white",label:t.name.substring(0,2)}),(0,k.jsx)(f.default,{style:{color:"white",margin:"1rem 0"},variant:"headlineMedium",children:t.name}),(0,k.jsx)(f.default,{style:{color:"white",margin:"1rem 0"},variant:"titleMedium",children:t.phoneNumber}),(0,k.jsxs)(f.default,{style:{color:"white",margin:"1rem"},children:["Since",new Date(t.emiStartDate).toLocaleDateString().split(",")[0]]}),(0,k.jsx)($.default,{icon:o?"check-outline":"timelapse",style:{width:"max-content",border:o?"1px solid green":"1px solid red",backgroundColor:o?"#77dd77":"#DB7093",marginRight:"1rem"},color:"white",label:o?"Paid for this Month":"Not Paid for this Month"}),(0,k.jsx)(m.default,{onPress:y,mode:"contained",disabled:j,textColor:"black",style:{backgroundColor:j?"#EBEBE4":"#F0F8FF",marginTop:"2rem"},children:j?"Please Wait...":o?"Remove From Paid":"Add to Paid"})]})]}),(0,k.jsxs)(M,{alignItems:"center",children:[(0,k.jsx)("div",{style:Z.container3,children:(0,k.jsxs)(M,{alignItems:"center",children:[(0,k.jsx)(f.default,{style:{marginBottom:"1rem",color:"white"},variant:"titleMedium",children:"Months"}),(0,k.jsxs)(f.default,{style:{marginBottom:"1rem",color:"white"},children:[t.monthsAlreadyPaid," months of ",t.loanTenure," months"]}),(0,k.jsx)(X,{percentage:Number(100*t.monthsAlreadyPaid/t.loanTenure).toFixed(2)})]})}),(0,k.jsx)("div",{style:Z.container3,children:(0,k.jsxs)(M,{alignItems:"center",children:[(0,k.jsx)(f.default,{style:{marginBottom:"1rem",color:"white"},variant:"titleMedium",children:"Amount"}),(0,k.jsxs)(f.default,{style:{marginBottom:"1rem",color:"white"},children:["\u20b9",t.totalAmount-t.remainingAmount," of \u20b9",t.totalAmount]}),(0,k.jsx)(X,{percentage:Number(100*(t.totalAmount-t.remainingAmount)/t.totalAmount).toFixed(2)})]})})]}),(0,k.jsx)("div",{style:Z.container,children:(0,k.jsxs)("table",{children:[(0,k.jsxs)("tr",{children:[(0,k.jsx)("td",{children:(0,k.jsx)(f.default,{variant:"titleMedium",children:"Loan Tenure "})}),(0,k.jsxs)("td",{children:[t.loanTenure," Months"]})]}),(0,k.jsxs)("tr",{children:[(0,k.jsx)("td",{children:(0,k.jsx)(f.default,{variant:"titleMedium",children:"Principal Amount"})}),(0,k.jsxs)("td",{children:[" \u20b9",t.principal]})]}),(0,k.jsxs)("tr",{children:[(0,k.jsxs)("td",{children:[(0,k.jsx)(f.default,{variant:"titleMedium",children:"Interest Rate"})," "]}),(0,k.jsxs)("td",{children:[t.interestRate,"%"]})]}),(0,k.jsxs)("tr",{children:[(0,k.jsxs)("td",{children:[(0,k.jsx)(f.default,{variant:"titleMedium",children:"Total Amount"})," "]}),(0,k.jsxs)("td",{children:[" \u20b9",t.totalAmount]})]})]})}),(0,k.jsx)("div",{style:Z.container,children:(0,k.jsxs)("table",{children:[(0,k.jsxs)("tr",{children:[(0,k.jsx)("td",{children:(0,k.jsx)(f.default,{variant:"titleMedium",children:"Remaining Amount"})}),(0,k.jsxs)("td",{children:[" \u20b9",t.remainingAmount]})]}),(0,k.jsxs)("tr",{children:[(0,k.jsx)("td",{children:(0,k.jsx)(f.default,{variant:"titleMedium",children:"Months Paid"})}),(0,k.jsx)("td",{children:t.monthsAlreadyPaid})]})]})}),(0,k.jsxs)("div",{style:Z.container,children:[(0,k.jsx)(f.default,{variant:"titleMedium",children:"Month-wise"}),(0,k.jsx)("table",{children:t.Pays.map((function(e){return(0,k.jsxs)("tr",{children:[(0,k.jsx)("td",{children:(0,k.jsxs)(f.default,{children:[e.date,"/",e.month+1,"/",e.year]})}),(0,k.jsxs)("td",{children:["At ",e.time]})]})}))})]})]})};var te=n(9278),ne=n(91072);var re=u.default.create({container:{display:"flex",alignItems:"center",justifyContent:"space-around",backgroundColor:"#EBEBE4",borderRadius:"10px",marginTop:"2rem"},wrapper:{display:"flex",flexDirection:"column",gap:"1rem"},label:{color:"#808080"}});const ae=function(e){var t=e.state,n=e.dispatch,r=e.totalPages,a=3*Math.ceil(t/3)-2,s=3*Math.ceil(t/3),i=(0,ne.useTheme)();return(0,k.jsxs)("div",{style:re.wrapper,children:[(0,k.jsxs)("div",{style:re.container,children:[(0,k.jsx)(T.default,{onPress:function(){return n({type:"left-most"})},icon:"chevron-double-left"}),(0,k.jsx)(T.default,{onPress:function(){return n({type:"left"})},icon:"menu-left"}),Array.from(Array(s-a+1).keys()).map((function(e){return(0,k.jsx)("div",{onClick:function(){e+a<=r&&n({type:"change",to:e+a})},style:{padding:"10px",borderRadius:"5px",backgroundColor:e+a>r&&"#EBEBE4",backgroundColor:e+a==t?i.colors.inversePrimary:"",opacity:e+a>r&&"50%"},children:e+3*Math.ceil(t/3)-2})})),(0,k.jsx)(T.default,{onPress:function(){return n({type:"right"})},icon:"menu-right"}),(0,k.jsx)(T.default,{onPress:function(){return n({type:"right-most"})},icon:"chevron-double-right"})]}),(0,k.jsxs)("span",{style:re.label,children:[t," of ",r]})]})};function se(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ie(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?se(Object(n),!0).forEach((function(t){(0,L.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):se(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var le=["#89CFF0","#7393B3","#0047AB","#088F8F","#5D3FD3"];var oe=u.default.create({container:{display:"flex",flexDirection:"column",gap:"1rem",margin:"2rem 0"},person:{padding:"1rem",borderRadius:"10px",display:"flex",flexDirection:"row",width:"100%",alignItems:"center ",gap:"1rem",backgroundColor:"white",justifyContent:"space-between"},person__div_1:{display:"flex",flexDirection:"column"},person__div_2:{display:"flex",flexDirection:"column"}});const de=function(e){var t=e.data,n=e.selectedUser,r=e.setSelectedUser,i=e.mode,l=e.navigation,o=Math.ceil(t.length/10),u=(0,d.useReducer)((function(e,n){switch(n.type){case"left":return Math.max(1,e-1);case"right":return Math.min(o,e+1);case"left-most":return 1;case"right-most":return Math.ceil(t.length/10);case"change":return n.to}}),1),c=(0,a.default)(u,2),h=c[0],m=c[1];return(0,k.jsxs)(s.default,{style:oe.container,children:[t.slice(10*(h-1),10*h).map((function(e,t){return(0,k.jsxs)(s.default,{onClick:function(){l.navigate("UserDetails",{data:e})},style:oe.person,children:[0!==i&&(0,k.jsx)(te.default,{onPress:function(t){e.id in n?r((function(t){var n=ie({},t);return delete n[e.id],n})):r((function(t){return ie(ie({},t),{},(0,L.default)({},e.id,e))}))},status:e.id in n?"checked":"unchecked"}),(0,k.jsx)(G.default,{color:"white",size:28,style:{backgroundColor:le[t%le.length]},label:e.name.substring(0,2)}),(0,k.jsxs)(s.default,{style:oe.person__div_1,children:[(0,k.jsx)(f.default,{children:e.name}),(0,k.jsx)(f.default,{children:e.phoneNumber})]}),(0,k.jsxs)(s.default,{style:oe.person__div_2,children:[e.amount&&(0,k.jsxs)(f.default,{children:["\u20b9",e.amount]}),e.endsOn&&(0,k.jsx)(f.default,{style:{color:"blue"},children:e.endsOn})]})]})})),0===t.slice(10*(h-1),10*h).length&&(0,k.jsx)(f.default,{style:{padding:"1rem"},children:"No Users Found"}),(0,k.jsx)(ae,{totalPages:o,state:h,dispatch:m})]})};function ue(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var ce=(0,J.default)();var fe={Name:"name",Date:"endsOn",Amount:"amount"};function he(e){var t=e.navigation,n=(e.route,(0,d.useContext)(ge)),i=(0,d.useContext)(ke),o=(0,d.useState)({}),u=(0,a.default)(o,2),c=u[0],h=u[1],j=(0,d.useState)(n.data),p=(0,a.default)(j,2),x=p[0],g=p[1],v=(0,d.useState)(0),w=(0,a.default)(v,2),S=w[0],C=w[1],D=(0,d.useState)(n.amount),O=(0,a.default)(D,2),P=(O[0],O[1],(0,d.useState)(!1)),M=(0,a.default)(P,2),B=M[0],I=M[1],R=(0,d.useState)(!1),T=(0,a.default)(R,2),A=T[0],z=T[1],N=(0,d.useState)("Amount"),F=(0,a.default)(N,2),W=F[0],U=F[1],J=(0,d.useState)("ascending"),G=(0,a.default)(J,2),Q=G[0],X=G[1],Z=(0,d.useState)(!0),ee=(0,a.default)(Z,2),te=ee[0],ne=ee[1],re=(0,d.useState)(!1),ae=(0,a.default)(re,2),se=ae[0],ie=ae[1],le=function(){var e=(0,r.default)((function*(e){if(13===e.keyCode&&0!==document.getElementById("search-bar").value.length){var t=yield y({searchParam:document.getElementById("search-bar").value,mode:S},i.setSnackbarData);t&&(g(t.data.data),I(!0))}}));return function(t){return e.apply(this,arguments)}}(),oe=function(e,t){return e.sort((function(e,n){var r=e[t],a=n[t];return"endsOn"===t&&(r=new Date(r),a=new Date(a)),r<a?-1:r>a?1:0})),"descending"===Q?(0,H.default)(e).reverse():e};(0,d.useEffect)((function(){var e,t=fe[W];B?e=(0,H.default)(x):0===S?e=(0,H.default)(n.data):1===S?e=(0,H.default)(n.paid):2===S&&(e=(0,H.default)(n.unpaid)),g(oe(e,t))}),[Q,W]),(0,d.useEffect)((function(){if(te)ne(!1);else{var e,t=fe[W];I(!1),0===S?e=(0,H.default)(n.data):1===S?e=(0,H.default)(n.paid):2===S&&(e=(0,H.default)(n.unpaid)),g(oe(e,t)),h([]),document.getElementById("search-bar").value=""}}),[S,n.paid,n.unpaid]);var ce=function(){var e=(0,r.default)((function*(){if(0!==Object.keys(c).length){ie(!0);var e=yield b({id:Object.keys(c),paid:1!=S},i.setSnackbarData);ie(!1),e&&n.setRefetch((function(e){return!e}))}}));return function(){return e.apply(this,arguments)}}();return(0,k.jsxs)(s.default,{style:je.container,children:[(0,k.jsx)(V.default,{onKeyPress:le,id:"search-bar",placeholder:"Phone No./Name"}),B&&(0,k.jsx)(m.default,{icon:"close",onPress:function(){g(0===S?n.data:1==S?n.paid:n.unpaid),I(!1),document.getElementById("search-bar").value=""},style:{width:"max-content"},mode:"contained",children:"Clear search"}),(0,k.jsxs)(E,{children:[(0,k.jsx)($.default,{style:{width:"max-content",border:0===S&&"1px solid blue",backgroundColor:0===S?"blue":"white",marginRight:"2rem"},color:0===S?"white":"black",label:"View All",onPress:function(){return C(0)}}),(0,k.jsx)($.default,{style:{width:"max-content",border:1===S&&"1px solid green",backgroundColor:1===S?"#77dd77":"white",marginRight:"1rem"},color:1===S?"white":"black",label:"Paid",onPress:function(){return C(1)}}),(0,k.jsx)($.default,{style:{width:"max-content",border:2===S&&"1px solid red",backgroundColor:2===S?"#DB7093":"white"},color:2===S?"white":"black",label:"Yet To Pay",onPress:function(){return C(2)}})]}),(0,k.jsxs)(m.default,{onPress:function(){return z((function(e){return!e}))},icon:"chevron-down",mode:"contained-tonal",style:{width:"max-content"},children:[A?"Hide":"Show"," Filters"]}),A&&(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(f.default,{children:"Sort By"}),(0,k.jsx)(q.default,{value:W,onValueChange:U,buttons:[{value:"Date",label:"Date",showSelectedCheck:!0,style:{borderRadius:"0"}},{value:"Amount",label:"Amount",showSelectedCheck:!0},{value:"Name",showSelectedCheck:!0,label:"Name",style:{borderRadius:"0"}}]}),(0,k.jsxs)(Y.default.Row,{value:Q,onValueChange:function(e){null!==e&&X(e)},children:[(0,k.jsx)(Y.default,{icon:"sort-ascending",value:"ascending"}),(0,k.jsx)(Y.default,{icon:"sort-descending",value:"descending"})]})]}),(0,k.jsx)(_.default,{}),Object.keys(c).length>0?(0,k.jsx)(s.default,{style:{display:"flex",gap:"1rem",flexDirection:"row"},children:Object.keys(c).map((function(e){return(0,k.jsx)(K.default,{style:{width:"max-content",borderRadius:"10px"},closeIcon:"close",onClose:function(t){h((function(t){var n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ue(Object(n),!0).forEach((function(t){(0,L.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ue(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t);return delete n[c[e].id],n}))},children:c[e].name})}))}):(0,k.jsx)(k.Fragment,{}),S>0&&Object.keys(c).length>0&&(0,k.jsx)(m.default,{style:{width:"max-content",borderRadius:"10px",backgroundColor:se?"#EBEBE4":"blue"},mode:"contained",onPress:ce,disabled:se,children:se?"Please Wait...":"Move to "+(1==S?"Unpay":"Pay")}),n.fetching?(0,k.jsxs)(s.default,{style:{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",gap:"2rem"},children:[(0,k.jsx)(f.default,{children:"Please Wait..."}),(0,k.jsx)(l.default,{})]}):(0,k.jsx)(de,{setSelectedUser:h,selectedUser:c,navigation:t,data:x,mode:S})]})}function me(e){var t=e.route,n=e.navigation,s=(0,d.useState)(!1),i=(0,a.default)(s,2),o=i[0],u=i[1],c=(0,d.useState)(!0),f=(0,a.default)(c,2),h=f[0],m=f[1],j=(0,d.useState)(null),p=(0,a.default)(j,2),x=p[0],g=p[1],y=(0,d.useContext)(ke);return(0,d.useEffect)((function(){var e=function(){var e=(0,r.default)((function*(){var e=t.params.data,n=yield v(e.id,y.setSnackbarData);n&&g(n.data.data),m(!1)}));return function(){return e.apply(this,arguments)}}();e()}),[o]),(0,k.jsx)("div",{children:h?(0,k.jsx)("div",{style:{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,k.jsx)(l.default,{})}):x&&(0,k.jsx)(ee,{setRefetch:u,navigation:n,data:x})})}var je=u.default.create({container:{padding:"1rem",display:"flex",flexDirection:"column",gap:"2rem"}});const pe=function(e){return e.route,e.navigation,(0,k.jsx)(D.default,{children:(0,k.jsxs)(ce.Navigator,{children:[(0,k.jsx)(ce.Screen,{name:"Home",component:he}),(0,k.jsx)(ce.Screen,{name:"UserDetails",component:me})]})})};var xe=(0,n(88630).default)(),ge=(0,d.createContext)(null);const ye=function(){var e=(0,d.useContext)(ke),t=(0,d.useState)(!1),n=(0,a.default)(t,2),s=n[0],i=n[1],l=(0,d.useState)([]),o=(0,a.default)(l,2),u=o[0],c=o[1],f=(0,d.useState)([]),h=(0,a.default)(f,2),m=h[0],j=h[1],p=(0,d.useState)([]),x=(0,a.default)(p,2),y=x[0],v=x[1],b=(0,d.useState)({}),w=(0,a.default)(b,2),S=w[0],C=w[1],D=(0,d.useState)(!1),O=(0,a.default)(D,2),P=O[0],E=O[1],M=(0,d.useState)({}),B=(0,a.default)(M,2),I=B[0],R=B[1];return(0,d.useEffect)((function(){(0,r.default)((function*(){var t=new Date,n=t.getMonth(),r=t.getFullYear();i(!0);var a=yield g(n,r,e.setSnackbarData);if(i(!1),a){j(a.data.data.paid),v(a.data.data.unpaid);var s=[];a.data.data.paid.map((function(e){return s.push(e)})),a.data.data.unpaid.map((function(e){return s.push(e)})),R(a.data.data.dateWise),c(s);var l=a.data.data.dateWise.amount;C({paid:l.paid,total:l.total})}}))()}),[P]),(0,k.jsx)(ge.Provider,{value:{data:u,paid:m,unpaid:y,amount:S,setRefetch:E,monthWiseData:I,setMonthWiseData:R,fetching:s},children:(0,k.jsxs)(xe.Navigator,{activeColor:"black",inactiveColor:"white",barStyle:{backgroundColor:"rgb(49, 77, 223)"},children:[(0,k.jsx)(xe.Screen,{name:"Home",component:U,options:{tabBarIcon:"home"}}),(0,k.jsx)(xe.Screen,{name:"Users",component:pe,options:{tabBarIcon:"account"}})]})})};function ve(e){return e.isAdmin?(0,k.jsx)(ye,{}):(0,k.jsx)("div",{children:"User"})}function be(){return(0,k.jsx)(k.Fragment,{children:(0,k.jsx)(C,{})})}var we=n(75705);var ke=(0,d.createContext)();function Se(){var e=(0,d.useState)(!0),t=(0,a.default)(e,2),n=t[0],u=t[1],c=(0,d.useState)(null),f=(0,a.default)(c,2),h=f[0],m=f[1],j=(0,d.useState)(!0),x=(0,a.default)(j,2),g=x[0],y=x[1],v=(0,d.useState)(!1),b=(0,a.default)(v,2),w=b[0],S=b[1],C=(0,d.useState)({severity:null,message:null}),D=(0,a.default)(C,2),O=D[0],P=D[1];return(0,d.useEffect)((function(){(0,r.default)((function*(){var e=yield p();e?(m(!0),y(e.data.data.isAdmin),S(e.data.data)):(m(!1),localStorage.removeItem("jwtToken"))}))()}),[]),(0,d.useEffect)((function(){null!==h&&u(!1)}),[h]),(0,k.jsx)(we.default,{children:(0,k.jsx)(ke.Provider,{value:{setSnackbarData:P},children:(0,k.jsx)(i.default,{children:(0,k.jsxs)(s.default,{style:{position:"relative",height:"100%",overflow:"hidden"},children:[n?(0,k.jsx)(l.default,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}):h?(0,k.jsx)(ve,{isAdmin:g,data:w,setLogin:m}):(0,k.jsx)(be,{}),(0,k.jsx)(o.default,{style:{backgroundColor:O&&("error"===O.severity?"red":"green")},visible:null!==O.message,onDismiss:function(){P({severity:null,message:null})},children:O.message})]})})})})}},46700:(e,t,n)=>{var r={"./af":26735,"./af.js":26735,"./ar":79343,"./ar-dz":55300,"./ar-dz.js":55300,"./ar-kw":77947,"./ar-kw.js":77947,"./ar-ly":92882,"./ar-ly.js":92882,"./ar-ma":43030,"./ar-ma.js":43030,"./ar-sa":22971,"./ar-sa.js":22971,"./ar-tn":78662,"./ar-tn.js":78662,"./ar.js":79343,"./az":81672,"./az.js":81672,"./be":39027,"./be.js":39027,"./bg":19107,"./bg.js":19107,"./bm":38932,"./bm.js":38932,"./bn":76218,"./bn-bd":33617,"./bn-bd.js":33617,"./bn.js":76218,"./bo":94527,"./bo.js":94527,"./br":53345,"./br.js":53345,"./bs":67930,"./bs.js":67930,"./ca":60454,"./ca.js":60454,"./cs":13984,"./cs.js":13984,"./cv":64646,"./cv.js":64646,"./cy":71372,"./cy.js":71372,"./da":62978,"./da.js":62978,"./de":32193,"./de-at":56365,"./de-at.js":56365,"./de-ch":29737,"./de-ch.js":29737,"./de.js":32193,"./dv":10872,"./dv.js":10872,"./el":99534,"./el.js":99534,"./en-au":68450,"./en-au.js":68450,"./en-ca":56996,"./en-ca.js":56996,"./en-gb":3864,"./en-gb.js":3864,"./en-ie":39472,"./en-ie.js":39472,"./en-il":40300,"./en-il.js":40300,"./en-in":67078,"./en-in.js":67078,"./en-nz":50472,"./en-nz.js":50472,"./en-sg":28696,"./en-sg.js":28696,"./eo":33550,"./eo.js":33550,"./es":59311,"./es-do":83080,"./es-do.js":83080,"./es-mx":77334,"./es-mx.js":77334,"./es-us":64336,"./es-us.js":64336,"./es.js":59311,"./et":28067,"./et.js":28067,"./eu":88831,"./eu.js":88831,"./fa":67981,"./fa.js":67981,"./fi":17479,"./fi.js":17479,"./fil":20757,"./fil.js":20757,"./fo":9510,"./fo.js":9510,"./fr":78573,"./fr-ca":6805,"./fr-ca.js":6805,"./fr-ch":74170,"./fr-ch.js":74170,"./fr.js":78573,"./fy":80926,"./fy.js":80926,"./ga":60203,"./ga.js":60203,"./gd":92975,"./gd.js":92975,"./gl":76890,"./gl.js":76890,"./gom-deva":24234,"./gom-deva.js":24234,"./gom-latn":97577,"./gom-latn.js":97577,"./gu":55804,"./gu.js":55804,"./he":5377,"./he.js":5377,"./hi":99401,"./hi.js":99401,"./hr":12435,"./hr.js":12435,"./hu":62728,"./hu.js":62728,"./hy-am":88093,"./hy-am.js":88093,"./id":26666,"./id.js":26666,"./is":35187,"./is.js":35187,"./it":62667,"./it-ch":56334,"./it-ch.js":56334,"./it.js":62667,"./ja":62414,"./ja.js":62414,"./jv":29359,"./jv.js":29359,"./ka":78740,"./ka.js":78740,"./kk":9521,"./kk.js":9521,"./km":21679,"./km.js":21679,"./kn":58554,"./kn.js":58554,"./ko":50686,"./ko.js":50686,"./ku":75965,"./ku.js":75965,"./ky":24780,"./ky.js":24780,"./lb":56950,"./lb.js":56950,"./lo":9434,"./lo.js":9434,"./lt":43681,"./lt.js":43681,"./lv":82552,"./lv.js":82552,"./me":18473,"./me.js":18473,"./mi":862,"./mi.js":862,"./mk":18932,"./mk.js":18932,"./ml":63174,"./ml.js":63174,"./mn":66863,"./mn.js":66863,"./mr":10566,"./mr.js":10566,"./ms":42215,"./ms-my":54959,"./ms-my.js":54959,"./ms.js":42215,"./mt":38830,"./mt.js":38830,"./my":19336,"./my.js":19336,"./nb":48113,"./nb.js":48113,"./ne":94005,"./ne.js":94005,"./nl":22699,"./nl-be":2796,"./nl-be.js":2796,"./nl.js":22699,"./nn":29700,"./nn.js":29700,"./oc-lnc":39495,"./oc-lnc.js":39495,"./pa-in":11217,"./pa-in.js":11217,"./pl":98807,"./pl.js":98807,"./pt":19221,"./pt-br":39895,"./pt-br.js":39895,"./pt.js":19221,"./ro":39162,"./ro.js":39162,"./ru":37991,"./ru.js":37991,"./sd":46572,"./sd.js":46572,"./se":64197,"./se.js":64197,"./si":40056,"./si.js":40056,"./sk":17025,"./sk.js":17025,"./sl":20069,"./sl.js":20069,"./sq":1961,"./sq.js":1961,"./sr":35820,"./sr-cyrl":20250,"./sr-cyrl.js":20250,"./sr.js":35820,"./ss":97806,"./ss.js":97806,"./sv":2833,"./sv.js":2833,"./sw":29018,"./sw.js":29018,"./ta":51830,"./ta.js":51830,"./te":2102,"./te.js":2102,"./tet":58711,"./tet.js":58711,"./tg":72615,"./tg.js":72615,"./th":38373,"./th.js":38373,"./tk":43277,"./tk.js":43277,"./tl-ph":76249,"./tl-ph.js":76249,"./tlh":87413,"./tlh.js":87413,"./tr":26726,"./tr.js":26726,"./tzl":29131,"./tzl.js":29131,"./tzm":45683,"./tzm-latn":22174,"./tzm-latn.js":22174,"./tzm.js":45683,"./ug-cn":25104,"./ug-cn.js":25104,"./uk":83778,"./uk.js":83778,"./ur":22753,"./ur.js":22753,"./uz":54345,"./uz-latn":67383,"./uz-latn.js":67383,"./uz.js":54345,"./vi":8201,"./vi.js":8201,"./x-pseudo":57395,"./x-pseudo.js":57395,"./yo":99359,"./yo.js":99359,"./zh-cn":75680,"./zh-cn.js":75680,"./zh-hk":89536,"./zh-hk.js":89536,"./zh-mo":35088,"./zh-mo.js":35088,"./zh-tw":2867,"./zh-tw.js":2867};function a(e){var t=s(e);return n(t)}function s(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=s,e.exports=a,a.id=46700},89571:(e,t,n)=>{"use strict";e.exports=n.p+"static/media/login2.ff5109f542f91096fe19.avif"},40584:(e,t,n)=>{"use strict";e.exports=n.p+"static/media/image.71e63306688ef25786c7.jpg"}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var s=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.loaded=!0,s.exports}n.m=e,(()=>{var e=[];n.O=(t,r,a,s)=>{if(!r){var i=1/0;for(u=0;u<e.length;u++){for(var[r,a,s]=e[u],l=!0,o=0;o<r.length;o++)(!1&s||i>=s)&&Object.keys(n.O).every((e=>n.O[e](r[o])))?r.splice(o--,1):(l=!1,s<i&&(i=s));if(l){e.splice(u--,1);var d=a();void 0!==d&&(t=d)}}return t}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[r,a,s]}})(),n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(r,a){if(1&a&&(r=this(r)),8&a)return r;if("object"===typeof r&&r){if(4&a&&r.__esModule)return r;if(16&a&&"function"===typeof r.then)return r}var s=Object.create(null);n.r(s);var i={};e=e||[null,t({}),t([]),t(t)];for(var l=2&a&&r;"object"==typeof l&&!~e.indexOf(l);l=t(l))Object.getOwnPropertyNames(l).forEach((e=>i[e]=()=>r[e]));return i.default=()=>r,n.d(s,i),s}})(),n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),n.p="/",(()=>{var e={179:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var a,s,[i,l,o]=r,d=0;if(i.some((t=>0!==e[t]))){for(a in l)n.o(l,a)&&(n.m[a]=l[a]);if(o)var u=o(n)}for(t&&t(r);d<i.length;d++)s=i[d],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(u)},r=self.webpackChunkweb=self.webpackChunkweb||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var r=n.O(void 0,[891],(()=>n(15530)));r=n.O(r)})();
//# sourceMappingURL=main.a9d8cf61.js.map