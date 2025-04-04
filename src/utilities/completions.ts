import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

type ModelType = "gpt-4o-mini" | "gemini-2.0-flash";

type Context = Array<{
    role: string;
    content: string;
}>;

export const generateContent = async (
    model: ModelType,
    prompt: Context,
    instructions: string,
): Promise<string> => {
    let response = "";

    if (model === "gpt-4o-mini") {
        const apiKey = process.env.OPENAI_API_KEY;
        const client = new OpenAI({ apiKey });
        const gptResponse = await client.responses.create({
            model: "gpt-4o-mini",
            instructions: instructions,
            input: prompt.map((part) => ({
                role: part.role === "user" ? "user" : "assistant",
                content: part.content,
            })),
        });
        response = gptResponse.output_text;
    } else if (model === "gemini-2.0-flash") {
        // Gemini
        const apiKey = process.env.GEMINI_API_KEY!;
        const client = new GoogleGenAI({ apiKey });
        const geminiResponse = await client.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt.map((part) => ({
                role: part.role === "user" ? "user" : "model",
                parts: [{ text: part.content }],
            })),
            config: {
                systemInstruction: instructions,
            },
        });

        response = geminiResponse.text!;
    }

    return response;
};
