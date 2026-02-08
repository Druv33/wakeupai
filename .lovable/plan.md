

# WakeupAI – AI Cinematic Scene Architect
**Domain: wakeupai.in | AI-powered cinematic prompt generator**

---

## Design System
- **Colors**: Pure black & white palette (#000, #111, #FFF, #F5F5F5) — no neon, no gradients, no glow
- **Typography**: Geist Sans (fallback: Inter) with bold weights (700-800), tight letter-spacing, large headlines
- **Buttons**: Linear/Apple-style — dark surface, subtle top highlight, rounded corners, premium feel
- **Overall feel**: Minimal, premium, iPhone-worthy — inspired by Apple and modern AI SaaS companies

---

## Page 1: Home (Main Landing + Tool)

### Hero Section
- Large SEO-optimized headline: *"AI Video Scene Generator for Cinematic Faceless Videos"*
- Brief subtext explaining the value proposition
- Subtle terminal cursor animation on headline
- Scene input box prominently placed with "Generate Scene" CTA

### Core Tool Section
- **Input**: Text field for scene idea (e.g., "A man walking alone in rain")
- **Visual selectors** (chip/dropdown style):
  - Cinematic Style (Noir, Documentary, Hollywood, Indie, Netflix)
  - Emotion (Lonely, Hopeful, Intense, Calm, Mysterious)
  - Camera Type (Wide, Close-up, Drone, Handheld, Static)
  - Lighting (Golden Hour, Low-key, Neon City, Natural)
  - Platform (YouTube Shorts, TikTok, Instagram Reels, Film)
- **"Generate Scene" button** triggers real AI generation via Lovable Cloud + Lovable AI
- **Output area** with:
  - Full cinematic prompt (copyable)
  - Storyboard breakdown (Shot 1, Shot 2, Shot 3)
  - Optional image generation prompt
  - Copy & Reset buttons
- Static cinematic placeholder images matching the mood/style for visual preview

### Value Section
- Short, scannable blocks explaining why prompts fail, why cinematic language matters, and why this tool exists

### Use Cases Section
- Faceless YouTube channels, short-form creators, marketing agencies, indie filmmakers, AI video creators

### FAQ Section
- SEO-friendly accordion with questions like "What is an AI video scene generator?", "Is this free?", "Which AI video tools does this work with?"

---

## Page 2: Blog
- Static blog listing page with 3-4 hardcoded educational articles covering AI video prompts, cinematic storytelling, faceless video creation, and prompt engineering
- Individual blog post pages with clean typography and SEO-optimized content

---

## Page 3: About Us
- Company mission, what WakeupAI does, trust-building tone

## Page 4: Privacy Policy
- GDPR-friendly, human-readable privacy policy

## Page 5: Terms of Service
- Clear, simple terms

## Page 6: Disclaimer
- Standard disclaimer page

---

## Navigation & Layout

### Header
- Floating, sticky pill-style header with frosted glass/blur effect and rounded capsule shape
- Menu items: Tool, How It Works, Blog, FAQ, About, Privacy, Terms
- Dark/Light mode toggle
- Hamburger menu on mobile

### Footer
- Links to About, Blog, Privacy Policy, Terms, Contact, Disclaimer, Copyright
- Clean, minimal layout

---

## Ad-Ready Layout
- Designated space for header ad, sidebar ad (desktop), and in-content ad blocks — structured for future AdSense integration without breaking UX

---

## Backend (Lovable Cloud)
- Edge function using **Lovable AI** (Gemini model) to transform simple scene ideas + user selections into professional cinematic prompts
- Structured output with storyboard breakdown
- No login, no user data storage, no cookies (except analytics-ready)
- Rate limiting error handling (429/402) with user-friendly messages

---

## SEO
- Semantic HTML structure with proper heading hierarchy
- SoftwareApplication schema markup
- Optimized for keywords: AI Video Scene Generator, Cinematic AI prompt, Faceless video AI
- Fast-loading, clean markup

