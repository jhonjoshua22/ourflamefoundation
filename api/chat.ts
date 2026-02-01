import { GoogleGenerativeAI } from "@google/generative-ai";

// Use the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message, history } = req.body;

    // FIX: Sometimes the SDK version on Vercel needs the "models/" prefix explicitly 
    // or specifically requires 'gemini-1.5-flash-latest' to bypass 404s.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ reply: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error.message);
    
    // If it still fails, try the older model name as a fallback inside the catch
    return res.status(500).json({ 
      reply: `AI Error: ${error.message}. Try checking if your API key has access to 1.5-flash.` 
    });
  }
}
