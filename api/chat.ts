import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with the correct object format for your SDK version
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message, history } = req.body;

    /**
     * FIX: We specify the apiVersion inside the getGenerativeModel call 
     * or use the stable model name 'gemini-1.5-flash'.
     */
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
    }, { apiVersion: 'v1' }); // This forces the stable endpoint

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    
    return res.status(200).json({ reply: response.text() });
  } catch (error: any) {
    console.error("Gemini Error:", error.message);
    return res.status(500).json({ reply: `AI Error: ${error.message}` });
  }
}
