import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ reply: "Error: GEMINI_API_KEY is not set on Vercel." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // The history passed from frontend is already filtered to start with 'user'
    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ reply: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error.message);
    return res.status(500).json({ reply: `AI Error: ${error.message}` });
  }
}
