import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ChatMessage, ChatRequest, ChatResponse, ChatSession } from '../models/chat.model';

const API_URL = '/api/chat';

@Injectable({ providedIn: 'root' })
export class ChatService {
  sessions = signal<ChatSession[]>([]);
  activeSessionId = signal<string | null>(null);
  isLoading = signal(false);

  constructor(private http: HttpClient) {
    this.loadSessionsFromStorage();
  }

  get activeSession(): ChatSession | null {
    return this.sessions().find(s => s.id === this.activeSessionId()) ?? null;
  }

  createSession(): ChatSession {
    const session: ChatSession = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
    };
    this.sessions.update(s => [session, ...s]);
    this.activeSessionId.set(session.id);
    this.persistSessions();
    return session;
  }

  selectSession(id: string): void {
    this.activeSessionId.set(id);
  }

  deleteSession(id: string): void {
    this.sessions.update(s => s.filter(sess => sess.id !== id));
    if (this.activeSessionId() === id) {
      this.activeSessionId.set(this.sessions()[0]?.id ?? null);
    }
    this.persistSessions();
  }

  sendMessage(content: string): Observable<ChatMessage> {
    let session = this.activeSession;
    if (!session) {
      session = this.createSession();
    }

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    this.appendMessage(session.id, userMsg);
    this.updateSessionTitle(session.id);

    const body: ChatRequest = {
      session_id: session.id,
      message: content,
    };

    this.isLoading.set(true);

    return this.http.post<ChatResponse>(API_URL, body).pipe(
      map(res => {
        if (res.Message && res.Message.trim().length > 0) {
          throw new Error(res.Message);
        }
        const aiMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: res.reply,
          timestamp: new Date(),
        };
        this.appendMessage(session!.id, aiMsg);
        this.persistSessions();
        this.isLoading.set(false);
        return aiMsg;
      }),
      catchError(err => {
        this.isLoading.set(false);
        return throwError(() => err);
      })
    );
  }

  private appendMessage(sessionId: string, msg: ChatMessage): void {
    this.sessions.update(sessions =>
      sessions.map(s =>
        s.id === sessionId ? { ...s, messages: [...s.messages, msg] } : s
      )
    );
  }

  private updateSessionTitle(sessionId: string): void {
    const session = this.sessions().find(s => s.id === sessionId);
    if (!session || session.messages.length !== 1) return;
    const title = session.messages[0].content.slice(0, 40);
    this.sessions.update(sessions =>
      sessions.map(s => (s.id === sessionId ? { ...s, title } : s))
    );
  }

  private persistSessions(): void {
    try {
      localStorage.setItem('chat_sessions', JSON.stringify(this.sessions()));
    } catch {}
  }

  private loadSessionsFromStorage(): void {
    try {
      const raw = localStorage.getItem('chat_sessions');
      if (!raw) return;
      const parsed: ChatSession[] = JSON.parse(raw).map((s: ChatSession) => ({
        ...s,
        createdAt: new Date(s.createdAt),
        messages: s.messages.map((m: ChatMessage) => ({ ...m, timestamp: new Date(m.timestamp) })),
      }));
      this.sessions.set(parsed);
      this.activeSessionId.set(parsed[0]?.id ?? null);
    } catch {}
  }
}
