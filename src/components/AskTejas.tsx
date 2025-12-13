"use client";

import { useState } from "react";

function collectContextFromDOM(): string {
  try {
    const parts: string[] = [];
    const extractText = (el: HTMLElement): string => {
      const raw = (el.textContent || el.innerText || "").trim();
      return raw.replace(/\s+/g, " ");
    };
    const pushTexts = (selector: string, label?: string) => {
      const nodes = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
      if (nodes.length) {
        if (label) parts.push(label);
        nodes.forEach((n) => {
          const t = extractText(n);
          if (t) parts.push("- " + t);
        });
      }
    };

    // Site/hero
    pushTexts(".logo", "SITE");
    pushTexts(".hero h1", "HERO");
    pushTexts(".hero-subtitle");

    // Sections
    pushTexts(".section-title", "SECTIONS");

    // Projects
    pushTexts(".project-title", "PROJECTS");
    pushTexts(".project-description");
    pushTexts(".tech-tag");

    // Books
    pushTexts(".book-title", "BOOKS");
    pushTexts(".book-author");
    pushTexts(".book-description");

    // Skills
    pushTexts(".category-title", "SKILLS CATEGORIES");
    pushTexts(".skill-item-name");
    pushTexts(".skill-item-desc");

    // Experience timeline
    pushTexts(".timeline-content h3", "EXPERIENCE/EDUCATION");
    pushTexts(".timeline-content h4");
    pushTexts(".timeline-content .tech-stack");
    pushTexts(".timeline-content li");

    // Extracurriculars
    pushTexts(".extracurriculars-hero h1", "EXTRACURRICULARS");
    pushTexts(".activity-title");
    pushTexts(".activity-role");
    pushTexts(".activity-org");
    pushTexts(".activity-highlights li");

    // Music
    pushTexts(".music-hero h1", "MUSIC");
    pushTexts(".music-hero p");
    pushTexts(".genre-title");
    pushTexts(".albums-title");
    pushTexts(".album-title");
    pushTexts(".album-artist");
    pushTexts(".album-description");

    // Contact
    pushTexts(".contact-tagline", "CONTACT");
    pushTexts(".contact-item");

    // Work Permit modal (hidden content)
    pushTexts("#workPermitModal .modal-title", "WORK PERMIT");
    pushTexts("#workPermitModal .modal-text");

    const raw = parts.join("\n");
    // Trim to a larger but safe size
    return raw.length > 12000 ? raw.slice(0, 12000) : raw;
  } catch {
    return "";
  }
}

export default function AskTejas() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([
    { role: "assistant", text: "Hi! I’m Ask Tejas. Ask me about my skills, experience, or projects." },
  ]);

  const send = async () => {
    if (!input.trim()) return;
    const question = input.trim();
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);
    try {
      const liveContext = collectContextFromDOM();
      const resp = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, context: liveContext }),
      });
      const data = await resp.json();
      const reply = data.reply || data.error || "Sorry, something went wrong.";
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch (e: any) {
      setMessages((m) => [...m, { role: "assistant", text: "Network error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ position: "fixed", right: 20, bottom: 20, zIndex: 3000 }}
        className="btn btn-info"
      >
        Ask Tejas 💬
      </button>

      {open && (
        <div className="modal active" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="modal-content" style={{ maxWidth: 700 }}>
            <button className="modal-close" onClick={() => setOpen(false)}>&times;</button>
            <h2 className="modal-title">Ask Tejas</h2>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              maxHeight: "50vh",
              overflowY: "auto",
              textAlign: "left",
            }}>
              {messages.map((m, idx) => (
                <div key={idx} style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  background: m.role === "user" ? "#e50914" : "#f2f2f2",
                  color: m.role === "user" ? "#fff" : "#000",
                  padding: "8px 12px",
                  borderRadius: 8,
                  maxWidth: "80%",
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.6",
                }}>
                  {m.role === "assistant" ? (
                    <div style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}>
                      {m.text.split('\n').map((line, i) => {
                        // Format headers
                        if (line.match(/^##+\s/)) {
                          return <h3 key={i} style={{ margin: "8px 0 4px 0", fontWeight: "bold", fontSize: "1.1em" }}>{line.replace(/^##+\s/, '')}</h3>;
                        }
                        // Format bullet points
                        if (line.match(/^[-•*]\s/)) {
                          return <div key={i} style={{ marginLeft: "16px", marginBottom: "4px" }}>• {line.replace(/^[-•*]\s/, '')}</div>;
                        }
                        // Format numbered lists
                        if (line.match(/^\d+\.\s/)) {
                          return <div key={i} style={{ marginLeft: "16px", marginBottom: "4px" }}>{line}</div>;
                        }
                        // Format bold text (basic)
                        if (line.includes('**')) {
                          const parts = line.split(/(\*\*.*?\*\*)/g);
                          return <div key={i} style={{ marginBottom: "4px" }}>
                            {parts.map((part, j) => 
                              part.startsWith('**') && part.endsWith('**') 
                                ? <strong key={j}>{part.slice(2, -2)}</strong>
                                : part
                            )}
                          </div>;
                        }
                        // Regular line
                        return line.trim() ? <div key={i} style={{ marginBottom: "4px" }}>{line}</div> : <br key={i} />;
                      })}
                    </div>
                  ) : (
                    m.text
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                placeholder="e.g., Which project best showcases your backend skills?"
                style={{ flex: 1, padding: "10px 12px", borderRadius: 6, border: "1px solid #ddd" }}
              />
              <button className="btn btn-play" onClick={send} disabled={loading}>
                {loading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
