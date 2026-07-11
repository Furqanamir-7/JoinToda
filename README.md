# TODA International — Homepage

A dark, premium, Vite + React + Tailwind CSS site for the Truck Owners & Drivers Association
(TODA International). Features an interactive rotating 3D globe (Google-Earth-style) with
member pins for USA, Canada, Mexico, Saudi Arabia, and Iran.

## Pages

- `/` — **Truckers of the World, Unite!** (homepage)
- `/become-member` — **Become Member** (pricing tiers)
- `/about` — **About Us** (story, timeline, contact)
- `/resources` — **Resources** (searchable articles + downloads)
- `/global-network` — **Global Network** (full-size globe + node detail cards)

## Tech

- **Vite** + **React 18**
- **Tailwind CSS** with custom dark theme (orange accent `#F97316`)
- **Framer Motion** for entrance / hover / counter animations
- **react-router-dom** for the 5-page SPA
- **react-globe.gl** + **three.js** for the interactive 3D Earth
- **react-icons** (Feather + Font Awesome 6)

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
```

## Production build

```bash
npm run build
npm run preview
```

## Deploying to Vercel

The repo already contains a `vercel.json` with SPA rewrites.

### Option A — via the Vercel website (easiest)

1. Push this folder to a Git repo (GitHub / GitLab / Bitbucket).
2. Go to <https://vercel.com/new>, import the repo.
3. Framework preset is auto-detected as **Vite**. Click **Deploy**.

### Option B — via the Vercel CLI

```bash
npm i -g vercel
vercel login
vercel            # preview deployment
vercel --prod     # production deployment
```

## Project structure

```
src/
  components/
    InteractiveGlobe.jsx   # 3D rotating Earth with pins
    Hero.jsx               # Homepage hero (uses the globe)
    Navbar.jsx, TopBar.jsx, Footer.jsx, Logo.jsx
    GlobalNetwork.jsx, MembershipBenefits.jsx,
    NewsSection.jsx, StatsSection.jsx,
    SocialSection.jsx, CTASection.jsx,
    PageHero.jsx, ScrollToTop.jsx
  pages/
    Home.jsx
    BecomeMember.jsx
    About.jsx
    Resources.jsx
    GlobalNetworkPage.jsx
  data/
    networkData.js     # regions + globe pin coordinates
    newsData.js
  App.jsx, main.jsx, index.css
```

## Customising the globe

Pin locations live in `src/data/networkData.js` under `globePins`. Each pin needs
`{ name, code, lat, lng, members, region, color }`. Add or remove entries and the
globe + Global Network page automatically reflect the change.

The globe textures are loaded from `unpkg.com/three-globe/example/img/` (Earth at night
+ topology bumpmap) so there are no local assets to manage.
