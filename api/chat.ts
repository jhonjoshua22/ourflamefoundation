import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * FIX: We pass 'v1' as the second argument to the constructor.
 * This forces the SDK to use the stable endpoint instead of v1beta.
 */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "", "v1");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message, history } = req.body;

    // Use the stable model name
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
    return res.status(500).json({ reply: `AI Error: ${error.message}` });
  }
}
