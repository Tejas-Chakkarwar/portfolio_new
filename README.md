## Tejas Chakkarwar – Portfolio (Next.js + App Router)

Personal portfolio built with Next.js (App Router) and Tailwind. Migrated from a single `index.html` into a typed, maintainable app. Mobile-friendly, Netflix-style UI with animated intro, profile selection, and section-based navigation.

### Features
- Animated intro splash with profile selector (4 personas)
- Hero background video per persona (Vimeo embeds)
- Sections: Home, Professional, Skills, Projects, Extracurriculars, Books, Music, Contact
- Smooth in-page navigation and responsive layout

### Ask Tejas (AI Chatbot)
- Floating chat widget that answers questions about the portfolio (projects, books, skills, experience, extracurriculars)
- Uses Google Gemini via a Next.js API route with live DOM context collection so updates to the site are reflected immediately
- Server route with safe fallbacks and model compatibility attempts (2.0 and 1.5 flash families)

Files:
- `src/components/AskTejas.tsx` – client chat UI, collects live content from the page
- `src/app/api/ask/route.ts` – server route calling Gemini REST (`generateContent`)
- `src/data/portfolio.ts` – structured fallback context (projects, books, profile)

### Tech
- Next.js 16 (App Router, TypeScript)
- Tailwind (via `@tailwindcss/postcss`)

### Project Structure
- `src/app/page.tsx` – All sections and interactions (client component)
- `src/app/globals.css` – Global styles and legacy CSS
- `public/images` – Images used across sections

### Run Locally
```bash
npm install
npm run dev
# open http://localhost:3000
```

### Environment Variables
Create `./.env.local` (not committed) and set:
```
GEMINI_API_KEY=your_google_gemini_key
```
On Vercel (or your host), add the same variable in Project → Settings → Environment Variables.

### Build
```bash
npm run build
npm start
```

### Customize
- Update images in `public/images`
- Edit content/sections in `src/app/page.tsx`
- Tweak styles in `src/app/globals.css`

### Notes
- Local video has been removed; hero uses Vimeo embeds.
- Navbar is normalized across sections so all links work everywhere.
- Chatbot gracefully degrades to rule-based answers if no `GEMINI_API_KEY` is configured.
