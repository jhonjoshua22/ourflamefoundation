import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with your key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message, history } = req.body;

    /**
     * SOLUTION: Use Gemini 2.0 Flash. 
     * Google has retired 1.5-flash for many regions in 2026.
     * We don't specify an apiVersion because the SDK handles the 2.0 
     * routing automatically.
     */
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    
    return res.status(200).json({ reply: response.text() });
  } catch (error: any) {
    console.error("DEBUG:", error.message);
    
    // FALLBACK: If 2.0 fails, we try the 'latest' alias which always points to a live model
    try {
        const fallbackModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await fallbackModel.generateContent(message);
        return res.status(200).json({ reply: result.response.text() });
    } catch (fallbackError: any) {
        return res.status(500).json({ reply: `Final Error: ${fallbackError.message}` });
    }
  }
}
