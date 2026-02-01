import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history } = req.body;

    // Use just the name. The SDK handles the "models/" prefix.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    if (!text) throw new Error("Empty response from Gemini");

    return res.status(200).json({ reply: text });
  } catch (error: any) {
    console.error("Gemini Error:", error.message);
    // Returning the error message so your UI can show it instead of just spinning
    return res.status(500).json({ reply: `Error: ${error.message}` });
  }
}
