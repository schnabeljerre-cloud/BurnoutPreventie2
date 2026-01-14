module.exports = async (req, res) => {
  if (req.method === "GET") {
    return res.status(200).send("MindGuard AI Server Live 🚀");
  }

  if (req.method === "POST") {
    const msg = req.body?.Body || "";

    console.log("WhatsApp:", msg);

    return res.status(200).setHeader("Content-Type", "text/xml").send(`
<Response>
  <Message>MindGuard AI actief 👋</Message>
</Response>
`);
  }

  return res.status(405).send("Method not allowed");
};
