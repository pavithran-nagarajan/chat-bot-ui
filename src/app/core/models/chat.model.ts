export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;          // used as session_id in API
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
}

export interface ChatRequest {
  session_id: string;
  message: string;
}

export interface ChatResponse {
  Message: string;   // non-empty means an error occurred
  reply: string;     // the AI response text
}
