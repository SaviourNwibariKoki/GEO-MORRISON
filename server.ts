import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize Google Gen AI SDK
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const TEXT_MODEL = 'gemini-4-hydrogen';

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '15mb' }));

  const PORT = process.env.PORT || 3000;

  // API Routes
  
  // 1. Geology Tutor
  app.post('/api/geo/tutor', async (req, res) => {
    try {
      const { question, subject, level, format } = req.body;
      if (!question || typeof question !== 'string') {
        return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Enter a geology topic or question to continue.' } });
      }

      const systemInstruction = `You are GEO-MORRISON, a patient, expert academic geology learning and fieldwork companion. 
Explain geological concepts in clear, structured academic language tailored to the requested explanation level (${level || 'Undergraduate'}) and format (${format || 'Concept explanation'}).
When first introducing technical terms, define them clearly. Include geology-related examples where useful. Explain processes, conditions, and observable evidence. 
Do not invent references, page numbers, or claims that a source was consulted. Separate direct observations from interpretations.
Return JSON with the following structure:
{
  "title": "Clear concise title",
  "introduction": "Short opening overview paragraph",
  "sections": [
    { "heading": "Section Heading", "content": "Detailed paragraphs with bullet points where appropriate" }
  ],
  "recap": "A concise bulleted recap summarizing key takeaway points for revision."
}`;

      const response = await ai.models.generateContent({
        model: TEXT_MODEL,
        contents: `Subject: ${subject || 'General Geology'}\nLevel: ${level || 'Undergraduate'}\nFormat: ${format || 'Concept explanation'}\nQuestion/Topic: ${question}`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              introduction: { type: Type.STRING },
              sections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    heading: { type: Type.STRING },
                    content: { type: Type.STRING },
                  },
                },
              },
              recap: { type: Type.STRING },
            },
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ success: true, data: parsed, error: null });
    } catch (err: any) {
      console.error('Tutor API error:', err);
      return res.status(500).json({ success: false, error: { code: 'AI_ERROR', message: err.message || 'The study service is temporarily unavailable.' } });
    }
  });

  // 2. Glossary Explainer for unknown terms
  app.post('/api/geo/glossary', async (req, res) => {
    try {
      const { term } = req.body;
      if (!term || typeof term !== 'string') {
        return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Enter a geological term.' } });
      }

      const systemInstruction = `You are GEO-MORRISON geological glossary assistant. Provide a precise geological definition for the requested term.
Return JSON with:
{
  "term": "Term name",
  "category": "Mineralogy / Petrology / Structural Geology / Sedimentology / Stratigraphy / Hydrology / Geomorphology / GIS / General Geology",
  "technicalDefinition": "Rigorous scientific definition",
  "simpleExplanation": "Clear, accessible explanation for students",
  "example": "Real geological context or field occurrence example",
  "relatedTerms": ["term1", "term2"]
}`;

      const response = await ai.models.generateContent({
        model: TEXT_MODEL,
        contents: `Explain geological term: ${term}`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              term: { type: Type.STRING },
              category: { type: Type.STRING },
              technicalDefinition: { type: Type.STRING },
              simpleExplanation: { type: Type.STRING },
              example: { type: Type.STRING },
              relatedTerms: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ success: true, data: parsed, error: null });
    } catch (err: any) {
      console.error('Glossary API error:', err);
      return res.status(500).json({ success: false, error: { code: 'AI_ERROR', message: err.message || 'Could not retrieve glossary definition.' } });
    }
  });

  // 3. Quiz Generator
  app.post('/api/geo/quiz', async (req, res) => {
    try {
      const { topic, notes, count, difficulty } = req.body;
      const numQuestions = parseInt(count) || 5;
      const diff = difficulty || 'Moderate';

      if (!topic && !notes) {
        return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Provide a topic or study notes to generate a quiz.' } });
      }

      const systemInstruction = `You are GEO-MORRISON geology quiz generator. Create exactly ${numQuestions} multiple-choice questions for difficulty level "${diff}".
Topic / Notes: ${topic || ''} ${notes || ''}

Requirements:
- Exactly 4 options per question.
- Exactly one correct answer (correctIndex from 0 to 3).
- Provide a clear scientific explanation for why the answer is correct.
- Return JSON matching the schema.`;

      const response = await ai.models.generateContent({
        model: TEXT_MODEL,
        contents: `Generate ${numQuestions} geology revision quiz questions on topic: "${topic || 'General Geology'}" with notes: "${notes || 'None'}". Difficulty: ${diff}`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctIndex: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                  },
                },
              },
            },
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ success: true, data: parsed, error: null });
    } catch (err: any) {
      console.error('Quiz API error:', err);
      return res.status(500).json({ success: false, error: { code: 'AI_ERROR', message: err.message || 'Could not generate quiz.' } });
    }
  });

  // 4. Field Notes Report Assistant
  app.post('/api/geo/field-report', async (req, res) => {
    try {
      const observationData = req.body;
      if (!observationData || !observationData.exposureDescription) {
        return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Add an outcrop or exposure description before drafting a report.' } });
      }

      const systemInstruction = `You are GEO-MORRISON field report assistant. Turn user-entered field observations into an editable professional field report draft.
CRITICAL SCIENTIFIC SAFEGUARDS:
- Never fabricate observations, measurements, or location data.
- Preserve original measurements, names, units, and descriptions provided by the user.
- Mark missing information honestly.
- Strictly separate "Observed" factual information from "Possible interpretation" (which must be marked provisional with required supporting evidence).

Return JSON matching the schema:
{
  "title": "Field Observation Report Draft",
  "sections": [
    { "heading": "Station & Location Details", "content": "..." },
    { "heading": "Exposure Description", "content": "..." },
    { "heading": "Lithology & Physical Characteristics", "content": "..." },
    { "heading": "Structures & Measurements", "content": "..." },
    { "heading": "Field Relationships & Contacts", "content": "..." },
    { "heading": "Provisional Interpretation", "content": "..." }
  ],
  "missingInformation": ["List of unrecorded standard field parameters, e.g. dip direction not measured"]
}`;

      const response = await ai.models.generateContent({
        model: TEXT_MODEL,
        contents: `Field observation data:\n${JSON.stringify(observationData, null, 2)}`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              sections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    heading: { type: Type.STRING },
                    content: { type: Type.STRING },
                  },
                },
              },
              missingInformation: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ success: true, data: parsed, error: null });
    } catch (err: any) {
      console.error('Field Report API error:', err);
      return res.status(500).json({ success: false, error: { code: 'AI_ERROR', message: err.message || 'Could not draft field report.' } });
    }
  });

  // 5. Geological Image Review
  app.post('/api/geo/image-review', async (req, res) => {
    try {
      const { image, mimeType, context, userQuestion } = req.body;
      if (!image || !mimeType) {
        return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Choose a valid image to review.' } });
      }

      const imagePart = {
        inlineData: {
          mimeType,
          data: image,
        },
      };

      const promptText = `Analyze this geological image (context: ${context || 'Uncertain specimen or outcrop'}, user question: ${userQuestion || 'Provide a preliminary visual review'}).
CRITICAL SCIENTIFIC GUIDELINES:
- Describe visible evidence (texture, color, grain, shape, structures) neutrally before offering interpretations.
- Do not assert definitive mineral, rock, fossil, or formation identifications from an ordinary photograph.
- Separate observable facts from tentative interpretations.
- Clearly state limitations (e.g. scale, lighting, image resolution).
- Suggest follow-up tests or observations.
Return JSON matching the schema.`;

      const response = await ai.models.generateContent({
        model: TEXT_MODEL,
        contents: { parts: [imagePart, { text: promptText }] },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              visibleObservations: { type: Type.ARRAY, items: { type: Type.STRING } },
              possibleInterpretations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    interpretation: { type: Type.STRING },
                    reason: { type: Type.STRING },
                    caution: { type: Type.STRING },
                  },
                },
              },
              limitations: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendedFollowUp: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ success: true, data: parsed, error: null });
    } catch (err: any) {
      console.error('Image Review API error:', err);
      return res.status(500).json({ success: false, error: { code: 'AI_ERROR', message: err.message || 'Could not analyze geological image.' } });
    }
  });

  // 6. GIS Learning Assistant
  app.post('/api/geo/gis-learning', async (req, res) => {
    try {
      const { topic } = req.body;
      if (!topic) {
        return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Specify a GIS topic.' } });
      }

      const systemInstruction = `You are GEO-MORRISON GIS and QGIS learning tutor. Explain introductory GIS concepts in clear, practical language for geology students.
Include what the concept means, why it matters in geoscience, and a step-by-step beginner guide or QGIS workflow.
Return JSON:
{
  "topic": "...",
  "definition": "...",
  "geoscienceRelevance": "...",
  "workflowSteps": ["step 1", "step 2"],
  "commonPitfalls": ["pitfall 1"]
}`;

      const response = await ai.models.generateContent({
        model: TEXT_MODEL,
        contents: `Explain GIS topic for geologists: ${topic}`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              topic: { type: Type.STRING },
              definition: { type: Type.STRING },
              geoscienceRelevance: { type: Type.STRING },
              workflowSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
              commonPitfalls: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ success: true, data: parsed, error: null });
    } catch (err: any) {
      console.error('GIS Learning API error:', err);
      return res.status(500).json({ success: false, error: { code: 'AI_ERROR', message: err.message || 'Could not load GIS learning explanation.' } });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`GEO-MORRISON server running on port ${PORT}`);
  });
}

startServer();
