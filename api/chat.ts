import { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  runtime: "nodejs", // Important for Vercel edge function compatibility
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  // Check that GEMINI_KEY env var is set
  const apiKey = process.env.GEMINI_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing GEMINI_KEY environment variable" });
  }

  try {
    // Parse the request body
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { message } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ error: "Invalid or missing 'message' in request body" });
    }

    // Initialize GoogleGenerativeAI client with your API key
    const genAI = new GoogleGenerativeAI(apiKey);

    // Get the chat model instance
    const model = genAI.getGenerativeModel({
      model: "models/chat-bison-001",
    });

    // Call generateContent with the proper prompt structure
    const result = await model.generateContent({
      prompt: {
        text: message,
      },
    });

    // Extract the reply text
    const reply = result.response?.text();

    if (!reply) {
      return res.status(500).json({ error: "No reply generated from Gemini model" });
    }

    // Return the reply as JSON
    return res.status(200).json({ reply });
  } catch (err: any) {
    console.error("Gemini API Error:", err);

    // Return error info (avoid leaking sensitive info in prod)
    return res.status(500).json({
      error: "Gemini request failed",
      details: err.message || String(err),
    });
  }
}
