import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("MindGuard AI Live 🚀");
});

app.post("/whatsapp", (req, res) => {
  console.log("WhatsApp:", req.body.Body);

  res.set("Content-Type", "text/xml");
  res.send(`
<Response>
  <Message>MindGuard AI actief 👋</Message>
</Response>
`);
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running")
);


