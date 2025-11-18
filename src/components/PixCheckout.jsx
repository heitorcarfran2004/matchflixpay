"use client";
import {useState,useRef,useEffect} from "react";
export default function PixCheckout(){
 const redirectAfterPaid = process.env.NEXT_PUBLIC_MEMBERS_AREA_URL || "/obrigado";
 const [loading,setLoading]=useState(false);
 const [pix,setPix]=useState(null);
 const [err,setErr]=useState('');
 const plans=[{id:'d3',label:'3 DIAS DE ACESSO',value:9.9},{id:'30d',label:'30 DIAS DE ACESSO',value:14.9},{id:'life',label:'ACESSO VITALÍCIO',value:29.9}];
 async function gen(p){
   setLoading(true);setErr('');
   try{
     const r=await fetch('/api/syncpay/create-pix',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({value:p.value,name:p.label})});
     const j=await r.json();setPix(j.data);
   }catch(e){setErr(e.message);}
   setLoading(false);
 }
 async function verify(){
   const tx=pix?.id||pix?.transaction_id;
   const r=await fetch(`/api/syncpay/check-pix?transaction_id=${tx}`);
   const j=await r.json();
   const st=j.data?.status;
   if(['paid','approved','success'].includes(st))window.location.href=redirectAfterPaid;
 }
 return(<div>
   {plans.map(p=><div key={p.id} onClick={()=>gen(p)} style={{padding:10,border:'1px solid #555',marginBottom:10,cursor:'pointer'}}>{p.label} - R$ {p.value}</div>)}
   {loading&&<div>Gerando PIX...</div>}
   {pix&&<div><pre>{JSON.stringify(pix,null,2)}</pre><button onClick={verify}>Já paguei - Verificar</button></div>}
   {err&&<div style={{color:'red'}}>{err}</div>}
 </div>);
}
