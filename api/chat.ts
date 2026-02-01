import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message, history } = req.body;
    
    // Try the most stable version name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    
    return res.status(200).json({ reply: response.text() });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    // This will help you see the EXACT error in Vercel Logs
    return res.status(500).json({ error: error.message });
  }
}
