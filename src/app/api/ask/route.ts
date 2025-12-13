import { NextResponse } from "next/server";
import { projects, books } from "@/data/portfolio";
import { 
  experiences, 
  detailedProjects, 
  skills, 
  musicGenres, 
  extracurriculars, 
  contact, 
  profile as profileData 
} from "@/data/portfolioComplete";

function buildContext() {
  const parts: string[] = [];

  // Profile
  parts.push(`=== PROFILE ===`);
  parts.push(`Name: ${profileData.name}`);
  parts.push(`Role: ${profileData.role}`);
  parts.push(`Education: ${profileData.education}`);
  parts.push(`Summary: ${profileData.summary}`);
  parts.push(`Resume: ${profileData.resume}`);
  parts.push(`\nContact: ${contact.email} | ${contact.phone}`);
  parts.push(`LinkedIn: ${contact.linkedin}`);
  parts.push(`GitHub: ${contact.github}`);
  parts.push(`LeetCode: ${contact.leetcode}`);

  // Experience & Education
  parts.push(`\n=== EXPERIENCE & EDUCATION ===`);
  experiences.forEach(exp => {
    parts.push(`\n${exp.type === 'education' ? '🎓' : '💼'} ${exp.title} at ${exp.company} (${exp.period})`);
    parts.push(`Tech: ${exp.tech.join(", ")}`);
    exp.achievements.forEach(ach => parts.push(`- ${ach}`));
  });

  // Detailed Projects
  parts.push(`\n=== PROJECTS (DETAILED) ===`);
  detailedProjects.forEach(proj => {
    parts.push(`\n📦 ${proj.name}`);
    parts.push(`Description: ${proj.description}`);
    parts.push(`Tech Stack: ${proj.tech.join(", ")}`);
    if (proj.highlights && proj.highlights.length > 0) {
      parts.push(`Key Highlights:`);
      proj.highlights.forEach(h => parts.push(`  - ${h}`));
    }
    if (proj.links) {
      if (proj.links.github) parts.push(`GitHub: ${proj.links.github}`);
      if (proj.links.live) parts.push(`Live: ${proj.links.live}`);
    }
    if (proj.stats && proj.stats.length > 0) {
      parts.push(`Stats: ${proj.stats.join(" | ")}`);
    }
  });

  // Skills
  parts.push(`\n=== SKILLS ===`);
  parts.push(`⭐⭐⭐ Expert (Production Experience): ${skills.expert.join(", ")}`);
  parts.push(`⭐⭐ Advanced (Multiple Projects): ${skills.advanced.join(", ")}`);
  parts.push(`⭐ Intermediate (Learning/Growing): ${skills.intermediate.join(", ")}`);
  parts.push(`🔬 Currently Exploring: ${skills.exploring.join(", ")}`);

  // Books
  parts.push(`\n=== BOOKS ===`);
  books.forEach(b => {
    parts.push(`- ${b.title} by ${b.author}${b.note ? ` (${b.note})` : ""}`);
  });

  // Music
  parts.push(`\n=== MUSIC INTERESTS ===`);
  musicGenres.forEach(genre => {
    parts.push(`\n${genre.name}: ${genre.description}`);
    genre.albums.forEach(album => {
      parts.push(`  - ${album.title} by ${album.artist}${album.year ? ` (${album.year})` : ""}: ${album.description}`);
    });
  });

  // Extracurriculars
  parts.push(`\n=== EXTRACURRICULARS ===`);
  extracurriculars.forEach(extra => {
    parts.push(`\n${extra.title} - ${extra.role} at ${extra.organization}${extra.period ? ` (${extra.period})` : ""}`);
    extra.highlights.forEach(h => parts.push(`  - ${h}`));
  });

  return parts.join("\n");
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
                  { text: `You are Ask Tejas, an AI assistant helping visitors learn about Tejas Chakkarwar's portfolio. You have access to comprehensive information about his projects, experience, skills, education, books, music interests, and extracurricular activities.

CRITICAL RESPONSE RULES:

1. DETECT QUERY TYPE:
   - Simple list queries (e.g., "list projects", "what projects", "show projects") → Provide BRIEF, structured list only
   - Detailed queries (e.g., "tell me about Sentinel", "explain ThinkFlow") → Provide comprehensive details
   - General questions → Provide balanced, structured answer

2. FOR SIMPLE LIST QUERIES (like "list projects"):
   Use this EXACT format - keep it SHORT and CLEAN:
   
   ## Projects
   
   • **Project Name** - [One-line description]
   • **Project Name** - [One-line description]
   • **Project Name** - [One-line description]
   
   (NO tech stacks, NO highlights, NO links unless specifically asked)

3. FOR DETAILED QUERIES:
   Use this structured format:
   
   ## Project Name
   
   **Description:** [brief overview]
   
   **Tech Stack:** [technologies]
   
   **Key Highlights:**
   • Highlight 1
   • Highlight 2
   
   **Links:** [if available]

4. FORMATTING RULES:
   - Always use ## for main sections
   - Use bullet points (•) for lists
   - Use **bold** for project/important names
   - Keep paragraphs to 1-2 sentences max
   - Add line breaks between sections
   - Be concise - don't repeat information

5. GENERAL RULES:
   - Answer ONLY from the portfolio context
   - If information isn't available, say so politely
   - Match the detail level to the question type
   - Keep responses scannable and well-organized

PORTFOLIO CONTEXT:
${portfolioContext}

USER QUESTION: ${message}

Provide a structured, appropriately detailed answer based on the context above:` },
                ],
              },
            ],
            generationConfig: { temperature: 0.4, maxOutputTokens: 1024 },
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
    if (lower.includes("project") && (lower.includes("list") || lower.includes("what") || lower.includes("show"))) {
      return NextResponse.json({ reply: `## Projects\n\n${detailedProjects.map((p) => `• **${p.name}** - ${p.description.split('.')[0]}.`).join("\n")}` });
    }
    if (lower.includes("project")) {
      return NextResponse.json({ reply: `## Projects\n\n${detailedProjects.map((p) => `• **${p.name}** - ${p.description.split('.')[0]}.`).join("\n")}` });
    }
    if (lower.includes("book")) {
      return NextResponse.json({ reply: `## Books\n\n${books.map((b) => `• **${b.title}** by ${b.author}${b.note ? ` (${b.note})` : ""}`).join("\n")}` });
    }
    return NextResponse.json({ reply: `**${profileData.name}** - ${profileData.role}\n\n${profileData.summary}` });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Unknown error" }, { status: 500 });
  }
}
