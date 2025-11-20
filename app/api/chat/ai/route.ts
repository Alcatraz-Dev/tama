

import { NextRequest } from 'next/server';
import { OpenAI } from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message, language } = await req.json();

    // Load your website data (crawled or manually prepared)
    const filePath = path.join(process.cwd(), "data/crawl.json");
    const siteData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Prepare a short, direct prompt
    const prompt = `
You are a helpful assistant for an e-commerce website. 
Answer directly and concisely based on the website content below. 
Do not give unrelated information or long explanations.
Website content:
${JSON.stringify(siteData)}

User question: ${message}
Answer in ${language === "ar" ? "Arabic" : "English"}.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a concise assistant for website users." },
        { role: "user", content: prompt }
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    return new Response(JSON.stringify({
      response: content.trim()
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ response: "Sorry, something went wrong." }), { status: 500 });
  }
}