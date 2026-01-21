
# Luxuriio Concept — Design & GPU Optimization Guide

## Overview
This document defines the **design philosophy**, **interaction model**, and **GPU‑optimized animation strategy**
for the Luxuriio Concept luxury interior design website.

The goal is to deliver a **cinematic, premium experience** while keeping **GPU usage minimal**, ensuring smooth
performance on all devices (mobile, tablet, desktop) and compatibility with **Vercel free hosting**.

---

## Design Philosophy

- Dark luxury visual language
- Calm, confident, architectural tone
- Visual storytelling over text
- Motion used as guidance, not decoration
- No clutter, no statistics, no loud marketing copy

### Core Experience
- The website behaves like a **continuous visual reel**
- Scroll is the primary interaction
- Content reveals itself progressively
- Animations educate the user without instructions

---

## Color System (Locked)

Only the following palette is allowed:

```txt
Primary Background      → #10130E
Secondary Background    → #243027
Card / Overlay          → #373F3C

Primary Gold Accent     → #E5DB96
Hover Gold              → #BDA85B
Muted Gold              → #7B7145

Primary Text (Light)    → #F5F5F0
Muted Text              → #B7B7A4
```

No additional colors are permitted.

---

## Layout Structure

1. Entry Logo Section (Scroll‑Driven)
2. Image Showcase (Mixed Orientation)
3. Continuous Scroll Visual Flow
4. Vertical Reels Carousel (9:16)
5. Founder Message (Emotional Close)
6. Minimal Footer with Contact Links

---

## Entry Interaction (Logo Reveal)

- Full‑screen centered logo on load
- Logo slightly zoomed in
- On scroll:
  - Logo scales down
  - Moves backward in depth
  - Fades smoothly
  - Reveals image content behind it

This animation runs **once only**.

---

## Image Showcase Design

- Mixed portrait and landscape images
- Masonry / carousel hybrid layout
- Slow auto‑slide movement
- Hover interaction:
  - Subtle zoom
  - Gold glow border
- Click / tap:
  - Centered zoom modal
  - Darkened background
  - Smooth fade transitions

Images speak — no captions, no text overlays.

---

## Reels Carousel (9:16)

- Vertical short videos
- Curved / depth‑based carousel
- Center reel emphasized
- Side reels angled visually
- Muted autoplay
- Loopable 5–8 second reels

Only **one reel plays at a time**.

---

## Founder Section

- Calm, dark environment
- Founder image or silhouette
- Short quote‑style message
- Gold accent motion
- Emotional, not promotional

---

## Footer

- Logo
- Tagline only
- Clickable:
  - Phone
  - Email
  - Instagram
  - Facebook

No metrics, no achievements, no clutter.

---

## GPU Optimization Strategy

### Core Rule
> Only perception‑critical animations use the GPU.

### Allowed Animated Properties
- transform (translate, scale, rotate)
- opacity

### Forbidden / Limited
- Layout animations
- Continuous backdrop blur
- Animated box‑shadows
- Multiple simultaneous videos
- Infinite scroll‑scrub animations

---

## Smart Animation Techniques

### 1. One‑Time GPU Usage
- Logo animation runs once
- `will-change` removed after completion

### 2. Selective Motion
- Only focused image animates
- Neighbour elements remain static

### 3. Stepped Parallax
- Scroll checkpoints instead of continuous scrubbing
- Reduced GPU workload with same depth illusion

### 4. Video Control
- One active video max
- Others paused with static posters
- Videos load only when in viewport

### 5. CSS‑First Hover Effects
- Transform + opacity transitions
- Pseudo‑elements for glow
- No animated shadows

---

## Accessibility & Device Adaptation

- Respect `prefers-reduced-motion`
- Reduced animation distance on mobile
- Touch‑friendly interactions
- No hover dependency on mobile

---

## Performance Targets

- Lighthouse score: 90+
- Zero layout shift (CLS)
- Lazy loading for all media
- WebP / AVIF images
- MP4 + WebM video formats
- Fast Time to Interactive

---

## Hosting Considerations

Optimized for:
- Vercel Free Tier
- Static generation where possible
- No heavy runtime computation
- Minimal JS on initial load

---

## Final Intent

This website should feel like:
> A luxury interior studio that does not explain — it **reveals**.

Motion is subtle.  
Design is confident.  
Performance is invisible.
