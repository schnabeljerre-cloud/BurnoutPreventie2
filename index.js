import express from "express"
import bodyParser from "body-parser"
import { createClient } from "@supabase/supabase-js"

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

function calculateBRS(e, s, w, sl, em) {
  return ((e + s + w + em + (10 - sl)) / 5).toFixed(1)
}

function getMessage(brs) {
  if (brs <= 5) return "🟢 Je doet het goed. Neem pauzes en zorg voor jezelf."
  if (brs <= 7) return "🟠 Je staat onder druk. Werk rustiger en neem herstelmomenten."
  return "🔴 Je staat zwaar onder druk. Forceer niets en praat met iemand."
}

app.post("/whatsapp", async (req, res) => {
  const from = req.body.From
  const text = parseInt(req.body.Body)

  let { data: last } = await supabase.from("checkins").select("*").eq("user_id", from).order("created_at", { ascending: false }).limit(1).single()

  if (!last || last.step === 5) {
    await supabase.from("checkins").insert({ user_id: from, step: 1 })
    return res.send(`<Response><Message>Goedemorgen 👋 Hoe energiek voelde je je gisteren? (1–10)</Message></Response>`)
  }

  let update = { step: last.step + 1 }
  if (last.step === 1) update.energie = text
  if (last.step === 2) update.stress = text
  if (last.step === 3) update.werkdruk = text
  if (last.step === 4) update.slaap = text
  if (last.step === 5) update.emotie = text

  await supabase.from("checkins").update(update).eq("id", last.id)

  const questions = [
    "Hoeveel stress ervaar je nu? (1–10)",
    "Hoe zwaar voelt je werkdruk vandaag? (1–10)",
    "Hoe goed heb je geslapen? (1–10)",
    "Hoe emotioneel belast voel je je? (1–10)"
  ]

  if (update.step <= 5) return res.send(`<Response><Message>${questions[update.step - 2]}</Message></Response>`)

  const brs = calculateBRS(last.energie, last.stress, last.werkdruk, last.slaap, last.emotie)
  await supabase.from("checkins").update({ brs }).eq("id", last.id)

  return res.send(`<Response><Message>Dankjewel 🙏 Je score is ${brs}\n\n${getMessage(brs)}</Message></Response>`)
})

export default app
