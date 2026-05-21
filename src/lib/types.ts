export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface GeneratedFile {
  path: string;
  content: string;
  language: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'archived' | 'building';
  template?: string;
  files: number;
  tech: string[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tech: string[];
  icon: string;
  preview: string;
}

export interface TerminalLine {
  id: string;
  text: string;
  type: 'info' | 'success' | 'error' | 'warning' | 'command';
  timestamp: number;
}
