import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChatMessage } from '../../../../core/models/chat.model';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="bubble-wrapper" [class.user]="message().role === 'user'">
      <div class="avatar">
        @if (message().role === 'assistant') {
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <path fill="white" d="M8 12h8M12 8v8"/>
          </svg>
        } @else {
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        }
      </div>
      <div class="bubble">
        <p class="content">{{ message().content }}</p>
        <span class="timestamp">{{ message().timestamp | date: 'h:mm a' }}</span>
      </div>
    </div>
  `,
  styleUrl: './message-bubble.scss',
})
export class MessageBubbleComponent {
  message = input.required<ChatMessage>();
}
