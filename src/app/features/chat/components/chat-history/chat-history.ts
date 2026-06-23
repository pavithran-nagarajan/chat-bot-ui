import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChatSession } from '../../../../core/models/chat.model';

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [DatePipe],
  template: `
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">Chats</h2>
        <button class="new-chat-btn" (click)="newChat.emit()" title="New chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      <ul class="session-list">
        @for (session of sessions(); track session.id) {
          <li
            class="session-item"
            [class.active]="session.id === activeId()"
            (click)="selectSession.emit(session.id)"
          >
            <div class="session-info">
              <span class="session-title">{{ session.title }}</span>
              <span class="session-date">{{ session.createdAt | date: 'MMM d' }}</span>
            </div>
            <button
              class="delete-btn"
              (click)="$event.stopPropagation(); deleteSession.emit(session.id)"
              title="Delete"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6l-1 14H6L5 6"></path>
                <path d="M10 11v6"></path><path d="M14 11v6"></path>
                <path d="M9 6V4h6v2"></path>
              </svg>
            </button>
          </li>
        } @empty {
          <li class="empty-state">No chats yet</li>
        }
      </ul>
    </aside>
  `,
  styleUrl: './chat-history.scss',
})
export class ChatHistoryComponent {
  sessions = input.required<ChatSession[]>();
  activeId = input<string | null>(null);
  newChat = output<void>();
  selectSession = output<string>();
  deleteSession = output<string>();
}
