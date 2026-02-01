import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyD42rD6arn0XgyUmHjRQMUmDdCzrwnX0GY");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message, history } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // History is sent from the frontend to give the bot memory
    const chat = model.startChat({ history: history || [] });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    
    return res.status(200).json({ reply: response.text() });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}


