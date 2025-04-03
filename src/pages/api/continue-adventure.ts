import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

export type ResponseData =
    | {
          responseText: string;
      }
    | {
          error: string;
      };

export default function handler(
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

    return res.status(200).json({
        responseText: "What a dumb thing to say!",
    });
}
