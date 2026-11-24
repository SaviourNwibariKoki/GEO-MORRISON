import { SavedSession, ToolType } from '../types/geology';

const HISTORY_KEY = 'geo-morrison:history:v1';

export function getSavedSessions(): SavedSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to load history:', err);
    return [];
  }
}

export function saveSession(tool: ToolType, title: string, content: any): SavedSession {
  const sessions = getSavedSessions();
  const newSession: SavedSession = {
    id: `session-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    tool,
    title: title || `${tool.toUpperCase()} Session`,
    createdAt: new Date().toISOString(),
    content,
    version: 1,
  };

  const updated = [newSession, ...sessions].slice(0, 50); // limit to 50
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save session:', err);
  }
  return newSession;
}

export function deleteSession(id: string): SavedSession[] {
  const sessions = getSavedSessions();
  const updated = sessions.filter((s) => s.id !== id);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete session:', err);
  }
  return updated;
}

export function clearAllSessions(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (err) {
    console.error('Failed to clear history:', err);
  }
}
