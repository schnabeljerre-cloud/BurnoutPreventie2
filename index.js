import express from "express";
import bodyParser from "body-parser";

const app = express();

// Twilio compatibele body parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root check
app.get("/", (req, res) => {
  res.send("MindGuard AI Server Live 🚀");
});

// WhatsApp webhook
app.post("/whatsapp", (req, res) => {
  const msg = req.body.Body || "";
  console.log("WhatsApp message:", msg);

  return res.set("Content-Type", "text/xml").send(`
<Response>
  <Message>MindGuard AI actief 👋</Message>
</Response>
`);
});

export default app;
