const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Twilio compatible body parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root test
app.get("/", (req, res) => {
  res.send("MindGuard AI Server Live 🚀");
});

// WhatsApp webhook
app.post("/whatsapp", (req, res) => {
  const msg = req.body.Body || "";

  console.log("WhatsApp:", msg);

  res.set("Content-Type", "text/xml");
  res.status(200).send(`
<Response>
  <Message>MindGuard AI actief 👋</Message>
</Response>
`);
});

// Vercel export
module.exports = app;
