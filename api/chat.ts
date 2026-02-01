import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: any, res: any) {
  // 1. Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 2. IMPORTANT: Check for the right variable name
    // If you named it VITE_GEMINI_KEY in Vercel, change this to process.env.VITE_GEMINI_KEY
    const apiKey = process.env.GEMINI_KEY || process.env.VITE_GEMINI_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing API Key in Vercel Environment Variables" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { message } = body;

    if (!message) {
      return res.status(400).json({ error: "Message missing" });
    }

    // 3. Initialize the AI with the modern model
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // Updated from chat-bison (which is deprecated)
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ reply: text });
  } catch (err: any) {
    console.error("🔥 Gemini Error:", err?.message || err);
    return res.status(500).json({
      error: "Gemini request failed",
      details: err?.message || String(err),
    });
  }
}
