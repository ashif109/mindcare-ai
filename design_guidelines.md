# MindCare Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern healthcare and wellness platforms like Headspace, Calm, and modern SaaS dashboards. The design should feel trustworthy, calming, and professional while maintaining a fresh, student-friendly aesthetic.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Light Mode: 168 76% 42% (calming teal-green)
- Dark Mode: 168 65% 35% (deeper teal)

**Supporting Colors:**
- Background Light: 0 0% 98%
- Background Dark: 220 13% 8%
- Text Light: 220 9% 15%
- Text Dark: 0 0% 90%
- Success: 142 71% 45% (mental wellness green)
- Warning: 45 93% 58% (gentle amber for alerts)
- Accent: 264 89% 78% (soft purple for highlights)

**Gradients:**
- Hero background: Subtle gradient from 168 76% 42% to 264 89% 78%
- Card overlays: Gentle gradients using primary colors at 10-20% opacity
- Button gradients: Primary to slightly darker shade for depth

### Typography
**Primary Font:** Inter (Google Fonts)
- Headings: 600-700 weight
- Body: 400-500 weight
- UI Elements: 500 weight

**Font Scale:**
- Hero title: text-5xl to text-6xl
- Section headers: text-3xl to text-4xl
- Card titles: text-xl
- Body text: text-base
- Small text: text-sm

### Layout System
**Spacing Units:** Tailwind units of 2, 4, 6, 8, 12, 16
- Container padding: p-4 to p-8
- Section spacing: my-12 to my-16
- Card spacing: p-6
- Button padding: px-8 py-4

### Component Library

**Navigation:**
- Fixed transparent navbar with blur backdrop
- Smooth transitions on scroll
- Dropdown menus with subtle shadows

**Cards:**
- Rounded corners (rounded-xl)
- Subtle shadows with blur
- Glass-morphism effect for overlays
- Hover states with gentle scale transforms

**Buttons:**
- Primary: Solid with gradient background
- Secondary: Outline with blurred background when on images
- Rounded-lg corners
- No custom hover states (use default button interactions)

**Forms:**
- Clean, minimal inputs with focus states
- Floating labels for modern feel
- Validation states with color coding

**Dashboard Elements:**
- Chart containers with rounded backgrounds
- Progress bars with gradient fills
- Metric cards with large numbers and descriptive text

### Images
**Hero Section:**
- Large background image of diverse students in a calm, supportive environment
- Gradient overlay for text readability
- Image should convey mental wellness and community

**Feature Sections:**
- Illustration-style images showing meditation, study balance, and peer support
- Consistent color palette matching the brand
- Images should be optimistic and inclusive

**Dashboard:**
- Abstract, calming background patterns
- Minimal icons for features (use Heroicons)
- Avatar placeholders for user profiles

### Animations
**Minimal Approach:**
- Fade-in animations for page load
- Gentle hover effects on interactive elements
- Breathing animation for mindfulness exercises
- Smooth transitions between light/dark modes
- Progress bar animations for trackers

### Accessibility & Modes
- Consistent dark mode implementation across all components
- High contrast ratios for text readability
- Focus indicators for keyboard navigation
- Language toggle prominently placed
- Emergency SOS button always visible with distinct styling

### Visual Hierarchy
- Clear section separation with consistent spacing
- Progressive disclosure for complex features
- Prominent CTAs with sufficient whitespace
- Consistent card-based layout for content organization

This design system creates a trustworthy, calming, and modern interface that supports student mental health while maintaining professional credibility suitable for hackathon judging.