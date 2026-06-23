import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="input-area">
      <div class="input-row">
        <textarea
          class="message-input"
          placeholder="Type a message…"
          [(ngModel)]="text"
          [disabled]="loading()"
          rows="1"
          (keydown.enter)="onEnter($event)"
          (input)="autoResize($event)"
        ></textarea>

        <button
          class="send-btn"
          [disabled]="!text.trim() || loading()"
          (click)="submit()"
          title="Send"
        >
          @if (loading()) {
            <span class="spinner"></span>
          } @else {
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          }
        </button>
      </div>
    </div>
  `,
  styleUrl: './chat-input.scss',
})
export class ChatInputComponent {
  loading = input(false);
  send = output<string>();

  text = '';

  submit(): void {
    const trimmed = this.text.trim();
    if (!trimmed || this.loading()) return;
    this.send.emit(trimmed);
    this.text = '';
  }

  onEnter(event: Event): void {
    const ke = event as KeyboardEvent;
    if (!ke.shiftKey) {
      ke.preventDefault();
      this.submit();
    }
  }

  autoResize(event: Event): void {
    const el = event.target as HTMLTextAreaElement;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }
}
