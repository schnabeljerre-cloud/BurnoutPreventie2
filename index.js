import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("MindGuard Server Live 🚀");
});

app.post("/whatsapp", (req, res) => {
  res.send(`<Response><Message>MindGuard AI actief 👋</Message></Response>`);
});

export default app;

