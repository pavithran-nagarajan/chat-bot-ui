import { Component, inject, ViewChild, ElementRef, AfterViewChecked, signal } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { ChatService } from '../../../../core/services/chat.service';
import { ChatHistoryComponent } from '../../components/chat-history/chat-history';
import { ChatInputComponent } from '../../components/chat-input/chat-input';
import { MessageBubbleComponent } from '../../components/message-bubble/message-bubble';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [ChatHistoryComponent, ChatInputComponent, MessageBubbleComponent, SlicePipe],
  template: `
    <div class="chat-layout">
      <app-chat-history
        [sessions]="chatService.sessions()"
        [activeId]="chatService.activeSessionId()"
        (newChat)="chatService.createSession()"
        (selectSession)="chatService.selectSession($event)"
        (deleteSession)="chatService.deleteSession($event)"
      />

      <main class="chat-main">
        <header class="chat-header">
          <h1 class="app-title">AI Chat</h1>
          @if (chatService.activeSession) {
            <span class="session-badge">Session: {{ chatService.activeSession.id | slice:0:8 }}…</span>
          }
        </header>

        <div class="messages-container" #messagesContainer>
          @if (!chatService.activeSession || chatService.activeSession.messages.length === 0) {
            <div class="welcome">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12h8M12 8v8"/>
              </svg>
              <h2>How can I help you today?</h2>
              <p>Type a message below to start the conversation.</p>
            </div>
          }

          @for (msg of chatService.activeSession?.messages ?? []; track msg.id) {
            <app-message-bubble [message]="msg" />
          }

          @if (chatService.isLoading()) {
            <div class="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          }

          @if (errorMessage()) {
            <div class="error-banner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {{ errorMessage() }}
              <button class="error-close" (click)="errorMessage.set(null)">✕</button>
            </div>
          }
        </div>

        <app-chat-input
          [loading]="chatService.isLoading()"
          (send)="onSend($event)"
        />
      </main>
    </div>
  `,
  styleUrl: './chat-page.scss',
})
export class ChatPageComponent implements AfterViewChecked {
  chatService = inject(ChatService);

  @ViewChild('messagesContainer') private messagesEl!: ElementRef<HTMLDivElement>;

  private shouldScroll = false;
  errorMessage = signal<string | null>(null);

  onSend(text: string): void {
    this.shouldScroll = true;
    this.errorMessage.set(null);
    this.chatService.sendMessage(text).subscribe({
      next: () => { this.shouldScroll = true; },
      error: (err: Error) => {
        this.errorMessage.set(err.message || 'Something went wrong. Please try again.');
        this.shouldScroll = true;
      },
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private scrollToBottom(): void {
    const el = this.messagesEl?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
