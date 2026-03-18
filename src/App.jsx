import { useState, useMemo, useCallback } from "react";
import { AreaChart, Area, BarChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, CartesianGrid, ComposedChart } from "recharts";
import { TrendingUp, BarChart3, Users, Layers, ArrowRight, Activity, DollarSign, Globe, Zap, Shield, ChevronRight, Calendar, Filter } from "lucide-react";

var B={pri:"#1B3A5C",acc:"#2577A3",gld:"#C8A951",bg:"#F4F6F8",bdr:"#E4E8ED",t1:"#1A2332",t2:"#5A6B7F",t3:"#94A3B5"};
var CH={eth:"#5B7FD1",sol:"#9B6FD4",arb:"#3BA4D9",stl:"#3BBFA0"};
var TX={"Real-World Payment":"#2E9E6E","Investment/Trade":"#D4943A","Store as Value":"#8B6FBF"};
var PC=["#5B7FD1","#9B6FD4","#3BA4D9","#3BBFA0","#D4943A","#CF5C5C","#2E9E6E","#8B6FBF","#D97FAE","#5C6FD4"];
var CC={Infrastructure:"#5B7FD1",Issuer:"#9B6FD4",DeFi:"#2E9E6E",Exchange:"#D4943A",Contracts:"#3BA4D9"};
function fmt(v){if(!v&&v!==0)return"—";if(v>=1e9)return"$"+(v/1e9).toFixed(2)+"B";if(v>=1e6)return"$"+(v/1e6).toFixed(1)+"M";if(v>=1e3)return"$"+(v/1e3).toFixed(0)+"K";return"$"+Math.round(v)}
function fA(v){if(v>=1e9)return(v/1e9).toFixed(1)+"B";if(v>=1e6)return(v/1e6).toFixed(0)+"M";if(v>=1e3)return(v/1e3).toFixed(0)+"K";return String(v)}
function fN(v){if(v>=1e6)return(v/1e6).toFixed(1)+"M";if(v>=1e3)return(v/1e3).toFixed(1)+"K";return String(v)}
var AX={fontSize:10,fill:B.t3};

// Daily data (every 3 days, 12 months)
var DAILY=[{d:"2025-03-17",su:763994975,vo:103988729,tx:58621,av:22279972},{d:"2025-03-23",su:844497347,vo:22485710,tx:31147,av:6263528},{d:"2025-03-29",su:802757756,vo:118148464,tx:42498,av:19963040},{d:"2025-04-04",su:732893986,vo:163830816,tx:47181,av:16678690},{d:"2025-04-10",su:807473647,vo:285074435,tx:43605,av:76450970},{d:"2025-04-16",su:837275555,vo:340599788,tx:48131,av:76040433},{d:"2025-04-22",su:879223731,vo:246207219,tx:47988,av:58295460},{d:"2025-04-28",su:865684121,vo:125813305,tx:89081,av:20111990},{d:"2025-05-04",su:941364069,vo:152019010,tx:106852,av:43172900},{d:"2025-05-10",su:929992307,vo:42213536,tx:69579,av:8054078},{d:"2025-05-16",su:899180047,vo:131247086,tx:80187,av:28871426},{d:"2025-05-22",su:891771375,vo:163093656,tx:79852,av:41675937},{d:"2025-05-28",su:877092695,vo:157004661,tx:77429,av:36076176},{d:"2025-06-03",su:978354832,vo:213469406,tx:61385,av:83616584},{d:"2025-06-09",su:1012444532,vo:268241971,tx:43836,av:60304321},{d:"2025-06-15",su:967343379,vo:15949408,tx:45762,av:4985766},{d:"2025-06-21",su:988931263,vo:37205056,tx:38980,av:4950034},{d:"2025-06-27",su:967246906,vo:97532450,tx:47841,av:19371475},{d:"2025-07-03",su:867329594,vo:210132574,tx:73694,av:47916145},{d:"2025-07-09",su:898006952,vo:257671344,tx:58811,av:99296995},{d:"2025-07-15",su:841399454,vo:193767282,tx:64022,av:41592697},{d:"2025-07-21",su:847196978,vo:171501081,tx:86328,av:40259215},{d:"2025-07-27",su:890830322,vo:21770431,tx:76286,av:12682108},{d:"2025-08-02",su:1012256551,vo:36672160,tx:78299,av:7537213},{d:"2025-08-08",su:1034262413,vo:129611267,tx:81433,av:33661683},{d:"2025-08-14",su:1180812351,vo:382674203,tx:157027,av:98867852},{d:"2025-08-20",su:1193319150,vo:1956130212,tx:61429,av:211109920},{d:"2025-08-26",su:1176021742,vo:133159679,tx:60573,av:59761839},{d:"2025-09-01",su:1175165906,vo:80344607,tx:52496,av:27216948},{d:"2025-09-07",su:1185912086,vo:11985674,tx:24076,av:4666362},{d:"2025-09-13",su:1347673660,vo:118632487,tx:33286,av:8969013},{d:"2025-09-19",su:1384831082,vo:526822469,tx:53073,av:100892999},{d:"2025-09-25",su:1878534339,vo:932264541,tx:123722,av:56616547},{d:"2025-10-01",su:2445595226,vo:959682877,tx:64545,av:131026710},{d:"2025-10-07",su:2521288479,vo:1055248644,tx:50285,av:76190306},{d:"2025-10-13",su:2546630449,vo:792928356,tx:63098,av:91816462},{d:"2025-10-19",su:2746663339,vo:719566295,tx:38813,av:32768402},{d:"2025-10-25",su:2782541497,vo:673531309,tx:50017,av:8059336},{d:"2025-10-31",su:2815130409,vo:923085011,tx:92132,av:36849827},{d:"2025-11-06",su:2792487471,vo:1662004108,tx:76150,av:131720003},{d:"2025-11-12",su:3316829398,vo:1953124141,tx:59845,av:474529671},{d:"2025-11-18",su:3531696683,vo:1416690614,tx:65756,av:146969168},{d:"2025-11-24",su:3735762267,vo:1520008529,tx:77900,av:157869145},{d:"2025-11-30",su:3867266724,vo:959102858,tx:84798,av:27407166},{d:"2025-12-06",su:3845967665,vo:1252092597,tx:70120,av:20089685},{d:"2025-12-12",su:3875493626,vo:1492331975,tx:94617,av:54994759},{d:"2025-12-18",su:3876888523,vo:398985677,tx:85870,av:46718142},{d:"2025-12-24",su:3718840181,vo:923913923,tx:70276,av:122356627},{d:"2025-12-30",su:3540484233,vo:1021635263,tx:78653,av:169371336},{d:"2026-01-05",su:3632791911,vo:515860010,tx:87309,av:87129195},{d:"2026-01-11",su:3681574796,vo:183967056,tx:57018,av:17371076},{d:"2026-01-17",su:3719692182,vo:227315693,tx:47434,av:35019410},{d:"2026-01-23",su:3755299551,vo:1161534830,tx:52450,av:220988384},{d:"2026-01-29",su:3824419132,vo:968836043,tx:62985,av:137083824},{d:"2026-02-04",su:3572564372,vo:982233236,tx:74575,av:72875968},{d:"2026-02-10",su:3900515596,vo:1630300900,tx:59158,av:153600348},{d:"2026-02-16",su:4049405142,vo:616256371,tx:40486,av:39229019},{d:"2026-02-22",su:4080066225,vo:409688011,tx:45889,av:19853886},{d:"2026-02-28",su:4203493920,vo:584859265,tx:59049,av:29219929},{d:"2026-03-06",su:4187936833,vo:977029765,tx:63170,av:82806324},{d:"2026-03-12",su:4110349341,vo:1393116868,tx:63210,av:168795969},{d:"2026-03-15",su:4130660243,vo:415061909,tx:49149,av:12524034}];

var DAU_DATA=[{d:"2025-09-22",v:55699},{d:"2025-10-06",v:20738},{d:"2025-10-20",v:37452},{d:"2025-11-03",v:23288},{d:"2025-11-17",v:21356},{d:"2025-12-01",v:63540},{d:"2025-12-15",v:24938},{d:"2025-12-29",v:30325},{d:"2026-01-12",v:30703},{d:"2026-01-26",v:26429},{d:"2026-02-09",v:24066},{d:"2026-02-23",v:23867},{d:"2026-03-09",v:24252}];
var TXC=[{w:"2025-10-06",t:"Real-World Payment",v:21636022},{w:"2025-10-06",t:"Investment/Trade",v:4573320},{w:"2025-10-06",t:"Store as Value",v:10329406},{w:"2025-11-10",t:"Real-World Payment",v:17213663},{w:"2025-11-10",t:"Investment/Trade",v:5351879},{w:"2025-11-10",t:"Store as Value",v:18270328},{w:"2025-12-08",t:"Real-World Payment",v:18536961},{w:"2025-12-08",t:"Investment/Trade",v:7714697},{w:"2025-12-08",t:"Store as Value",v:13149445},{w:"2026-01-26",t:"Real-World Payment",v:15144807},{w:"2026-01-26",t:"Investment/Trade",v:3205128},{w:"2026-01-26",t:"Store as Value",v:7107424},{w:"2026-02-09",t:"Real-World Payment",v:15681018},{w:"2026-02-09",t:"Investment/Trade",v:2857145},{w:"2026-02-09",t:"Store as Value",v:11765399},{w:"2026-02-23",t:"Real-World Payment",v:21535897},{w:"2026-02-23",t:"Investment/Trade",v:7954210},{w:"2026-02-23",t:"Store as Value",v:9588967},{w:"2026-03-02",t:"Real-World Payment",v:19236743},{w:"2026-03-02",t:"Investment/Trade",v:6426574},{w:"2026-03-02",t:"Store as Value",v:9252178}];
var HD=[{cat:"Token Issuer",v:713152851,p:43.0},{cat:"Infrastructure",v:386466868,p:23.3},{cat:"Smart Contracts",v:209679771,p:12.6},{cat:"DeFi",v:168496822,p:10.2},{cat:"Exchanges",v:168209139,p:10.1},{cat:"Bridges",v:10551495,p:0.6},{cat:"Wallets",v:2274400,p:0.2}];
var TH=[{e:"Paxos",c:"Infrastructure",ch:"Ethereum",b:382010063},{e:"PYUSD Treasury",c:"Issuer",ch:"Ethereum",b:380960855},{e:"PYUSD Treasury",c:"Issuer",ch:"Arbitrum",b:332191997},{e:"Curve Finance",c:"DeFi",ch:"Ethereum",b:106935718},{e:"Crypto.com",c:"Exchange",ch:"Ethereum",b:77169650},{e:"Kamino",c:"DeFi",ch:"Solana",b:44804110},{e:"Coinbase",c:"Exchange",ch:"Ethereum",b:28402691},{e:"Backpack",c:"Exchange",ch:"Solana",b:27469901},{e:"Orca",c:"DeFi",ch:"Solana",b:15977676},{e:"Crypto.com",c:"Exchange",ch:"Solana",b:15405787}];
// Supply by chain (every 6 days, 12 months)
var SUPCHAIN=[{d:"2025-03-17",e:634358391,s:129636585,a:0},{d:"2025-04-10",e:680375831,s:127097816,a:0},{d:"2025-05-04",e:786497897,s:154866172,a:0},{d:"2025-05-28",e:655106686,s:221986009,a:0},{d:"2025-06-21",e:773796551,s:215134712,a:0},{d:"2025-07-15",e:633495547,s:207654045,a:249862},{d:"2025-08-08",e:815877930,s:218134565,a:249918},{d:"2025-09-01",e:943425566,s:231241008,a:249307},{d:"2025-09-25",e:1496307867,s:381726963,a:249424},{d:"2025-10-19",e:1656091572,s:1088063250,a:258418},{d:"2025-11-12",e:2282805470,s:1026502961,a:272537},{d:"2025-12-06",e:2790257226,s:1044164973,a:298229},{d:"2025-12-30",e:2660089991,s:871137702,a:1855697},{d:"2026-01-23",e:2720915870,s:1020038012,a:6946344},{d:"2026-02-16",e:2983717561,s:835990408,a:222296751},{d:"2026-03-12",e:2998446704,s:759340373,a:345160161}];

var VEL=[{d:"2025-09-09",r:.656,j:.102},{d:"2025-09-18",r:4.924,j:.524},{d:"2025-10-15",r:2.254,j:.259},{d:"2025-10-28",r:.564,j:.044},{d:"2025-11-10",r:.707,j:.121},{d:"2025-11-20",r:.405,j:.047},{d:"2025-12-11",r:.418,j:.031},{d:"2025-12-31",r:.663,j:.082},{d:"2026-01-07",r:.305,j:.016},{d:"2026-01-22",r:.407,j:.024},{d:"2026-02-06",r:.838,j:.14},{d:"2026-02-13",r:.35,j:.041},{d:"2026-02-26",r:.366,j:.042},{d:"2026-03-07",r:.516,j:.07},{d:"2026-03-16",r:.28,j:.022}];

function Tip(props){
  if(!props.active||!props.payload||props.payload.length===0)return null;
  return(
    <div style={{background:"#fff",border:"1px solid #E0E4E9",borderRadius:6,padding:"10px 14px",fontSize:12,boxShadow:"0 4px 20px rgba(0,0,0,0.07)"}}>
      <div style={{color:B.t3,fontSize:10,marginBottom:5,fontWeight:600,letterSpacing:0.5}}>{props.label}</div>
      {props.payload.map(function(p,i){return(
        <div key={i} style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:p.color||p.fill,flexShrink:0}}/>
          <span style={{color:B.t2,fontSize:11}}>{p.name}:</span>
          <span style={{color:B.t1,fontWeight:600,fontSize:11}}>{typeof p.value==="number"&&p.value>999?(p.value>=1e6?fmt(p.value):fN(p.value)):p.value}</span>
        </div>
      )})}
    </div>
  );
}

function KPI(props){var Icon=props.icon;return(
  <div style={{background:"#fff",borderRadius:10,padding:"18px 20px",border:"1px solid "+B.bdr,position:"relative",overflow:"hidden"}}>
    {props.accent&&<div style={{position:"absolute",top:0,left:0,right:0,height:3,background:props.accent}}/>}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div>
        <div style={{fontSize:10,color:B.t3,textTransform:"uppercase",letterSpacing:1.2,fontWeight:600,marginBottom:5}}>{props.label}</div>
        <div style={{fontSize:24,fontWeight:700,color:B.t1,lineHeight:1.1}}>{props.value}</div>
        {props.sub&&<div style={{fontSize:11,color:B.t3,marginTop:4}}>{props.sub}</div>}
      </div>
      {Icon&&<div style={{width:34,height:34,borderRadius:8,background:(props.accent||"#eee")+"15",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={16} color={props.accent||B.t3}/></div>}
    </div>
    {props.delta!==undefined&&<div style={{marginTop:6,fontSize:11,fontWeight:600,color:props.delta>=0?"#2E9E6E":"#CF5C5C"}}>{props.delta>=0?"+":""}{props.delta}%</div>}
  </div>
)}

function Panel(props){return(
  <div style={{background:"#fff",borderRadius:10,border:"1px solid "+B.bdr,marginBottom:18,overflow:"hidden"}}>
    <div style={{padding:"18px 22px 0"}}><h3 style={{fontSize:14,fontWeight:700,color:B.t1,margin:0}}>{props.title}</h3>{props.sub&&<p style={{fontSize:11,color:B.t3,margin:"3px 0 0",lineHeight:1.4}}>{props.sub}</p>}</div>
    <div style={{padding:props.noPad?"0":"14px 22px 20px"}}>{props.children}</div>
  </div>
)}

function TimeFilter(props){
  var ranges=["7D","1M","3M","6M","1Y","ALL"];
  return(
    <div style={{display:"flex",gap:2,background:"#F0F2F5",borderRadius:6,padding:2,marginBottom:14}}>
      {ranges.map(function(r){return(
        <button key={r} onClick={function(){props.onChange(r)}} style={{padding:"5px 12px",fontSize:11,fontWeight:props.value===r?600:400,border:"none",borderRadius:4,cursor:"pointer",background:props.value===r?"#fff":"transparent",color:props.value===r?B.t1:B.t3,boxShadow:props.value===r?"0 1px 3px rgba(0,0,0,0.08)":"none",transition:"all 0.15s"}}>{r}</button>
      )})}
    </div>
  );
}

function filterByRange(data, range, dateKey) {
  if (range === "ALL") return data;
  var now = new Date("2026-03-17");
  var ms = {
    "7D": 7*86400000, "1M": 30*86400000, "3M": 90*86400000,
    "6M": 180*86400000, "1Y": 365*86400000
  };
  var cutoff = new Date(now.getTime() - (ms[range] || ms["1Y"]));
  return data.filter(function(r) { return new Date(r[dateKey || "d"]) >= cutoff; });
}

export default function App(){
  var pageState=useState("landing");
  var page=pageState[0], setPage=pageState[1];
  var tabState=useState("overview");
  var tab=tabState[0], setTab=tabState[1];
  var rangeState=useState("6M");
  var range=rangeState[0], setRange=rangeState[1];
  var metricState=useState("supply");
  var metric=metricState[0], setMetric=metricState[1];

  var daily=useMemo(function(){return DAILY.map(function(r){return{d:r.d,supply:r.su,volume:r.vo,txns:r.tx,adjVol:r.av}});},[]);
  var filtered=useMemo(function(){return filterByRange(daily,range,"d");},[daily,range]);
  var dauC=useMemo(function(){return filterByRange(DAU_DATA,range,"d").map(function(r){return{week:r.d,dau:r.v}});},[range]);
  var velC=useMemo(function(){return filterByRange(VEL,range,"d").map(function(r){return{date:r.d,raw:r.r,adjusted:r.j}});},[range]);
  var txW=useMemo(function(){var g={};filterByRange(TXC,range,"w").forEach(function(r){if(!g[r.w])g[r.w]={week:r.w};g[r.w][r.t]=r.v});return Object.values(g).sort(function(a,c){return a.week.localeCompare(c.week)});},[range]);

  var supChainC=useMemo(function(){return filterByRange(SUPCHAIN,range,"d").map(function(r){return{d:r.d,Ethereum:r.e,Solana:r.s,Arbitrum:r.a}});},[range]);

  var latest=daily.length>0?daily[daily.length-1]:{supply:0,volume:0,txns:0};
  var ts=latest.supply;
  var avgVol=filtered.length>0?filtered.reduce(function(a,c){return a+c.volume},0)/filtered.length:0;
  var totalVol=filtered.reduce(function(a,c){return a+c.volume},0);
  var avgTxns=filtered.length>0?Math.round(filtered.reduce(function(a,c){return a+c.txns},0)/filtered.length):0;
  var ld=DAU_DATA.length>0?DAU_DATA[DAU_DATA.length-1].v:0;
  var ad=DAU_DATA.length>0?Math.round(DAU_DATA.reduce(function(a,c){return a+c.v},0)/DAU_DATA.length):0;
  var yoy=ts>0?Math.round((ts-763994975)/763994975*100):0;
  var prev30=daily.length>10?daily[daily.length-10].supply:ts;
  var supDelta=prev30>0?((ts-prev30)/prev30*100).toFixed(1):0;

  /* LANDING */
  if(page==="landing"){return(
    <div style={{background:"#fff",minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{borderBottom:"1px solid "+B.bdr,position:"sticky",top:0,zIndex:20,background:"#fff"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",height:56}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:30,height:30,borderRadius:7,background:"linear-gradient(135deg,#1B3A5C,#2E7D9B)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:"#fff"}}>P</div>
            <span style={{fontSize:16,fontWeight:700,color:B.t1}}>PYUSD Analytics</span>
          </div>
          <button onClick={function(){setPage("dash");setTab("overview")}} style={{background:B.pri,color:"#fff",border:"none",borderRadius:6,padding:"8px 20px",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>Open Dashboard <ArrowRight size={14}/></button>
        </div>
      </div>
      <div style={{background:"linear-gradient(160deg,#0F1923 0%,#1B3A5C 40%,#2E7D9B 80%,#4AACCC 100%)",padding:"72px 32px 64px"}}>
        <div style={{maxWidth:1100,margin:"0 auto",maxWidth2:640}}>
          <div style={{maxWidth:620}}>
            <div style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:2,marginBottom:12}}>Institutional Stablecoin Intelligence</div>
            <h1 style={{fontSize:42,fontWeight:800,color:"#fff",margin:"0 0 16px",lineHeight:1.15}}>PayPal USD on-chain analytics</h1>
            <p style={{fontSize:16,color:"rgba(255,255,255,0.6)",lineHeight:1.6,margin:"0 0 28px"}}>Supply, volume, active users, holder composition, payment attribution, and velocity across Ethereum, Solana, Arbitrum, and Stellar — powered by Allium.</p>
            <div style={{display:"flex",gap:12}}>
              <button onClick={function(){setPage("dash");setTab("overview")}} style={{background:"#fff",color:B.pri,border:"none",borderRadius:8,padding:"12px 28px",fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>Explore Dashboard <ArrowRight size={16}/></button>
              <button onClick={function(){setPage("dash");setTab("volume")}} style={{background:"rgba(255,255,255,0.12)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"12px 24px",fontSize:14,fontWeight:600,cursor:"pointer"}}>Volume & Activity</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{background:"#fff",borderBottom:"1px solid "+B.bdr}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 32px",display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
          {[{l:"Total Supply",v:fmt(ts)},{l:"Avg Daily Volume",v:fmt(avgVol)},{l:"Weekly Active Users",v:ld.toLocaleString()},{l:"YoY Supply Growth",v:yoy+"%"}].map(function(s,i){return(
            <div key={i} style={{padding:"18px 0",borderRight:i<3?"1px solid "+B.bdr:"none",paddingLeft:i>0?20:0}}>
              <div style={{fontSize:10,color:B.t3,textTransform:"uppercase",letterSpacing:1,fontWeight:600}}>{s.l}</div>
              <div style={{fontSize:22,fontWeight:700,color:B.t1,marginTop:3}}>{s.v}</div>
            </div>
          )})}
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"48px 32px"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <h2 style={{fontSize:26,fontWeight:700,color:B.t1,margin:"0 0 6px"}}>Comprehensive PYUSD Intelligence</h2>
          <p style={{fontSize:14,color:B.t2,margin:0}}>31 Allium SQL queries powering 6 analytical views with time-range filtering</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {[{icon:DollarSign,t:"Supply",d:"Circulating supply across 4 chains with mint/burn tracking.",cl:CH.eth,tb:"supply"},{icon:Activity,t:"Volume & Activity",d:"Transfer volume, DAU, transaction classification by chain.",cl:CH.sol,tb:"volume"},{icon:Users,t:"Holders",d:"Entity-labeled holder composition and top wallet analysis.",cl:CH.arb,tb:"holders"},{icon:Layers,t:"Payments",d:"C2C, C2B, B2B attribution of real PYUSD usage.",cl:"#2E9E6E",tb:"payments"},{icon:Zap,t:"Velocity",d:"Supply turnover with entity-adjusted filtering.",cl:B.gld,tb:"velocity"},{icon:Globe,t:"Market Share",d:"PYUSD vs total USD stablecoin benchmarking.",cl:"#CF5C5C",tb:"overview"}].map(function(f,i){return(
            <div key={i} onClick={function(){setPage("dash");setTab(f.tb)}} style={{border:"1px solid "+B.bdr,borderRadius:10,padding:"22px",cursor:"pointer",transition:"all 0.2s"}}>
              <div style={{width:36,height:36,borderRadius:7,background:f.cl+"15",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><f.icon size={18} color={f.cl}/></div>
              <h3 style={{fontSize:14,fontWeight:700,color:B.t1,margin:"0 0 4px"}}>{f.t}</h3>
              <p style={{fontSize:12,color:B.t2,margin:"0 0 10px",lineHeight:1.5}}>{f.d}</p>
              <div style={{fontSize:11,color:f.cl,fontWeight:600,display:"flex",alignItems:"center",gap:3}}>Explore <ChevronRight size={13}/></div>
            </div>
          )})}
        </div>
      </div>
      <div style={{borderTop:"1px solid "+B.bdr,padding:"20px 32px",textAlign:"center"}}><p style={{fontSize:11,color:B.t3,margin:0}}>Data from Allium crosschain stablecoin schemas. PYUSD by PayPal / Paxos.</p></div>
    </div>
  )}

  /* DASHBOARD */
  var tabs=[{id:"overview",l:"Overview",ic:BarChart3},{id:"supply",l:"Supply",ic:Layers},{id:"volume",l:"Volume & Activity",ic:Activity},{id:"holders",l:"Holders",ic:Users},{id:"payments",l:"Payments",ic:DollarSign},{id:"velocity",l:"Velocity",ic:Zap},{id:"methodology",l:"Methodology",ic:Shield}];

  return(
    <div style={{background:B.bg,minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",color:B.t1}}>
      <div style={{background:"linear-gradient(135deg,#0F1923 0%,#1B3A5C 60%,#2E7D9B 100%)",padding:"16px 0 14px"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={function(){setPage("landing")}}>
            <div style={{width:30,height:30,borderRadius:7,background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:"#fff",border:"1px solid rgba(255,255,255,0.15)"}}>P</div>
            <div><div style={{fontSize:16,fontWeight:700,color:"#fff"}}>PYUSD Analytics</div><div style={{fontSize:10,color:"rgba(255,255,255,0.4)"}}>Institutional Stablecoin Intelligence</div></div>
          </div>
          <div style={{display:"flex",gap:5}}><div style={{background:"rgba(255,255,255,0.08)",borderRadius:4,padding:"3px 9px",fontSize:10,color:"rgba(255,255,255,0.5)"}}>Allium Data</div><div style={{background:"rgba(46,158,110,0.2)",borderRadius:4,padding:"3px 9px",fontSize:10,color:"#6FD9A5"}}>31 queries</div></div>
        </div>
      </div>
      <div style={{background:"#fff",borderBottom:"1px solid "+B.bdr,position:"sticky",top:0,zIndex:10}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px",display:"flex",gap:0,overflowX:"auto"}}>
          {tabs.map(function(t){var Icon=t.ic;return(
            <button key={t.id} onClick={function(){setTab(t.id)}} style={{padding:"10px 16px",fontSize:12,fontWeight:tab===t.id?600:400,cursor:"pointer",border:"none",background:"transparent",color:tab===t.id?B.pri:B.t3,borderBottom:tab===t.id?"2px solid "+B.acc:"2px solid transparent",display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap",flexShrink:0}}><Icon size={13}/>{t.l}</button>
          )})}
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"20px 24px 40px"}}>
        {/* Global time filter for applicable tabs */}
        {(tab==="overview"||tab==="supply"||tab==="volume"||tab==="velocity")&&(
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}><Calendar size={14} color={B.t3}/><span style={{fontSize:12,color:B.t2,fontWeight:500}}>Time Range</span></div>
            <TimeFilter value={range} onChange={setRange}/>
          </div>
        )}

        {tab==="overview"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:18}}>
              <KPI label="Total Supply" value={fmt(ts)} sub="Across 4 chains" accent={B.acc} icon={DollarSign} delta={Number(supDelta)}/>
              <KPI label="Avg Daily Volume" value={fmt(avgVol)} sub={range+" period"} accent={CH.sol} icon={Activity}/>
              <KPI label="Weekly Active Users" value={ld.toLocaleString()} sub={"Avg: "+ad.toLocaleString()} accent={CH.arb} icon={Users}/>
              <KPI label="YoY Growth" value={yoy+"%"} sub="Supply since Mar '25" accent={CH.eth} icon={TrendingUp}/>
              <KPI label="Avg Daily Txns" value={avgTxns.toLocaleString()} sub={range+" period"} accent={B.gld} icon={BarChart3}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:16}}>
              <Panel title="Circulating Supply" sub="Total PYUSD supply over time">
                <ResponsiveContainer width="100%" height={260}><AreaChart data={filtered} margin={{left:8,right:8,top:8,bottom:4}}>
                  <defs><linearGradient id="gSup" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={B.acc} stopOpacity={0.3}/><stop offset="100%" stopColor={B.acc} stopOpacity={0.02}/></linearGradient></defs>
                  <CartesianGrid stroke="#F0F2F4" vertical={false}/><XAxis dataKey="d" tick={AX} tickFormatter={function(v){return v.slice(2,7)}} interval={Math.max(1,Math.floor(filtered.length/6))} axisLine={{stroke:B.bdr}} tickLine={false}/><YAxis tick={AX} tickFormatter={fA} axisLine={false} tickLine={false}/><Tooltip content={<Tip/>}/>
                  <Area type="monotone" dataKey="supply" stroke={B.acc} fill="url(#gSup)" strokeWidth={2} name="Supply (USD)"/>
                </AreaChart></ResponsiveContainer>
              </Panel>
              <Panel title="Weekly Active Users" sub={"6mo avg: "+ad.toLocaleString()}>
                <ResponsiveContainer width="100%" height={260}><AreaChart data={dauC} margin={{left:8,right:8,top:8,bottom:4}}>
                  <defs><linearGradient id="gDau" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CH.arb} stopOpacity={0.3}/><stop offset="100%" stopColor={CH.arb} stopOpacity={0.02}/></linearGradient></defs>
                  <CartesianGrid stroke="#F0F2F4" vertical={false}/><XAxis dataKey="week" tick={AX} tickFormatter={function(v){return v.slice(2,7)}} interval={Math.max(1,Math.floor(dauC.length/5))} axisLine={{stroke:B.bdr}} tickLine={false}/><YAxis tick={AX} tickFormatter={fN} axisLine={false} tickLine={false}/><Tooltip content={<Tip/>}/>
                  <Area type="monotone" dataKey="dau" stroke={CH.arb} fill="url(#gDau)" strokeWidth={2} name="Active Addresses"/>
                </AreaChart></ResponsiveContainer>
              </Panel>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <Panel title="Transfer Volume" sub="Daily transfer volume USD">
                <ResponsiveContainer width="100%" height={200}><BarChart data={filtered} margin={{left:8,right:8,top:8,bottom:4}}><CartesianGrid stroke="#F0F2F4" vertical={false}/><XAxis dataKey="d" tick={AX} tickFormatter={function(v){return v.slice(2,7)}} interval={Math.max(1,Math.floor(filtered.length/6))} axisLine={{stroke:B.bdr}} tickLine={false}/><YAxis tick={AX} tickFormatter={fA} axisLine={false} tickLine={false}/><Tooltip content={<Tip/>}/><Bar dataKey="volume" fill={B.acc} fillOpacity={0.7} radius={[2,2,0,0]} name="Volume"/></BarChart></ResponsiveContainer>
              </Panel>
              <Panel title="Daily Transactions" sub="Number of PYUSD transfers">
                <ResponsiveContainer width="100%" height={200}><BarChart data={filtered} margin={{left:8,right:8,top:8,bottom:4}}><CartesianGrid stroke="#F0F2F4" vertical={false}/><XAxis dataKey="d" tick={AX} tickFormatter={function(v){return v.slice(2,7)}} interval={Math.max(1,Math.floor(filtered.length/6))} axisLine={{stroke:B.bdr}} tickLine={false}/><YAxis tick={AX} tickFormatter={fN} axisLine={false} tickLine={false}/><Tooltip content={<Tip/>}/><Bar dataKey="txns" fill={CH.sol} fillOpacity={0.7} radius={[2,2,0,0]} name="Transactions"/></BarChart></ResponsiveContainer>
              </Panel>
            </div>
          </div>
        )}

        {tab==="supply"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:18}}>
              {[{l:"Ethereum",v:2973963453,p:"72.5%",c:CH.eth},{l:"Solana",v:776021313,p:"18.9%",c:CH.sol},{l:"Arbitrum",v:343885265,p:"8.4%",c:CH.arb},{l:"Stellar",v:7400735,p:"0.2%",c:CH.stl}].map(function(x,i){return <KPI key={i} label={x.l} value={fmt(x.v)} sub={x.p} accent={x.c}/>})}
            </div>
            <Panel title="Total Supply Over Time" sub="Filtered by selected time range">
              <ResponsiveContainer width="100%" height={300}><AreaChart data={filtered} margin={{left:8,right:8,top:8,bottom:4}}>
                <defs><linearGradient id="gS2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={B.acc} stopOpacity={.25}/><stop offset="100%" stopColor={B.acc} stopOpacity={.02}/></linearGradient></defs>
                <CartesianGrid stroke="#F0F2F4" vertical={false}/><XAxis dataKey="d" tick={AX} tickFormatter={function(v){return v.slice(2,7)}} interval={Math.max(1,Math.floor(filtered.length/7))} axisLine={{stroke:B.bdr}} tickLine={false}/><YAxis tick={AX} tickFormatter={fA} axisLine={false} tickLine={false}/><Tooltip content={<Tip/>}/>
                <Area type="monotone" dataKey="supply" stroke={B.acc} fill="url(#gS2)" strokeWidth={2} name="Supply (USD)"/>
              </AreaChart></ResponsiveContainer>
            </Panel>
            <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:16}}>
              <Panel title="Supply by Chain" sub="Stacked area — Ethereum vs Solana vs Arbitrum breakdown over time">
                <ResponsiveContainer width="100%" height={300}><AreaChart data={supChainC} margin={{left:8,right:8,top:8,bottom:4}}>
                  <defs>
                    <linearGradient id="gcE" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CH.eth} stopOpacity={.35}/><stop offset="100%" stopColor={CH.eth} stopOpacity={.05}/></linearGradient>
                    <linearGradient id="gcS" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CH.sol} stopOpacity={.35}/><stop offset="100%" stopColor={CH.sol} stopOpacity={.05}/></linearGradient>
                    <linearGradient id="gcA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CH.arb} stopOpacity={.35}/><stop offset="100%" stopColor={CH.arb} stopOpacity={.05}/></linearGradient>
                  </defs>
                  <CartesianGrid stroke="#F0F2F4" vertical={false}/><XAxis dataKey="d" tick={AX} tickFormatter={function(v){return v.slice(2,7)}} interval={Math.max(1,Math.floor(supChainC.length/6))} axisLine={{stroke:B.bdr}} tickLine={false}/><YAxis tick={AX} tickFormatter={fA} axisLine={false} tickLine={false}/><Tooltip content={<Tip/>}/>
                  <Area type="monotone" dataKey="Ethereum" stackId="1" stroke={CH.eth} fill="url(#gcE)" strokeWidth={1.5} name="Ethereum"/>
                  <Area type="monotone" dataKey="Solana" stackId="1" stroke={CH.sol} fill="url(#gcS)" strokeWidth={1.5} name="Solana"/>
                  <Area type="monotone" dataKey="Arbitrum" stackId="1" stroke={CH.arb} fill="url(#gcA)" strokeWidth={1.5} name="Arbitrum"/>
                  <Legend wrapperStyle={{fontSize:10}} iconType="circle" iconSize={7}/>
                </AreaChart></ResponsiveContainer>
              </Panel>
              <Panel title="Current Breakdown" sub="March 17, 2026">
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
                  <ResponsiveContainer width={180} height={180}><PieChart><Pie data={[{n:"ETH",v:72.5},{n:"SOL",v:18.9},{n:"ARB",v:8.4},{n:"XLM",v:.2}]} dataKey="v" nameKey="n" cx="50%" cy="50%" outerRadius={80} innerRadius={48} paddingAngle={3} strokeWidth={0}>{[0,1,2,3].map(function(i){return <Cell key={i} fill={PC[i]}/>})}</Pie></PieChart></ResponsiveContainer>
                  <div style={{width:"100%"}}>{[{n:"Ethereum",p:"72.5%",v:"$2.97B",c:CH.eth},{n:"Solana",p:"18.9%",v:"$776M",c:CH.sol},{n:"Arbitrum",p:"8.4%",v:"$344M",c:CH.arb},{n:"Stellar",p:"0.2%",v:"$7.4M",c:CH.stl}].map(function(e,i){return(
                    <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:i<3?"1px solid "+B.bdr:"none",minWidth:200}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:10,height:10,borderRadius:3,background:e.c}}/><span style={{fontSize:13,fontWeight:500}}>{e.n}</span></div>
                      <div><span style={{fontSize:13,fontWeight:600}}>{e.v}</span><span style={{fontSize:11,color:B.t3,marginLeft:6}}>{e.p}</span></div>
                    </div>
                  )})}</div>
                </div>
              </Panel>
            </div>
          </div>
        )}

        {tab==="volume"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:18}}>
              <KPI label="Avg Daily Vol" value={fmt(avgVol)} sub={range+" period"} accent={B.acc} icon={Activity}/>
              <KPI label="Total Volume" value={fmt(totalVol)} sub={range+" period"} accent={CH.eth} icon={DollarSign}/>
              <KPI label="Avg Daily Txns" value={avgTxns.toLocaleString()} sub={range+" period"} accent={CH.sol} icon={BarChart3}/>
              <KPI label="Weekly DAU" value={ld.toLocaleString()} sub={"Avg: "+ad.toLocaleString()} accent={CH.arb} icon={Users}/>
            </div>
            {/* Metric toggle */}
            <div style={{display:"flex",gap:2,background:"#F0F2F5",borderRadius:6,padding:2,marginBottom:14,width:"fit-content"}}>
              {["volume","adjVol","txns"].map(function(m){var labels={volume:"Raw Volume",adjVol:"Adjusted Volume",txns:"Transactions"};return(
                <button key={m} onClick={function(){setMetric(m)}} style={{padding:"5px 14px",fontSize:11,fontWeight:metric===m?600:400,border:"none",borderRadius:4,cursor:"pointer",background:metric===m?"#fff":"transparent",color:metric===m?B.t1:B.t3,boxShadow:metric===m?"0 1px 3px rgba(0,0,0,0.08)":"none"}}>{labels[m]}</button>
              )})}
            </div>
            <Panel title={metric==="txns"?"Daily Transactions":metric==="adjVol"?"Entity-Adjusted Volume":"Daily Transfer Volume"} sub="Filtered by time range — toggle between metrics above">
              <ResponsiveContainer width="100%" height={300}><BarChart data={filtered} margin={{left:8,right:8,top:8,bottom:4}}><CartesianGrid stroke="#F0F2F4" vertical={false}/><XAxis dataKey="d" tick={AX} tickFormatter={function(v){return v.slice(2,7)}} interval={Math.max(1,Math.floor(filtered.length/8))} axisLine={{stroke:B.bdr}} tickLine={false}/><YAxis tick={AX} tickFormatter={metric==="txns"?fN:fA} axisLine={false} tickLine={false}/><Tooltip content={<Tip/>}/><Bar dataKey={metric} fill={metric==="adjVol"?CH.stl:metric==="txns"?CH.sol:B.acc} fillOpacity={0.75} radius={[3,3,0,0]} name={metric==="txns"?"Transactions":metric==="adjVol"?"Adj Volume":"Volume"}/></BarChart></ResponsiveContainer>
            </Panel>
            <Panel title="Transaction Classification" sub="Real-World Payment vs Investment vs Store of Value">
              <ResponsiveContainer width="100%" height={260}><BarChart data={txW} margin={{left:8,right:8,top:8,bottom:4}}><CartesianGrid stroke="#F0F2F4" vertical={false}/><XAxis dataKey="week" tick={AX} tickFormatter={function(v){return v.slice(2,7)}} axisLine={{stroke:B.bdr}} tickLine={false}/><YAxis tick={AX} tickFormatter={fA} axisLine={false} tickLine={false}/><Tooltip content={<Tip/>}/><Bar dataKey="Real-World Payment" stackId="1" fill={TX["Real-World Payment"]} name="Real-World Payment"/><Bar dataKey="Investment/Trade" stackId="1" fill={TX["Investment/Trade"]} name="Investment/Trade"/><Bar dataKey="Store as Value" stackId="1" fill={TX["Store as Value"]} radius={[3,3,0,0]} name="Store as Value"/><Legend wrapperStyle={{fontSize:10}} iconType="circle" iconSize={7}/></BarChart></ResponsiveContainer>
            </Panel>
            <Panel title="Weekly Active Users" sub="Unique addresses interacting with PYUSD">
              <ResponsiveContainer width="100%" height={220}><AreaChart data={dauC} margin={{left:8,right:8,top:8,bottom:4}}><defs><linearGradient id="gD3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CH.arb} stopOpacity={.25}/><stop offset="100%" stopColor={CH.arb} stopOpacity={.02}/></linearGradient></defs><CartesianGrid stroke="#F0F2F4" vertical={false}/><XAxis dataKey="week" tick={AX} tickFormatter={function(v){return v.slice(2,7)}} interval={Math.max(1,Math.floor(dauC.length/6))} axisLine={{stroke:B.bdr}} tickLine={false}/><YAxis tick={AX} tickFormatter={fN} axisLine={false} tickLine={false}/><Tooltip content={<Tip/>}/><Area type="monotone" dataKey="dau" stroke={CH.arb} fill="url(#gD3)" strokeWidth={2} name="Active Addresses"/></AreaChart></ResponsiveContainer>
            </Panel>
          </div>
        )}

        {tab==="holders"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <Panel title="Holder Composition" sub="By entity category">
                <div style={{display:"flex",alignItems:"center",gap:16}}>
                  <ResponsiveContainer width={160} height={160}><PieChart><Pie data={HD} dataKey="v" nameKey="cat" cx="50%" cy="50%" outerRadius={70} innerRadius={35} paddingAngle={2} strokeWidth={0}>{HD.map(function(_,i){return <Cell key={i} fill={PC[i]}/>})}</Pie></PieChart></ResponsiveContainer>
                  <div style={{flex:1}}>{HD.map(function(e,i){return(<div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"4px 0",borderBottom:i<HD.length-1?"1px solid "+B.bdr:""}}><div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:8,height:8,borderRadius:2,background:PC[i]}}/><span style={{fontSize:11,color:B.t2}}>{e.cat}</span></div><span style={{fontSize:11,fontWeight:600}}>{e.p}%</span></div>)})}</div>
                </div>
              </Panel>
              <Panel title="Key Insight" sub="Concentration analysis">
                <div style={{fontSize:13,color:B.t2,lineHeight:1.7}}>
                  <p style={{margin:"0 0 8px"}}>Infrastructure + issuer treasury = <b style={{color:B.t1}}>66.3%</b> of tracked supply. DeFi and exchanges each hold ~<b style={{color:B.t1}}>10%</b>.</p>
                </div>
              </Panel>
            </div>
            <Panel title="Top PYUSD Holders" sub="By USD balance" noPad>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr style={{borderTop:"1px solid "+B.bdr,borderBottom:"1px solid "+B.bdr,background:"#F7F8FA"}}>{["#","Entity","Type","Chain","Balance","Share"].map(function(h){return <th key={h} style={{textAlign:"left",padding:"9px 14px",color:B.t3,fontWeight:600,fontSize:10,textTransform:"uppercase",letterSpacing:.5}}>{h}</th>})}</tr></thead>
                <tbody>{TH.map(function(h,i){return(<tr key={i} style={{borderBottom:"1px solid "+B.bdr}}><td style={{padding:"9px 14px",color:B.t3,fontWeight:600}}>{i+1}</td><td style={{padding:"9px 14px",fontWeight:600}}>{h.e}</td><td style={{padding:"9px 14px"}}><span style={{background:(CC[h.c]||B.t3)+"15",color:CC[h.c]||B.t3,padding:"2px 7px",borderRadius:4,fontSize:10,fontWeight:500}}>{h.c}</span></td><td style={{padding:"9px 14px",color:B.t2}}>{h.ch}</td><td style={{padding:"9px 14px",fontWeight:600}}>{fmt(h.b)}</td><td style={{padding:"9px 14px",color:B.t3}}>{(h.b/ts*100).toFixed(1)}%</td></tr>)})}</tbody>
              </table>
            </Panel>
          </div>
        )}

        {tab==="payments"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:18}}>
              <KPI label="Top (Count)" value="C2B" sub="3,091 txns" accent={TX["Real-World Payment"]} icon={Users}/>
              <KPI label="Top (Volume)" value="Institutional" sub="$8.5M deposits" accent={TX["Investment/Trade"]} icon={DollarSign}/>
              <KPI label="Avg C2B" value="$169" sub="Week of Mar 2" accent={TX["Store as Value"]} icon={Activity}/>
            </div>
            <Panel title="Use-Case Classification" sub="Weekly volume by type">
              <ResponsiveContainer width="100%" height={270}><BarChart data={txW} margin={{left:8,right:8,top:8,bottom:4}}><CartesianGrid stroke="#F0F2F4" vertical={false}/><XAxis dataKey="week" tick={AX} tickFormatter={function(v){return v.slice(2,7)}} axisLine={{stroke:B.bdr}} tickLine={false}/><YAxis tick={AX} tickFormatter={fA} axisLine={false} tickLine={false}/><Tooltip content={<Tip/>}/><Bar dataKey="Real-World Payment" stackId="1" fill={TX["Real-World Payment"]} name="Real-World Payment"/><Bar dataKey="Investment/Trade" stackId="1" fill={TX["Investment/Trade"]} name="Investment/Trade"/><Bar dataKey="Store as Value" stackId="1" fill={TX["Store as Value"]} radius={[3,3,0,0]} name="Store as Value"/><Legend wrapperStyle={{fontSize:10}} iconType="circle" iconSize={7}/></BarChart></ResponsiveContainer>
            </Panel>
            <Panel title="Payment Attribution" sub="Week of Mar 2-8, 2026">
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>{[{n:"Deposit to Inst.",v:8548072,c:29154,cl:PC[5]},{n:"C2C Payment",v:545702,c:1881,cl:PC[0]},{n:"C2B Payment",v:523638,c:3091,cl:PC[6]},{n:"B2B Payment",v:150411,c:28,cl:PC[3]},{n:"B2C Payment",v:72652,c:80,cl:PC[1]},{n:"Institutional",v:1128,c:4,cl:PC[7]}].map(function(p,i){return(<div key={i} style={{background:"#F7F8FA",borderRadius:8,padding:"12px 14px",borderLeft:"3px solid "+p.cl}}><div style={{fontSize:10,color:B.t3,fontWeight:500,marginBottom:3}}>{p.n}</div><div style={{fontSize:18,fontWeight:700}}>{fmt(p.v)}</div><div style={{fontSize:10,color:B.t3,marginTop:2}}>{p.c.toLocaleString()} txns</div></div>)})}</div>
            </Panel>
          </div>
        )}

        {tab==="velocity"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:18}}>
              <KPI label="Current (Raw)" value="0.28x" sub="Mar 16" accent={CH.eth} icon={Zap}/>
              <KPI label="Current (Adj)" value="0.022x" sub="Entity-filtered" accent={CH.stl} icon={Shield}/>
              <KPI label="Peak" value="4.92x" sub="Sep 18, 2025" accent={PC[5]} icon={TrendingUp}/>
            </div>
            <Panel title="Velocity / Turnover Rate" sub="Volume divided by supply — filtered by time range">
              <ResponsiveContainer width="100%" height={300}><ComposedChart data={velC} margin={{left:8,right:8,top:8,bottom:4}}><CartesianGrid stroke="#F0F2F4" vertical={false}/><XAxis dataKey="date" tick={AX} tickFormatter={function(v){return v.slice(2,7)}} interval={Math.max(1,Math.floor(velC.length/8))} axisLine={{stroke:B.bdr}} tickLine={false}/><YAxis tick={AX} tickFormatter={function(v){return v+"x"}} axisLine={false} tickLine={false}/><Tooltip content={<Tip/>}/><Line type="monotone" dataKey="raw" stroke={CH.eth} strokeWidth={2} dot={false} name="Raw Velocity"/><Line type="monotone" dataKey="adjusted" stroke={CH.stl} strokeWidth={2} dot={false} name="Entity-Adjusted"/><Legend wrapperStyle={{fontSize:10}} iconType="circle" iconSize={7}/></ComposedChart></ResponsiveContainer>
            </Panel>
            <Panel title="Methodology">
              <div style={{fontSize:12,color:B.t2,lineHeight:1.7,maxWidth:700}}>
                <p style={{margin:"0 0 6px"}}><b style={{color:B.t1}}>Raw velocity</b> = total daily transfer volume / circulating supply.</p>
                <p style={{margin:0}}><b style={{color:B.t1}}>Entity-adjusted</b> filters addresses exceeding 1,000 txns or $10M volume in any 30-day window.</p>
              </div>
            </Panel>
          </div>
        )}

        {tab==="methodology"&&(
          <div>
            <Panel title="Data Methodology & Sources" sub="How this dashboard is built — data provenance, filtering methodologies, and query architecture">
              <div style={{fontSize:13,color:B.t2,lineHeight:1.8,maxWidth:800}}>
                <p style={{margin:"0 0 16px"}}>This dashboard is powered by <b style={{color:B.t1}}>31 saved SQL queries</b> running against Allium's institutional-grade blockchain data infrastructure. All data is sourced from Allium's crosschain stablecoin schemas, filtered by verified PYUSD token contract addresses on each chain.</p>
                <h4 style={{fontSize:14,fontWeight:700,color:B.t1,margin:"20px 0 8px"}}>Token Addresses</h4>
                <div style={{background:"#F7F8FA",borderRadius:6,padding:"12px 16px",fontSize:12,fontFamily:"monospace",lineHeight:1.8,border:"1px solid "+B.bdr,marginBottom:16}}>
                  <div><span style={{color:CH.eth}}>Ethereum:</span> 0x6c3ea9036406852006290770bedfcaba0e23a0e8</div>
                  <div><span style={{color:CH.sol}}>Solana:</span> 2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo</div>
                  <div><span style={{color:CH.arb}}>Arbitrum:</span> 0x46850ad61c2b7d64d08c9c754f45254596696984</div>
                  <div><span style={{color:CH.stl}}>Stellar:</span> PYUSD-GDQE7IXJ4HUHV6RQHIUPRJSEZE4DRS5WY577O2FY6YQ5LVWZ7JZTU2V5</div>
                </div>
              </div>
            </Panel>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <Panel title="Volume Adjustment Methodologies" sub="Three tiers of volume filtering">
                <div style={{fontSize:12,color:B.t2,lineHeight:1.7}}>
                  {[
                    {t:"Raw Transfer Volume",d:"Total USD value of all PYUSD transfers on-chain. Includes bot activity, MEV, intra-exchange transfers, and all smart contract interactions.",c:"#CF5C5C"},
                    {t:"Single Direction Max Transfer",d:"Only the largest stablecoin amount transferred within a single transaction is counted. Removes redundant internal transactions of complex smart contract interactions.",c:TX["Investment/Trade"]},
                    {t:"Entity-Adjusted Volume",d:"In addition to single-direction-max logic, uses labels and heuristics to remove bot activity (addresses with >1,000 txns or >$10M volume in any rolling 30-day window) and intra-exchange volume.",c:TX["Real-World Payment"]}
                  ].map(function(m,i){return(
                    <div key={i} style={{marginBottom:i<2?14:0,paddingLeft:12,borderLeft:"3px solid "+m.c}}>
                      <div style={{fontSize:13,fontWeight:600,color:B.t1,marginBottom:2}}>{m.t}</div>
                      <div style={{fontSize:12,color:B.t2,lineHeight:1.6}}>{m.d}</div>
                    </div>
                  )})
                  }
                </div>
              </Panel>

              <Panel title="Payments Pipeline" sub="How PYUSD transfers are classified">
                <div style={{fontSize:12,color:B.t2,lineHeight:1.7}}>
                  {[
                    {t:"Step 1: Attribution Filtering",d:"Every address is classified (CEX, DeFi, Infrastructure, or Organic). Transfers involving CEX/DeFi/Infrastructure addresses are excluded to isolate genuine economic activity."},
                    {t:"Step 2: Wallet Classification",d:"Remaining wallets are profiled: Consumer, Business, or Institutional. Balance tiers (whale, large, medium, small, micro) and behavioral segments (new, active, dormant, churned) are assigned."},
                    {t:"Step 3: Transaction Classification",d:"Each transfer is classified as Real-World Payment, Investment/Trade, Store of Value, or Unclassified based on wallet type combination and behavioral signals."},
                    {t:"Step 4: Payment Categorization",d:"Real-world payments are further categorized: C2C (peer-to-peer), C2B (consumer to business), B2B (business to business), B2C (business to consumer)."}
                  ].map(function(s,i){return(
                    <div key={i} style={{marginBottom:i<3?12:0}}>
                      <div style={{fontSize:12,fontWeight:600,color:B.t1,marginBottom:1}}>{s.t}</div>
                      <div style={{fontSize:11,color:B.t2,lineHeight:1.5}}>{s.d}</div>
                    </div>
                  )})
                  }
                </div>
              </Panel>
            </div>

            <Panel title="Data Tables Used" sub="Allium schemas powering each dashboard section">
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                  <thead><tr style={{borderBottom:"2px solid "+B.bdr,background:"#F7F8FA"}}>{["Dashboard Section","Primary Table(s)","Key Metrics"].map(function(h){return <th key={h} style={{textAlign:"left",padding:"10px 14px",color:B.t3,fontWeight:600,fontSize:10,textTransform:"uppercase",letterSpacing:.5}}>{h}</th>})}</tr></thead>
                  <tbody>
                    {[
                      {s:"Supply",t:"crosschain.stablecoin.supply_beta",m:"Total supply, supply by chain, supply delta (mints/burns)"},
                      {s:"Transfer Volume",t:"crosschain.metrics.stablecoin_volume",m:"Raw volume, adjusted volume, entity-adjusted volume, transfer count"},
                      {s:"Active Addresses",t:"crosschain.stablecoin.transfers",m:"Unique senders + receivers (deduped via UNION)"},
                      {s:"Holders",t:"allium_identity.aggregates.stablecoin_top_holders",m:"Top entities, balance by category, wallet count"},
                      {s:"Wallet Segmentation",t:"crosschain.stablecoin.wallet_classification",m:"Balance tier, behavioral segment, engagement score, risk score"},
                      {s:"Transaction Classification",t:"crosschain.stablecoin.transaction_classification",m:"Real-World Payment / Investment / Store of Value"},
                      {s:"Payment Attribution",t:"crosschain.stablecoin.payment_categorization",m:"C2C, C2B, B2B, B2C, Institutional deposits"},
                      {s:"Organic Transfers",t:"crosschain.stablecoin.filtered_transfers",m:"CEX/DeFi/Infra excluded — organic volume only"},
                      {s:"Velocity",t:"supply_beta + stablecoin_volume (joined)",m:"Volume/Supply ratio — raw and entity-adjusted turnover"},
                      {s:"Market Share",t:"supply_beta + stablecoin_volume (vs all USD)",m:"PYUSD share of total USD stablecoin supply and volume"}
                    ].map(function(r,i){return(
                      <tr key={i} style={{borderBottom:"1px solid "+B.bdr}}>
                        <td style={{padding:"9px 14px",fontWeight:600,color:B.t1}}>{r.s}</td>
                        <td style={{padding:"9px 14px",fontFamily:"monospace",fontSize:11,color:B.acc}}>{r.t}</td>
                        <td style={{padding:"9px 14px",color:B.t2,fontSize:11}}>{r.m}</td>
                      </tr>
                    )})
                    }
                  </tbody>
                </table>
              </div>
            </Panel>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <Panel title="Attribution Coverage" sub="Allium's address labeling statistics">
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {[{l:"Labeled Addresses",v:"500M+"},{l:"CEX Coverage",v:"100+ exchanges"},{l:"DeFi Coverage",v:"5,000+ protocols"},{l:"Update Frequency",v:"Weekly"},{l:"False Positive Rate",v:"<0.5%"},{l:"Chains Supported",v:"150+"}].map(function(s,i){return(
                    <div key={i} style={{background:"#F7F8FA",borderRadius:6,padding:"10px 12px"}}>
                      <div style={{fontSize:10,color:B.t3,textTransform:"uppercase",letterSpacing:0.8,fontWeight:600}}>{s.l}</div>
                      <div style={{fontSize:16,fontWeight:700,color:B.t1,marginTop:2}}>{s.v}</div>
                    </div>
                  )})
                  }
                </div>
              </Panel>
              <Panel title="Data Quality" sub="SOC-certified infrastructure">
                <div style={{fontSize:12,color:B.t2,lineHeight:1.7}}>
                  <p style={{margin:"0 0 8px"}}>Allium is <b style={{color:B.t1}}>SOC 1 & 2 Type 1 and Type 2 certified</b>. Every metric can be traced to primary blockchain data indexed directly from nodes.</p>
                  <p style={{margin:"0 0 8px"}}>The same data infrastructure powers <b style={{color:B.t1}}>Visa's Onchain Analytics Dashboard</b>, the <b style={{color:B.t1}}>Monetary Authority of Singapore's</b> stablecoin monitoring, and research by <b style={{color:B.t1}}>a16z, BCG, Grayscale</b>, and others.</p>
                  <p style={{margin:0}}>All queries filter by verified PYUSD token contract addresses (not symbol) to prevent false positives from duplicate tokens on chains like Solana.</p>
                </div>
              </Panel>
            </div>
          </div>
        )}

        <div style={{marginTop:16,padding:"12px 18px",background:"#fff",borderRadius:8,border:"1px solid "+B.bdr,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:10,color:B.t3}}>Data from Allium crosschain stablecoin schemas. 31 saved queries.</div>
          <div style={{fontSize:10,color:B.t3}}>Updated: March 17, 2026</div>
        </div>
      </div>
    </div>
  );
}
