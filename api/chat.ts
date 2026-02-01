import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message, history } = req.body; // 'message' is defined here

    // Use Gemini 2.0 Flash - the 2026 standard
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    
    return res.status(200).json({ reply: response.text() });
  } catch (error: any) {
    console.error("Gemini Error:", error.message);
    
    // Grab the message again from the request body for the fallback
    const { message } = req.body; 

    try {
        // Fallback to 'gemini-2.0-flash-001' if the standard name fails
        const fallbackModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });
        const result = await fallbackModel.generateContent(message);
        return res.status(200).json({ reply: result.response.text() });
    } catch (fallbackError: any) {
        return res.status(500).json({ reply: `AI Error: ${fallbackError.message}` });
    }
  }
}
