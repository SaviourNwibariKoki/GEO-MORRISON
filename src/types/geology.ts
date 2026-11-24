export type ToolType = 'tutor' | 'glossary' | 'quiz' | 'field-notes' | 'image-explorer' | 'gis-learning';

export interface SavedSession {
  id: string;
  tool: ToolType;
  title: string;
  createdAt: string;
  content: any;
  version: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'General Geology' | 'Mineralogy' | 'Petrology' | 'Sedimentology' | 'Structural Geology' | 'Stratigraphy' | 'Hydrology' | 'Geomorphology' | 'GIS';
  technicalDefinition: string;
  simpleExplanation: string;
  example: string;
  relatedTerms: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizResult {
  title: string;
  questions: QuizQuestion[];
}

export interface FieldObservation {
  stationName: string;
  dateTime: string;
  coordinates: string;
  elevation: string;
  exposureDescription: string;
  lithology: string;
  color: string;
  grainSizeAndTexture: string;
  structuresObserved: string;
  beddingDipStrike: string;
  relationshipsContacts: string;
  weatherConditions: string;
  additionalNotes: string;
  reportStyle: 'Field notebook' | 'Structured field report' | 'Observation summary';
}

export interface FieldReportResult {
  title: string;
  sections: Array<{ heading: string; content: string }>;
  missingInformation: string[];
}

export interface ImageReviewResult {
  visibleObservations: string[];
  possibleInterpretations: Array<{
    interpretation: string;
    reason: string;
    caution: string;
  }>;
  limitations: string[];
  recommendedFollowUp: string[];
}
