import fetch from 'node-fetch';
export default async function handler(req,res){
 if(req.method!=='GET')return res.status(405).end();
 try{
   const tx=req.query.transaction_id;
   const id=process.env.SYNC_CLIENT_ID;
   const sec=process.env.SYNC_CLIENT_SECRET;
   const auth='Basic '+Buffer.from(id+':'+sec).toString('base64');
   const r=await fetch(`https://syncpay.apidog.io/v1/payments/${tx}`,{
     headers:{'Authorization':auth}
   });
   const j=await r.json();
   res.status(200).json({success:true,data:j});
 }catch(e){res.status(500).json({error:e.message});}
}
