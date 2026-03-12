# Priya Singh - Digital Marketing Strategist Website

## Current State
New project. No existing pages or backend logic.

## Requested Changes (Diff)

### Add
- Single-page portfolio/marketing website for Priya Singh, Digital Marketing Strategist
- Hero section: full-width intro with Priya's headshot, name, title, and "Work With Me" CTA
- About section: professional bio, years of experience, key strengths
- Services section: 6 service cards (SEO, Social Media Marketing, Content Strategy, Paid Ads Google/Meta, Email Marketing, Branding)
- Testimonials section: 3 placeholder client quotes with name and role
- Contact section: name/email/message form + LinkedIn/Instagram/Twitter X icon links
- SEO metadata: title, description, og tags
- Fully responsive, mobile-friendly layout
- Backend contact form submission handler storing messages

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend: Motoko canister with `submitContact(name, email, message)` and `getMessages()` functions
2. Frontend: Single-page React app with smooth scroll navigation
   - Sticky navbar with nav links and CTA
   - Hero: Priya's photo (/assets/uploads/26840__1___1_-removebg-preview-1.png), name, title, CTA button
   - About: bio text, stat highlights (years exp, clients, campaigns)
   - Services: 6 cards in responsive grid
   - Testimonials: 3 quote cards
   - Contact: form wired to backend + social icon links
3. Design tokens: purple primary, golden yellow accent, white/light backgrounds, clean modern typography
4. SEO: meta tags in index.html
