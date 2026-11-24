# GEO-MORRISON
## Technical Requirements Document (TRD)

**Version:** 1.0  
**Status:** MVP build specification  
**Product type:** AI-assisted geology learning and fieldwork companion  
**Build environment:** Google AI Studio Build Mode  
**Deployment target:** Vercel

---

## 1. Product overview

GEO-MORRISON is a learning companion for geology and geoscience students. It helps learners understand geological concepts, revise course material, organise field observations and learn introductory GIS concepts.

The MVP must deliver five practical workflows:

1. Explain geology topics in clear, structured language.
2. Search a starter geological glossary and request explanations for unfamiliar terms.
3. Generate and complete geology revision quizzes.
4. Turn user-entered field observations into an editable report draft.
5. Review geological images for visible features and possible interpretations, with clear limitations.

A supporting GIS learning area introduces core GIS and QGIS concepts. GEO-MORRISON is an educational aid, not a substitute for field verification, laboratory testing, authoritative geological references or professional judgement.

### Product principles

- Geology first. Every core workflow must serve a geology or geoscience learning need.
- Clarity over complexity. Explain technical terms without losing scientific meaning.
- Evidence before certainty. Separate direct observations from AI interpretations.
- Field-ready utility. Organise what the student actually observed; never invent field data.
- Complete workflows over decorative features.
- Mobile-friendly forms and reading experiences.
- Responsible AI use, with bounded requests and visible uncertainty.

## 2. Goals and non-goals

### MVP goals

- Responsive web application with a clear geology-focused identity.
- Five functional workflows: tutor, glossary, quiz, field notes and image explorer.
- Supporting introductory GIS learning section.
- Real Gemini API integration through server-side routes.
- Copy and locally save useful results.
- No mandatory registration for initial use.
- Clear loading, empty, validation, error and uncertainty states.
- Deployable as a standard Next.js application on Vercel.

### Out of scope for MVP

Do not build these until the core workflows are complete and tested:

- Full GIS or desktop mapping engine.
- Satellite imagery processing or remote-sensing classification.
- Definitive automated rock, mineral, fossil or formation identification.
- Geological map digitisation, georeferencing or spatial analysis.
- GPS tracking or automatic collection of device location.
- Offline map tiles or navigation.
- Stereonet calculations or advanced structural geology tools.
- Stratigraphic correlation engine.
- Public feeds, messaging, student groups or classroom administration.
- Payments, subscriptions or institutional billing.
- Native mobile application.
- Automatic academic referencing or fabricated citations.
- PDF/DOCX parsing in the first release. Start with pasted text and image upload for the image explorer.
- Authentication solely to support MVP history. Cloud sync can be added later.

## 3. Users and user stories

### Primary users

- Undergraduate geology students.
- Geoscience and earth science students.
- Beginner GIS learners.
- Students preparing for geology tests and examinations.
- Students organising field observations and reports.
- Independent geology learners.

### User stories

**Geology tutor**
- As a student, I want to ask about a geological concept in plain language so I can understand it before studying more advanced material.
- I want examples and a short recap to support revision.

**Glossary**
- I want to search geological terms and see concise definitions.
- I want to switch between a technical definition and a simpler explanation.

**Quiz**
- I want to generate questions from a topic or my notes.
- I want to see my score and explanations after submitting answers.

**Field assistant**
- I want to organise location, lithology, colour, grain size, structures and relationships into a report draft.
- I want missing details to be marked, not guessed.

**Image explorer**
- I want a preliminary description of visible features in a rock, outcrop, fossil or geological structure image.
- I want observations and possible interpretations clearly separated.

**GIS learning**
- I want beginner-friendly explanations of GIS, map layers, coordinate systems and common QGIS workflows.

## 4. Information architecture and routes

| Route | Purpose |
|---|---|
| `/` | Product landing page |
| `/workspace` | Dashboard and tool selection |
| `/tutor` | Geology question and explanation |
| `/glossary` | Searchable glossary and term explainer |
| `/quiz` | Quiz generation and quiz-taking |
| `/field-notes` | Field observation form and report drafting |
| `/image-explorer` | Geological image review |
| `/gis-learning` | Introductory GIS learning |
| `/history` | Locally saved sessions |
| `/settings` | Preferences and local data controls |

The shared application shell must include the GEO-MORRISON wordmark, primary navigation, active-page state, recent-history entry point and settings/data controls. On mobile, use compact navigation that does not cover the working content.

## 5. UX and visual design direction

### 5.1 Design concept: Geological Field Journal

The visual identity should draw from field notebooks, stratigraphic logs, contour lines, specimen labels and measured annotations. It should feel like a modern scientific field journal, not a generic AI dashboard.

Use these abstract design concepts:

- **Stratigraphic rhythm:** restrained horizontal bands and tonal shifts to organise sections.
- **Field notebook structure:** clear labels, ruled dividers, compact metadata and generous writing areas.
- **Topographic linework:** subtle contour motifs in backgrounds or dividers only; never behind important text.
- **Specimen catalogue:** small, consistent metadata labels for topic, observation type or difficulty.
- **Material palette:** muted stone, paper, shale, moss and clay-inspired colours.
- **Measured annotation:** numbered sections, coordinate-style labels and concise captions.
- **Scientific clarity:** diagrams and images should be functional and labelled, not decorative.

### 5.2 Visual restrictions

Avoid common, overused AI-product styling:

- No sparkle icons, starbursts, magic wands or glowing AI orbs as recurring decoration.
- No glowing gradients, neon borders, glassmorphism or floating blobs.
- No robot illustrations, circuit patterns or generic AI stock art.
- No excessive pills, badges, icons or decorative charts.
- Do not use em dashes in interface copy. Prefer full stops, commas or parentheses.
- Avoid exaggerated claims such as “revolutionary”, “unlock your potential” or “the future of geology”.
- Avoid repetitive phrases such as “Here is your AI-powered journey”.
- Do not use emoji as interface icons.
- Do not turn every section into a rounded card. Use typography, whitespace, dividers and structured panels.
- Do not add decorative maps that imply real spatial data when none exists.

### 5.3 Suggested design tokens

| Token | Suggested value | Use |
|---|---|---|
| Background | `#F4F3EE` | Main page background |
| Surface | `#FFFFFF` | Work surfaces |
| Primary text | `#252A27` | Headings and body |
| Secondary text | `#69716B` | Supporting text |
| Primary accent | `#526B57` | Main actions and active states |
| Deep accent | `#35483B` | Strong emphasis |
| Stone | `#D9D4C8` | Secondary surfaces |
| Clay | `#B8795B` | Small accent and annotation |
| Pale moss | `#E7ECE4` | Selected states |
| Border | `#DFE2DA` | Dividers and inputs |
| Warning | `#A66A24` | Cautions |
| Error | `#B4473E` | Errors |
| Success | `#397451` | Completion feedback |

Typography:
- Use a readable sans-serif such as Inter, Geist or a comparable system font.
- A restrained serif may be used for selected editorial headings.
- Body text should generally be 15–16px or larger.
- Use monospaced text sparingly for coordinates, sample IDs or technical metadata.
- Keep long explanations within a comfortable reading width.

Layout:
- Desktop content width should generally be 1100–1240px.
- Use a consistent 4px or 8px spacing scale.
- Use thin borders and restrained corner radii.
- Keep forms and result panels aligned.
- Use subtle motion only when it clarifies an interaction.
- Respect reduced-motion preferences.

### 5.4 Interface writing

Use direct, calm language.

Examples:
- “What geology topic are you studying?”
- “Describe what you observed at the outcrop.”
- “Add the details you recorded in the field.”
- “Explore a geological term.”
- “Describe visible features, then review possible interpretations.”
- “This is a preliminary description, not a confirmed identification.”

Avoid unnecessary use of “AI”, “smart”, “intelligent” and “powered” in interface labels.

## 6. Functional requirements

### 6.1 Landing page

Must:
- Explain GEO-MORRISON in one concise headline and supporting sentence.
- Introduce the main learning and fieldwork tools.
- Provide a clear “Open workspace” action.
- Include a short educational-use and interpretation disclaimer.
- Work on mobile and desktop.
- Avoid fake testimonials, invented user counts and unsupported claims.

### 6.2 Workspace dashboard

Must:
- Show Geology Tutor, Glossary, Quiz, Field Notes and Image Explorer.
- Include GIS Learning as a supporting area.
- Give each tool a concise description.
- Show recent saved sessions when available.
- Provide a useful first-use empty state.
- Avoid decorative statistics that are not based on actual data.

### 6.3 Geology tutor

Inputs:
- Question or topic (required).
- Optional course or subject area.
- Explanation level: `Simple`, `Undergraduate`, `Detailed`.
- Optional format: `Concept explanation`, `Step-by-step`, `Example-based`, `Compare two concepts`.

Requirements:
- Reject empty questions and enforce a configurable length limit.
- Return a clear title, short introduction, structured sections and concise recap.
- Define technical terms when first introduced.
- Include geology-related examples where useful.
- Explain processes, conditions and observable evidence where relevant.
- Do not invent references, page numbers or claims that a source was consulted.
- Explain distinctions where a question has multiple accepted interpretations.
- Include a short reminder to verify important details against course materials.
- Allow copy and save.

Example topics include sedimentary structures, orogeny, facies, Walther's Law, lithification, diagenesis, metamorphism, hydrology, petrology, stratigraphy and structural geology.

### 6.4 Geological glossary

Requirements:
- Provide a searchable glossary interface.
- Include a small starter glossary of reviewed common terms stored locally in the project.
- Search must filter starter terms immediately without an API request.
- If a term is not in the starter glossary, allow an AI-assisted explanation.
- Return a concise technical definition, simpler explanation, relevant example or context, and related terms where appropriate.
- Clearly label AI-generated explanations.
- Do not claim AI-generated definitions are verified dictionary entries.
- Allow copy and save.

Start with a small, organised set of common terms. Do not generate a huge glossary at build time.

Suggested initial categories: General Geology, Mineralogy, Petrology, Sedimentology, Structural Geology, Stratigraphy, Hydrology, Geomorphology and GIS.

### 6.5 Revision quiz

Inputs:
- Topic or source notes (at least one required).
- Question count: 5, 10 or 15.
- Difficulty: `Easy`, `Moderate`, `Challenging`.
- MVP question type: multiple choice.

Requirements:
- Generate four options per question.
- Each question must have exactly one correct answer.
- Hide the answer key until submission.
- Allow one answer per question.
- Provide previous/next navigation and a progress indicator.
- Confirm submission if unanswered questions remain.
- Calculate the score in the browser using the validated answer key.
- Show score, selected answer, correct answer and explanation after submission.
- Provide “Try again” and “Create another quiz”.
- Do not present generated questions as official examination questions.

### 6.6 Field notes and report assistant

Inputs:
- Field location or station name (optional).
- Date and time (optional).
- Coordinates (optional, entered by the user).
- Elevation (optional).
- Outcrop or exposure description (required).
- Rock type or suspected lithology (optional).
- Colour (optional).
- Grain size and texture (optional).
- Sedimentary, igneous or structural features observed (optional).
- Bedding, dip and strike measurements (optional).
- Relationships or contacts observed (optional).
- Weather or field conditions (optional).
- Additional notes (optional).
- Report style: `Field notebook`, `Structured field report`, `Observation summary`.

Requirements:
- Group fields clearly and distinguish required from optional.
- Do not request device location automatically.
- Coordinates must not be required.
- Generate a structured draft using only supplied observations.
- Preserve original measurements, names, units and descriptions.
- Mark missing information as “Not recorded” or omit it.
- Never fabricate observations.
- Separate “Observed” information from “Possible interpretation”.
- Label interpretations as provisional and explain what evidence would support them.
- Allow editing before copying or saving.
- Include copy and clear-form actions.
- Remind users to verify measurements and interpretations before academic submission.

Suggested report sections:
1. Station or location details.
2. General exposure description.
3. Lithology and physical characteristics.
4. Sedimentary or structural features.
5. Measurements and spatial information.
6. Field relationships.
7. Interpretation, only when requested and supported.
8. Missing information or points requiring investigation.

### 6.7 Geological image explorer

Inputs:
- Image upload (required).
- Optional context: `Hand specimen`, `Outcrop`, `Thin section`, `Fossil`, `Geological structure`, `Uncertain`.
- Optional user question.

Requirements:
- Accept JPG, JPEG, PNG and WebP.
- Validate MIME type and file size. Initial maximum: 5 MB.
- Preview before submission.
- Allow image removal or replacement.
- Send image to Gemini through a server-side route using a model that supports image input.
- Return:
  - Neutral description of visible features.
  - Visible texture, colour, grain or shape observations where discernible.
  - Possible interpretations, clearly marked tentative.
  - Alternative explanations where relevant.
  - Additional evidence or tests that may help distinguish possibilities.
  - Plain-language confidence statement, without false precision.
- Do not assert definitive mineral, rock, fossil or formation identification from an ordinary photograph.
- Do not infer locality, age, formation or geological history unless supplied and supported.
- Explain when image quality, scale, lighting or context is insufficient.
- Allow copy and save of the text result.
- Do not retain uploaded images in server storage for the MVP.

Describe this as a preliminary visual learning aid, not a diagnostic or laboratory identification service.

### 6.8 GIS learning assistant

This is a supporting educational section, not a GIS software replacement.

Include short starter topics:
- What GIS is.
- Vector and raster data.
- Map layers.
- Coordinate reference systems.
- Scale and map projections.
- Attribute tables.
- Basic QGIS project workflow.

Allow learners to request simpler explanations and step-by-step beginner guidance. Do not claim to control or inspect the user's installed QGIS application. Do not fabricate map outputs or claim that a GIS operation was executed.

### 6.9 Study history

For MVP, use browser local storage.

Requirements:
- Save only when the user chooses “Save”.
- Store tool type, title, creation date and relevant text or structured result.
- Allow a saved session to be opened and deleted.
- Provide “Clear all saved data” in Settings with confirmation.
- Explain that history belongs to the current browser and does not sync across devices.
- Handle unavailable, full or disabled local storage gracefully.
- Do not store API keys or unnecessary personal information.
- Do not store uploaded images by default. Save text results only.

## 7. Gemini integration

### 7.1 Architecture

Use the official Google Gen AI SDK supported by the current environment. All Gemini calls must be made through server-side Next.js Route Handlers. The browser must never call Gemini with a private API key.

Create one shared Gemini client/service and separate prompt builders for each workflow. Keep prompts concise, specific and version-controlled.

### 7.2 API routes

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/geo/tutor` | Explain a geology topic |
| `POST` | `/api/geo/glossary` | Explain a geological term |
| `POST` | `/api/geo/quiz` | Generate quiz JSON |
| `POST` | `/api/geo/field-report` | Draft a report from observations |
| `POST` | `/api/geo/image-review` | Describe a geological image |
| `POST` | `/api/geo/gis-learning` | Explain a GIS concept |

Each route must validate the request with Zod or an equivalent, enforce input and output limits, call the shared Gemini service, validate structured output, return predictable JSON and handle provider errors without leaking secrets.

### 7.3 Model configuration

- Read model identifiers from environment variables.
- Do not hard-code model names across the application.
- Select currently available models in Google AI Studio and verify free-tier eligibility.
- Verify text generation support.
- For image review, verify image-input support.
- If separate models are needed, use `GEMINI_TEXT_MODEL` and `GEMINI_VISION_MODEL`.
- Keep model selection configurable.
- Do not promise unlimited free requests.

### 7.4 Prompt and scientific safeguards

All prompts should:
- Act as a patient geology learning assistant.
- Prefer user-supplied notes and observations for source-based tasks.
- Distinguish direct observations from interpretations.
- Avoid fabricated citations, references, measurements, coordinates or locations.
- State uncertainty when evidence is insufficient.
- Avoid turning a plausible interpretation into a confirmed identification.
- Match the requested educational level.
- Define technical terms clearly.
- Use concise structure and avoid filler.

For field reports:
- Treat user-entered observations as source data.
- Never add measurements, minerals, structures or location information not provided.
- Preserve units and original values.
- Mark missing details as “Not recorded” where needed.
- Separate interpretation from observation.

For image review:
- Describe visible evidence before offering interpretations.
- Do not infer geological age, formation, locality or origin from appearance alone.
- State when a photograph cannot support a reliable conclusion.
- Suggest useful follow-up observations or tests without pretending they were performed.

### 7.5 Structured response contracts

Request JSON for quiz generation and structured field-report sections. Validate before rendering.

**Quiz response**

```json
{
  "title": "Sedimentary Structures",
  "questions": [
    {
      "id": "q1",
      "question": "Which structure commonly forms from migrating ripples?",
      "options": ["Cross-lamination", "Jointing", "Cleavage", "Foliation"],
      "correctIndex": 0,
      "explanation": "Migration of small ripples can produce inclined laminae."
    }
  ]
}
```

Quiz validation:
- Question count must match the request or return a controlled generation error.
- Every question has exactly four non-empty options.
- `correctIndex` is an integer from 0 to 3.
- IDs are unique.
- Question and explanation are non-empty.

**Field report response**

```json
{
  "title": "Field Observation Report",
  "sections": [
    {
      "heading": "General exposure description",
      "content": "Report text based only on the user's supplied observations."
    },
    {
      "heading": "Observed features",
      "content": "Only features supplied by the user."
    },
    {
      "heading": "Possible interpretation",
      "content": "A provisional interpretation, or a note that more evidence is needed."
    }
  ],
  "missingInformation": ["Dip and strike were not recorded."]
}
```

Field report validation:
- Sections must contain non-empty headings and content.
- Missing information must be an array of strings.
- Malformed output must not overwrite original form data.
- User must be able to edit the draft.

**Image review response**

```json
{
  "visibleObservations": [
    "The image shows a light-coloured surface with visible grains."
  ],
  "possibleInterpretations": [
    {
      "interpretation": "A granular sedimentary material may be present.",
      "reason": "Visible grain-like texture.",
      "caution": "A photograph alone is insufficient for confirmation."
    }
  ],
  "limitations": ["No scale is visible in the image."],
  "recommendedFollowUp": ["Provide a close-up image with a scale reference."]
}
```

Image response validation:
- Validate all arrays and object fields.
- Do not show confidence percentages without a defensible calibrated basis.
- Inconclusive interpretations are acceptable and should be shown honestly.

### 7.6 Token and cost controls

- Set maximum text input lengths for every tool.
- Set a maximum image file size.
- Request bounded output lengths.
- Do not call Gemini while the user types.
- Generate only after an explicit user action.
- Disable duplicate submissions while a request is running.
- Do not automatically retry failed requests repeatedly.
- Provide a clear retry action.
- Set request timeouts.
- Keep model and token settings configurable.
- Add basic rate limiting. For reliable production limits across serverless instances, use a shared rate-limit store. Do not rely on in-memory counters as production protection.
- Avoid resending large context unnecessarily.
- Do not promise unlimited free use.

## 8. Technical architecture

### 8.1 Recommended stack

| Layer | Technology |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript |
| UI | React |
| Styling | Tailwind CSS |
| Components | shadcn/ui or accessible custom components |
| Icons | Lucide |
| Validation | Zod |
| AI | Gemini API via official Google Gen AI SDK |
| Anonymous persistence | Browser local storage |
| Hosting | Vercel |
| Source control | GitHub |

Use stable, compatible package versions available at build time. Avoid unnecessary dependencies.

### 8.2 Suggested project structure

```text
geo-morrison/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── workspace/page.tsx
│   ├── tutor/page.tsx
│   ├── glossary/page.tsx
│   ├── quiz/page.tsx
│   ├── field-notes/page.tsx
│   ├── image-explorer/page.tsx
│   ├── gis-learning/page.tsx
│   ├── history/page.tsx
│   ├── settings/page.tsx
│   └── api/geo/
│       ├── tutor/route.ts
│       ├── glossary/route.ts
│       ├── quiz/route.ts
│       ├── field-report/route.ts
│       ├── image-review/route.ts
│       └── gis-learning/route.ts
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── tutor/
│   ├── glossary/
│   ├── quiz/
│   ├── field-notes/
│   ├── image-explorer/
│   ├── gis-learning/
│   └── ui/
├── lib/
│   ├── gemini/
│   │   ├── client.ts
│   │   ├── prompts.ts
│   │   └── generate.ts
│   ├── schemas/
│   ├── glossary/terms.ts
│   ├── storage/history.ts
│   ├── validation.ts
│   └── utils.ts
├── types/geology.ts
├── public/
├── .env.example
├── package.json
└── README.md
```

This is a suggested structure, not a requirement to create empty files. Add files only when they have a clear purpose.

### 8.3 Shared API response

Success:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

Failure:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Please wait and try again."
  }
}
```

Use suitable HTTP status codes: `400` invalid input, `413` payload too large, `415` unsupported media type, `429` rate limited, `502` or `503` provider failure, and `500` unexpected server error. Never expose provider stack traces, credentials or raw internal errors.

## 9. Local storage

No database is required for the MVP.

Use the versioned key:

`geo-morrison:history:v1`

Suggested record:

```json
{
  "id": "session-generated-id",
  "tool": "field-notes",
  "title": "Bonny Road Bridge Observation",
  "createdAt": "2026-11-24T12:00:00.000Z",
  "content": {},
  "version": 1
}
```

Requirements:
- Generate unique IDs.
- Store dates in ISO 8601 format.
- Validate records before use.
- Limit the number and size of saved sessions.
- Do not store secrets or unnecessary personal data.
- Provide deletion controls.
- Handle malformed or outdated records safely.
- Read local storage after the client has mounted, not during server-side rendering.
- Do not store uploaded images by default. Save text results only.

A later cloud-sync release may introduce Supabase Auth and user-owned records. Do not add Supabase unless there is a clear post-MVP need.

## 10. Security, privacy and responsible scientific use

- Keep Gemini API keys server-side only.
- Never prefix private Gemini keys with `NEXT_PUBLIC_`.
- Validate request bodies and uploaded files.
- Enforce file type and size limits.
- Apply rate limiting and request timeouts.
- Avoid logging field notes, images or generated content by default.
- Do not retain uploaded images on the server for the MVP.
- Never execute model output as code or HTML.
- Render generated text safely. If Markdown is supported, disable raw HTML.
- State that image descriptions are preliminary.
- Do not present AI-generated interpretations as verified geological findings.
- Do not collect precise device location automatically.
- Provide local data deletion controls.
- Do not claim academic sources were consulted unless source retrieval is implemented.

## 11. Accessibility and responsive behaviour

Target WCAG 2.2 AA practices where practical.

- Use semantic headings and landmarks.
- Give every input a visible label.
- Support keyboard access and visible focus indicators.
- Maintain sufficient colour contrast.
- Do not communicate errors or quiz correctness by colour alone.
- Announce loading status and quiz feedback to assistive technologies.
- Give icon-only buttons accessible names.
- Use comfortable touch targets.
- Support reduced motion.
- Provide useful alternative text for meaningful images.

Responsive expectations:
- **Mobile:** one-column layouts, full-width forms, compact navigation and easy image selection.
- **Tablet:** balanced layouts with forms and results arranged where space permits.
- **Desktop:** wider workspace with readable content width and optional supporting navigation.
- Avoid horizontal scrolling at common viewport widths.
- Field forms must remain usable on a phone in portrait orientation.

## 12. Quality assurance and acceptance tests

The product is not MVP-ready merely because its pages render. Every core workflow must work end to end.

### General
- [ ] Landing page loads without console errors.
- [ ] All navigation links work.
- [ ] Layout works on mobile, tablet and desktop.
- [ ] Loading, empty, success and error states exist.
- [ ] No primary button is a dead control.
- [ ] Copy actions work.
- [ ] No private API key appears in client bundles or browser responses.

### Geology tutor
- [ ] Empty question is rejected.
- [ ] Valid question returns a structured explanation.
- [ ] Explanation level affects the response.
- [ ] Technical terms are explained where needed.
- [ ] Copy and save work.

### Glossary
- [ ] Starter terms appear without an API request.
- [ ] Search filters starter terms.
- [ ] Unknown terms can be explained through Gemini.
- [ ] Technical and simple definitions are distinguishable.
- [ ] Copy and save work.

### Quiz
- [ ] Requested question count is respected.
- [ ] Every question has four options and one correct answer.
- [ ] Answer key remains hidden before submission.
- [ ] Navigation and progress work.
- [ ] Score is calculated correctly.
- [ ] Review shows selected and correct answers.
- [ ] Retry starts a fresh attempt.

### Field notes
- [ ] Required observation field is enforced.
- [ ] Optional fields can be left empty.
- [ ] User measurements and values are preserved.
- [ ] Missing details are not invented.
- [ ] Observations and interpretations are separated.
- [ ] Generated report can be edited.
- [ ] Copy, save and reset work.

### Image explorer
- [ ] Supported image types are accepted.
- [ ] Unsupported types and oversized files are rejected.
- [ ] Preview, replace and remove work.
- [ ] Image reaches Gemini through the server route.
- [ ] Visible observations are separated from interpretations.
- [ ] Limitations are displayed.
- [ ] Inconclusive results are handled honestly.
- [ ] Image is not retained on the server.

### GIS learning
- [ ] Starter topics are accessible without an API request.
- [ ] Topic explanations work.
- [ ] QGIS guidance is presented as instructions, not claimed execution.
- [ ] No fake map processing results are displayed.

### History and settings
- [ ] Saved sessions persist after refresh.
- [ ] Saved sessions can be reopened.
- [ ] Individual records can be deleted.
- [ ] Clear-all requires confirmation.
- [ ] Invalid local data does not crash the app.

### API and deployment
- [ ] Invalid inputs are rejected server-side.
- [ ] Rate limits are handled.
- [ ] Provider errors do not leak secrets.
- [ ] Structured outputs are validated.
- [ ] Image size and type are validated server-side.
- [ ] Production build succeeds.
- [ ] Vercel deployment succeeds with environment variables configured.

### Release gate

Do not call the MVP complete until all five core workflows work with a real Gemini API key, quiz scoring is correct, field reports preserve user observations, image review communicates uncertainty, local history can be managed, GIS learning has useful starter material, no primary action is a placeholder, and production build and deployment succeed.

## 13. Error states and user feedback

Use concise, specific messages.

| Situation | User-facing message |
|---|---|
| Missing question | “Enter a geology topic or question to continue.” |
| Missing field observations | “Add an outcrop or exposure description before drafting a report.” |
| Missing image | “Choose an image to review.” |
| Unsupported image | “This image format is not supported. Use JPG, PNG or WebP.” |
| Image too large | “The image is too large. Choose an image under 5 MB.” |
| Request running | “Preparing your geology notes…” |
| Rate limit | “You have made several requests. Wait a little and try again.” |
| Network issue | “Connection problem. Check your internet and try again.” |
| AI service unavailable | “The study service is temporarily unavailable. Please try again later.” |
| Inconclusive image | “The image does not provide enough detail for a useful interpretation.” |
| Invalid AI response | “We could not prepare a reliable result. Please try again.” |
| Local save failure | “This session could not be saved on this device.” |

Do not show raw stack traces or provider error messages.

## 14. Vercel deployment

### Repository

Create a dedicated GitHub repository named:

`geo-morrison`

Keep commits focused and never commit secrets.

### Environment variables

Configure these in Vercel Project Settings:

```env
GEMINI_API_KEY=your_server_side_api_key
GEMINI_TEXT_MODEL=your_selected_supported_text_model
GEMINI_VISION_MODEL=your_selected_supported_vision_model
```

If one selected model supports both text and image input, a single `GEMINI_MODEL` variable may be used instead. Verify current model availability and free-tier eligibility before launch.

Add the same values to local `.env.local` for development. Never commit `.env.local`.

### Deployment steps

1. Push the completed project to GitHub.
2. Import the repository into Vercel.
3. Confirm Vercel detects Next.js.
4. Add the required environment variables.
5. Deploy.
6. Test every workflow on the production URL.
7. Review function logs without logging private field notes or image contents.
8. Test on a mobile browser.
9. Confirm image and text requests work in production.

### Production considerations

- Use server-side route handlers for Gemini requests.
- Keep request and response sizes within Vercel function limits.
- Avoid long-running background jobs in the MVP.
- Handle provider timeouts and rate limits.
- Configure environment variables separately for Development, Preview and Production.
- Redeploy after changing production environment variables.
- Confirm selected Gemini models are available to the production API key.

## 15. Google AI Studio build instructions

Use the following instructions when building in Google AI Studio Build Mode.

### Instruction 1: Read before coding

Read this entire TRD before writing code. Summarise the routes, workflows, architecture, design direction, scientific safeguards and MVP acceptance criteria. Identify implementation risks. Do not start by generating a generic AI dashboard.

### Instruction 2: Establish the project

Create a production-oriented Next.js App Router application using TypeScript and Tailwind CSS. Set up the shared layout, routes, navigation, reusable form controls and design tokens. Keep the project structure understandable.

### Instruction 3: Follow the visual direction

Use the “Geological Field Journal” concept in Section 5. The interface should feel like a modern field notebook and specimen catalogue. Use restrained geological colours, editorial hierarchy, subtle layer-inspired structure and clear scientific labels.

Avoid sparkle symbols, decorative star icons, glowing gradients, generic AI illustrations, excessive rounded cards, emoji icons and em dashes. Use Lucide icons only when they improve navigation or comprehension. Do not add decorative maps that imply real spatial data.

### Instruction 4: Implement in stages

Build and verify the shared application shell first. Then implement:
1. Geology tutor.
2. Glossary.
3. Quiz generator and quiz-taking.
4. Field notes and report drafting.
5. Geological image explorer.
6. GIS learning.
7. Local history and settings.

Do not leave primary buttons as visual placeholders. Each feature must have working inputs, validation, loading states, results, copy actions and saving where specified.

### Instruction 5: Preserve scientific integrity

Never allow the field assistant to invent observations or measurements. Separate user-provided observations from possible interpretations. The image explorer must describe visible evidence before offering tentative interpretations and must state when an image is inconclusive.

Do not label an image result as a confirmed rock, mineral, fossil or formation identification. This MVP does not have the evidence needed to make such a guarantee.

### Instruction 6: Integrate Gemini safely

Use the official Google Gen AI SDK supported by the current environment. Make requests only through server-side Next.js Route Handlers. Read credentials from environment variables. Validate requests and structured responses. Never expose secrets to client code.

### Instruction 7: Make the MVP resilient

Implement empty, loading, error and retry states. Handle provider rate limits, timeouts, malformed model output, unsupported images and unavailable local storage. Keep prompts and outputs bounded to reduce unnecessary token usage.

### Instruction 8: Verify before finishing

Run available lint, type-check and production build commands. Fix errors rather than hiding them. Test all workflows and responsive layouts. Report honestly what was tested and what still requires a real API key or production environment.

### Instruction 9: Prepare for Vercel

Provide a complete README with local setup, environment variables, development commands and deployment instructions. Include `.env.example` with variable names only. Confirm the application can be deployed as a standard Next.js project on Vercel.

**Important:** Implement in small, verifiable stages. Do not remove working features while adding new ones. If a requirement cannot be completed, explain the limitation instead of silently replacing it with a mock.

## 16. Definition of done

GEO-MORRISON is ready for its first public MVP release when a new visitor can:

1. Open the landing page and understand the product.
2. Use the geology tutor to understand a topic.
3. Search starter glossary terms and request explanations for additional terms.
4. Generate and complete a geology quiz with accurate scoring.
5. Enter real field observations and produce an editable report without invented details.
6. Upload a supported image and receive a cautious description of visible geological features.
7. Learn introductory GIS and QGIS concepts.
8. Copy useful results.
9. Save, reopen and delete local study sessions.
10. Use the application comfortably on a mobile device.
11. Complete workflows on the deployed Vercel application without exposing the Gemini API key.

**Release standard:** GEO-MORRISON should be a dependable geology learning and fieldwork companion. A small set of accurate, complete tools is better than a large interface that makes unsupported scientific claims.
