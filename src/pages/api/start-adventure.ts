import { generateContent } from "@/utilities/completions";
import { XMLParser } from "fast-xml-parser";
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

type ResponseData =
    | {
          adventureTitle: string;
          firstMessage: string;
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
    });

    const validation = schema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
    }

    const body = req.body as z.infer<typeof schema>;

    const prompt = generatePrompt(body.characterName);

    const generatedContent = await generateContent(
        "gemini-2.0-flash",
        [
            {
                role: "user",
                content: prompt,
            },
        ],
        "You are an expert storyteller",
    );

    const { title, premise } = parseResponse(generatedContent);

    return res.status(200).json({
        adventureTitle: title,
        firstMessage: premise,
    });
}

const generatePrompt = (characterName: string): string => {
    return `
<task>
    Generate an amazing story title and premise based on the character name given. 
    Your story premise should:
    - Be 4-5 sentences in length
    - Present a clear, achievable goal for the character
    - Explain what's at stake if they fail
    - Invite further action by asking what they will do next
</task>
<context>
    <character_name>${characterName}</character_name>
</context>
<formatting>
    - Do not use any markdown formatting. Only use plaintext.
    - Use the structure shown in <output_example> and do not write anything outside of the <title> and <story_premise> tags.
</formatting>
<output_example>
    <title>Your amazing story title goes here</title>
    <story_premise>
        Your amazing story premise goes here, including a clear goal and stakes
    </story_premise>
</output_example>
    `;
};

const parseResponse = (
    response: string,
): { title: string; premise: string } => {
    const parser = new XMLParser();
    const parsed = parser.parse(response);

    let title = parsed.title;
    let premise = parsed.story_premise;

    return { title, premise };
};
