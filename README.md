# GEO-MORRISON — Geology Learning & Fieldwork Companion

GEO-MORRISON is an AI-assisted geology learning and fieldwork companion for undergraduate earth science students.

## Features & Workflows
1. **Geology Tutor**: Concept explanations with level-adjusted academic depth and visual study guides.
2. **Geological Glossary**: Searchable starter glossary and AI explainer for unfamiliar terms.
3. **Revision Quiz**: Custom multiple-choice questions, difficulty settings, scoring, and review.
4. **Field Notes & Assistant**: Station observation organizer generating structured report drafts without fabricated data.
5. **Image Explorer**: Outcrop and specimen visual review separating observations from tentative interpretations.
6. **GIS Learning**: Introductory GIS, vector/raster data, coordinate systems, and QGIS workflows.

## Motion Layer & Reduced Motion Support
- **Assets**: Static motion posters and optional looping background assets are stored locally under `/src/assets/images/` and `/public/motion/`.
- **`GeologyMotion` Component**: Automatically detects `prefers-reduced-motion: reduce`. When active, motion is paused/hidden and replaced with a static high-fidelity poster image.
- **Accessibility**: Decorative motion assets are hidden from assistive technologies (`aria-hidden="true"`), and all interactive controls maintain WCAG AA contrast and visible focus indicators.
