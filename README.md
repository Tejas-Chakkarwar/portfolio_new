## Tejas Chakkarwar – Portfolio (Next.js + App Router)

Personal portfolio built with Next.js (App Router) and Tailwind. Migrated from a single `index.html` into a typed, maintainable app. Mobile-friendly, Netflix-style UI with animated intro, profile selection, and section-based navigation.

### Features
- Animated intro splash with profile selector (4 personas)
- Hero background video per persona (Vimeo embeds)
- Sections: Home, Professional, Skills, Projects, Extracurriculars, Books, Music, Contact
- Smooth in-page navigation and responsive layout

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
