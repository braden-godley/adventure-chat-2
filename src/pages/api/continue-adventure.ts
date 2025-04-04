import { generateContent } from "@/utilities/completions";
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";
import { XMLParser } from "fast-xml-parser";

export type ResponseData =
    | {
          responseText: string;
          outcome: "DEFEATED" | "CONTINUE" | "VICTORY";
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

    console.log(generatedContent);

    const { narration, outcome } = parseResponse(generatedContent);

    return res.status(200).json({
        responseText: narration,
        outcome,
    });
}

const generatePrompt = (
    characterName: string,
    playersResponse: string,
): string => {
    return `
<task>
    Narrate what the player does and evaluate their progress toward their goal. Determine if they have:
    - Achieved their goal (VICTORY) - Describe their triumphant success
    - Failed in a way they cannot recover from (DEFEATED) - Describe their dramatic, definitive end (death, permanent imprisonment, etc.)
    - Are still progressing (CONTINUE) - Describe the outcome and ask what they do next
    Your narration should be short, only 4-5 sentences in length.
    If the outcome is DEFEATED, make sure to clearly describe HOW they were defeated (death, permanent failure, etc.).
</task>
<context>
    <character_name>${characterName}</character_name>
</context>
<formatting>
    - Do not use any markdown formatting. Only use plaintext.
    - Wrap your narration in <narration> tags
    - Include an <outcome> tag with either DEFEATED, CONTINUE, or VICTORY
    - For DEFEATED outcomes, make the narration dramatic and final
</formatting>
<output_example>
    <narration>Your narration of what happens goes here. For defeats, be explicit: "You fall into the endless void, your quest forever unfulfilled. Your story ends here, lost to the darkness."</narration>
    <outcome>DEFEATED</outcome>
</output_example>
<players_response>
    ${playersResponse}
</players_response>
    `;
};

const parseResponse = (
    response: string,
): { narration: string; outcome: "DEFEATED" | "CONTINUE" | "VICTORY" } => {
    const parser = new XMLParser();
    const parsed = parser.parse(response);

    const narration = parsed.narration;
    const outcome = parsed.outcome as "DEFEATED" | "CONTINUE" | "VICTORY";

    return { narration, outcome };
};
