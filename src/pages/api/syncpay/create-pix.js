import fetch from 'node-fetch';
export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).end();
 try{
   const {value,name='Acesso VIP'}=req.body;
   const id=process.env.SYNC_CLIENT_ID;
   const sec=process.env.SYNC_CLIENT_SECRET;
   const auth='Basic '+Buffer.from(id+':'+sec).toString('base64');
   const r=await fetch('https://syncpay.apidog.io/v1/payments',{
     method:'POST',
     headers:{'Content-Type':'application/json','Authorization':auth},
     body:JSON.stringify({amount:value,currency:'BRL',payment_method:'pix',metadata:{product:name}})
   });
   const t=await r.text();let d;try{d=JSON.parse(t);}catch{d={raw:t};}
   res.status(200).json({success:true,data:d});
 }catch(e){res.status(500).json({error:e.message});}
}
