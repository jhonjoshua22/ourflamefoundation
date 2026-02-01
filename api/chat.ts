import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.GEMINI_KEY) {
      return res.status(500).json({ error: "Missing GEMINI_KEY" });
    }

    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { message } = body;

    if (!message) {
      return res.status(400).json({ error: "Message missing" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.0-pro",
    });

    const result = await model.generateContent(message);

    const text = result.response.text();

    return res.status(200).json({ reply: text });
  } catch (err: any) {
    console.error("🔥 Gemini Error:", err?.message || err);
    return res.status(500).json({
      error: "Gemini request failed",
      details: err?.message || String(err),
    });
  }
}
