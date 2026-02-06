# Veyra Group Landing Page

## Overview

This is a premium, high-converting single-page landing website for Veyra Group (veyra.group), positioned as an **AI systems builder for small teams (5-30 people)**. The site uses Alex Hormozi-style copy—punchy, direct, with specific numbers and no fluff. Features $25K+ premium dark mode design with glassmorphism, animations, and gradients.

Target audience: Small teams, agencies, professional services, and startups looking to save 10+ hours/week through AI automation.

The stack uses React with TypeScript on the frontend, Express.js on the backend, and PostgreSQL with Drizzle ORM for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.
Copy style: Alex Hormozi - punchy, direct, specific numbers, no corporate speak.

## Design System

### Global Design Tokens (Single Source of Truth in index.css)
All styles use CSS variables defined in `@theme inline` block:
- **--bg**: #07140f (page background)
- **--bg-2**: #06110d (deeper background for gradients)
- **--surface**: rgba(255,255,255,0.04) (card surfaces)
- **--surface-2**: rgba(255,255,255,0.06) (hover surfaces)
- **--border**: rgba(255,255,255,0.10) (default borders)
- **--border-2**: rgba(255,255,255,0.16) (hover borders)
- **--text**: rgba(255,255,255,0.92) (headlines)
- **--text-2**: rgba(255,255,255,0.72) (body text)
- **--muted**: rgba(255,255,255,0.56) (secondary text)
- **--emerald**: #1ee6a6 (primary accent)
- **--emerald-2**: #10b981 (secondary accent)
- **--steel**: #7aa7c7 (steel blue accent)
- **--shadow**: 0 12px 40px rgba(0,0,0,0.45)
- **--shadow-sm**: 0 8px 24px rgba(0,0,0,0.35)
- **--radius-lg**: 18px
- **--radius-md**: 14px
- **--radius-sm**: 12px

### Page Background
Gradient with emerald and steel radials:
```css
background: 
  radial-gradient(900px 500px at 20% -10%, rgba(30,230,166,0.12), transparent 60%),
  radial-gradient(900px 500px at 80% 0%, rgba(122,167,199,0.10), transparent 55%),
  linear-gradient(180deg, var(--bg), var(--bg-2));
```

### Container + Section Spacing
- **Container**: max-width 1120px, 24px side padding
- **Section padding**: 84px desktop, 64px mobile (max-width 640px)

### Typography System
- **H1**: clamp(44px, 4vw, 64px), weight 700, line-height 1.05, letter-spacing -0.02em
- **H2**: clamp(28px, 2.4vw, 38px), weight 650, line-height 1.12, letter-spacing -0.01em
- **Body**: 16px, line-height 1.6, color var(--text-2)
- **Subtitles**: color var(--muted), weight 500

### Surface System (Unified Cards)
All cards use `.surface` base class or inherit its styles:
```css
.surface {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(10px);
}
```

### Button System
- **Height**: 46px, padding 0 18px, radius var(--radius-md)
- **Transitions**: 140ms ease
- **Primary (.btn-primary, .glow-button)**: Emerald gradient background, emerald border, glow on hover
- **Secondary (.btn-secondary)**: Surface background, border, no glow
- **Focus ring**: 0 0 0 4px rgba(30,230,166,0.18)

### Input + Slider Styling
- **Text inputs**: height 46px, radius var(--radius-md), surface background
- **Range sliders**: 6px track rgba(255,255,255,0.10), 20px emerald thumb with glow on hover

### Tool Badges
- Class `.tool-badge`: pill shape (999px radius), surface background, 8px 12px padding

### Card Styles
- **glass-card**: Dark glass rgba(10,16,14,0.55), 8% border, backdrop-blur, 20px radius
- **bento-card**: Same dark glass with subtle radial gradient on hover
- **glow-border**: Subtle animated gradient border (emerald/steel at 30% opacity)

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with custom dark theme
- **Animations**: Framer Motion for scroll animations and interactive elements
- **Fonts**: Inter from Google Fonts

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript compiled with tsx for development, esbuild for production
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Static Serving**: Express serves the built Vite frontend in production

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/   # UI components including shadcn/ui
│   │   │   └── layout.tsx             # Navbar and Footer
│   │   ├── pages/        # Page components (home, calculator, leads)
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   └── storage.ts    # Data access layer
├── shared/           # Shared code between client/server
│   └── schema.ts     # Drizzle database schema
```

### Page Sections (Homepage) - Alex Hormozi Style
1. Hero - "You're Running a Business. So Why Does It Feel Like Data Entry?" + "Show Me How" CTA
2. Agitation - "You already know the work I'm talking about." (pain points with "Again.")
3. Solution - "We make it stop." (Automations, Custom AI Tools, Monthly Partnership)
4. Calculator - "Here's what the busywork actually costs you." with interactive sliders
5. How It Works - "Here's what happens." (We Talk → We Build → It Runs)
6. Pricing - "Straightforward pricing." (Starter $2K, Full Build $4K, Monthly $3K/mo)
7. Guarantee - "If it doesn't work, we fix it free. If we can't fix it, you don't pay."
8. Fit Section - "This is for you if:" with checkmarks / "Probably not a fit if:" with X marks
9. Who We Are - "Who builds this?" with company positioning
10. FAQ - Direct answers, no fluff
11. Final CTA - "Ready to stop doing the work you hate?"
12. Footer - "Built for small teams that hate busywork."

### Routes
- `/` - Main landing page
- `/calculator` - Standalone Hours Saved calculator

## External Dependencies

### Third-Party Services
- **Calendly**: 15-minute discovery call booking (https://calendly.com/veyragroup/15min)
- **Google Fonts**: Inter font family
- **Resend**: Email integration (installed)

### Database
- **PostgreSQL**: Primary database accessed via `DATABASE_URL` environment variable

### UI Framework
- **Radix UI**: Headless component primitives for accessibility
- **shadcn/ui**: Pre-built component library with custom dark styling
- **Lucide React**: Icon library
- **Framer Motion**: Animation library

## Pricing Structure
- **Starter Build**: $2,000 - $3,000 (1-2 automations, 1 week, 30 days support)
- **Full Build**: $4,000 - $6,000 (3-5 automations + AI helper, 2 weeks, 60 days support)
- **Monthly Partner**: $3,000/month (8-12 hours build time, unlimited small fixes)

## Recent Changes
- **Feb 3, 2026**: Copy update V3 with new pricing
  - New hero: "Your Team Wastes 10 Hours Every Week on Work a Computer Should Do. I Make It Stop."
  - Problem section now uses $35/hr, $18K/year, $90K for team of 5
  - Calculator defaults to $35/hr
  - Pricing: Starter $2K-$3K, Full Build $4K-$6K, Monthly Partner $3K/mo
  - Updated service card copy
  - Deeper, darker background with more contrast (hsl 220 20% 2%)
  - Emerald green (#10b981) and steel blue (#64748b) color scheme
- **Feb 2, 2026**: Premium $25K design upgrade
  - Mesh gradient animated background
  - Grain texture overlay at 4% opacity
  - Enhanced glassmorphism and glow effects
  - Bento grid layout for services
  - Staggered pricing cards with "Most Popular" highlight
