import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: any, res: any) {
  try {
    if (!process.env.GEMINI_KEY) {
      return res.status(500).json({ error: "Missing GEMINI_KEY" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

    const models = await genAI.listModels();

    return res.status(200).json({ models });
  } catch (error) {
    return res.status(500).json({ error: error.message || String(error) });
  }
}
