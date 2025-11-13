
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.pushinpay.com/pix/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PUSHIN_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        value: 9.9,
        description: "MatchFlix – Acesso"
      })
    });

    const data = await response.json();

    return res.status(200).json({
      ok: true,
      emv: data.pix.emv,
      qrcode: data.pix.qrcode_base64,
      txid: data.pix.txid
    });

  } catch (err) {
    return res.status(500).json({ ok: false, error: err.toString() });
  }
}
