import { generateContent } from "@/utilities/completions";
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

export type ResponseData =
    | {
          responseText: string;
      }
    | {
          error: string;
      };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    if (req.method !== "POST") {
        return res.status(400).json({ error: "Invalid method" });
    }

    const schema = z.object({
        characterName: z.string(),
        prompt: z.string(),
        chatHistory: z.array(
            z.object({
                role: z.enum(["user", "assistant"]),
                content: z.string(),
            }),
        ),
    });

    const validation = schema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
    }

    const body = req.body as z.infer<typeof schema>;

    const prompt = [
        ...body.chatHistory,
        {
            role: "user",
            content: generatePrompt(body.characterName, body.prompt),
        },
    ];

    const generatedContent = await generateContent(
        "gemini-2.0-flash",
        prompt,
        "You are an expert storyteller",
    );

    return res.status(200).json({
        responseText: generatedContent,
    });
}

const generatePrompt = (
    characterName: string,
    playersResponse: string,
): string => {
    return `
<task>
    Narrate what the player does and the immediate outcome of that action, given the context of the situation. 
    If it makes sense, ask the player what they do next.
    Your response should be short, only 4-5 sentences in length.
</task>
<context>
    <character_name>${characterName}</character_name>
</context>
<formatting>
    - Do not use any markdown formatting. Only use plaintext.
</formatting>
<players_response>
    ${playersResponse}
</players_response>
    `;
};
