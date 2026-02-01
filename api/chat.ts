import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = { runtime: "nodejs" };

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed. Use POST." });

  try {
    if (!process.env.GEMINI_KEY) return res.status(500).json({ error: "Missing GEMINI_KEY" });

    const { message } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!message) return res.status(400).json({ error: "Message missing" });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

    const model = genAI.getGenerativeModel({
      model: "models/chat-bison-001",
    });

    const result = await model.generateContent({
      prompt: {
        text: message
      }
    });

    return res.status(200).json({ reply: result.response.text() });
  } catch (err: any) {
    console.error("Gemini API Error:", err.message || err);
    return res.status(500).json({ error: "Gemini request failed", details: err.message || String(err) });
  }
}

