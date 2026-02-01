import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are the Flame Foundation Assistant. Be encouraging and help with Jobs, Money, and Love.",
    });

    const result = await model.generateContent(message);

    res.status(200).json({
      reply: result.response.text(),
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Gemini request failed" });
  }
}
