import { NextResponse } from "next/server";
import { projects, books, profile } from "@/data/portfolio";

function buildContext() {
  const projLines = projects
    .map((p) => `- ${p.name}: ${p.summary} | Tech: ${p.tech.join(", ")}`)
    .join("\n");
  const bookLines = books
    .map((b) => `- ${b.title} — ${b.author}`)
    .join("\n");
  return `\nPROFILE\n${profile}\n\nPROJECTS (complete)\n${projLines}\n\nBOOKS (complete)\n${bookLines}\n`;
}

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    const portfolioContext = (context ? `${context}\n\n` : "") + buildContext();

    if (apiKey) {
      // Try a set of known, supported model IDs in order.
      const candidateModels = [
        // User-preferred latest families first
        "gemini-2.0-flash-lite",
        "gemini-2.0-flash",
        // Fallbacks
        "gemini-1.5-flash-002",
        "gemini-1.5-flash-8b",
        "gemini-1.5-flash",
      ];

      let lastErrText = "";
      for (const model of candidateModels) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const resp = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  { text: `You are Ask Tejas, answering questions ONLY from the portfolio context below. If the answer isn't in context, say you don't have that info. Be concise.\n${portfolioContext}\nQuestion: ${message}` },
                ],
              },
            ],
            generationConfig: { temperature: 0.3, maxOutputTokens: 384 },
          }),
        });

        if (resp.ok) {
          const data = await resp.json();
          const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
          return NextResponse.json({ reply: output, model });
        }

        lastErrText = await resp.text();
      }

      throw new Error(`Gemini error after trying models: ${lastErrText}`);
    }

    // Fallback: rule-based answer with full context
    const lower = (message || "").toLowerCase();
    if (lower.includes("project")) {
      return NextResponse.json({ reply: `Projects: \n${projects.map((p) => `- ${p.name}`).join("\n")}` });
    }
    if (lower.includes("book")) {
      return NextResponse.json({ reply: `Books: \n${books.map((b) => `- ${b.title} — ${b.author}`).join("\n")}` });
    }
    return NextResponse.json({ reply: `Profile: ${profile}` });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Unknown error" }, { status: 500 });
  }
}
