export default async function handler(req, res) {
  const { txid } = req.query;

  try {
    const response = await fetch(`https://api.pushinpay.com/pix/${txid}`, {
      headers: {
        Authorization: `Bearer ${process.env.PUSHIN_TOKEN}`
      }
    });

    const data = await response.json();

    return res.status(200).json({
      ok: true,
      status: data.pix.status
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false });
  }
}