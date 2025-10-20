import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const HF_KEY = process.env.HUGGINGFACE_API_KEY;

app.post("/api/generate", async (req, res) => {
  const { inputs } = req.body;

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error contacting Hugging Face API" });
  }
});

app.listen(3001, () => console.log("✅ Backend running on http://localhost:3001"));
