Role: You are an award-winning UI/UX Designer and Senior Frontend Architect specializing in futuristic, high-conversion web experiences.
Task: Create the code structure and design system for a Digital Marketing & SEO Agency website consisting of 12 distinct pages.
Design Aesthetic ("Futuristic"):
Visual Style: "Cyber-Corporate." Think deep obsidian backgrounds, neon gradients (electric blue, magenta, cyan), glreassmorphism (frosted glass effects) for cards/navbars, and subtle WebGL/3D background animations.
Typography: Clean, sans-serif fonts (e.g., Inter or Space Grotesk) with massive, bold headings.
Interactions: High-end micro-interactions, scroll-triggered animations (Framer Motion/GSAP), and hover effects that glow.
Key Technical Requirement (RTL/LTR):
The site must have a global state toggle for LTR (Left-to-Right) and RTL (Right-to-Left) text direction.
Use CSS Logical Properties (e.g., margin-inline-start instead of margin-left) to ensure layout integrity when switching languages (e.g., English to Arabic).
Page List & Requirements:
index.html: Hero section with 3D elements, bento-grid style feature showcase, animated stats.
index2.html: Alternative layout, video-background heavy, distinct from index 1.
about.html: Team carousel, timeline of company history (holographic style).
contact.html: Interactive map, floating input fields, glassmorphic form.
pricing.html: 3 pricing cards with a "Recommended" card that pulses/glows. Toggle for Monthly/Yearly.
services.html: Grid layout with hover-reveal details for SEO, PPC, Content.
case-studies.html: Filterable portfolio grid.
login.html: Split screen (Image/3D on left, Form on right).
admin-dashboard.html: Sidebar nav, data visualization charts (ApexCharts/Recharts), user management table.
user-dashboard.html: Project status trackers, invoice download area.
404.html: Glitch effect text, animated robot or black hole graphic.
coming-soon.html: Countdown timer, email capture with magnetic button.
Output: Provide the HTML structure, Tailwind CSS classes (or CSS variables), and the JavaScript logic for the LTR/RTL toggle.
Part 2: Product Requirements Document (PRD)
Project Name: Nexus SEO - Futuristic Digital Marketing Platform
Version: 1.0
Status: Draft
1. Executive Summary
To build a high-performance, visually stunning website for a Digital Marketing agency. The design must bridge the gap between professional corporate trust and futuristic technological innovation. The system must support international clients via seamless RTL/LTR switching.
2. User Personas
The Client: Looking for modern, cutting-edge marketing services. Wants to be impressed by the agency's own website speed and design.
The Admin: Needs a bird's-eye view of agency performance, user stats, and leads.
The User: Existing client logging in to check the status of their SEO campaigns.
3. Design System & UI Guidelines
Theme: Dark Mode Default.
Color Palette:
Primary: Neon Cyan (#00F0FF)
Secondary: Electric Purple (#7000FF)
Background: Deep Void (#050505) to Charcoal (#121212)
Text: Off-white (#E0E0E0) for readability.
Shapes: Rounded corners (20px), floating elements, blurred backdrops.
LTR/RTL Logic:
A floating "Globe" icon in the navbar toggles direction.
In RTL mode, the font family switches to an Arabic-optimized font (e.g., 'Tajawal' or 'Cairo').
4. Detailed Page Specifications
A. Marketing Pages
Index 1 (Main Home):
Hero: Large typography saying "Future of SEO" with a WebGL particle effect background.
Features: Bento-grid layout (grids of different sizes) displaying services.
Index 2 (Variant):
Hero: Full-screen video background with overlay text.
Focus: More text-heavy, strictly corporate but with neon accents.
About:
Team: Cards that flip on hover to reveal skills.
Story: Vertical scroll timeline with glowing connection lines.
Services:
Interactive tabs. Clicking "SEO" changes the background image dynamically.
Pricing:
Toggle switch (Monthly/Yearly) with a sliding animation.
Glassmorphic cards that tilt 3D based on mouse position.
Case Studies:
Masonry grid layout.
"Load More" button with infinite spinner animation.
Contact:
Form validation with success messages that appear as "system notifications."
B. Utility Pages
Login:
Social login buttons (Google/LinkedIn).
"Forgot Password" flow.
404 Error:
Interactive element (e.g., user can move the mouse to push away "floating debris").
"Return to Base" button.
Coming Soon:
Live countdown timer based on user timezone.
Subscription form for updates.
C. Dashboard Application
Admin Dashboard:
Sidebar: Collapsible.
Widgets: Real-time active users, revenue graph (line chart), recent tickets list.
Dark/Light Toggle: Specifically for the dashboard to aid reading data.
User Dashboard:
Project Progress: Circular progress bars for "SEO Health," "Backlinks Created."
Invoices: Downloadable PDF list.
5. Technical Stack Requirements
Framework: HTML5 / React / Next.js (depending on preference).
Styling: Tailwind CSS (Crucial for rapid RTL support via rtl: modifiers).
Animations: Framer Motion (React) or GSAP (Vanilla JS).
Icons: Lucide React or FontAwesome Pro.
Localization: i18next for managing text translations alongside the RTL toggle.
6. Acceptance Criteria
All 12 pages must be responsive (Mobile, Tablet, Desktop).
RTL toggle must instantly flip the layout (mirror image) without breaking alignment.
Dashboards must distinguish visually between "Admin" (more data density) and "User" (simpler UI).
Lighthouse Performance score must be >90 (optimized images/code).