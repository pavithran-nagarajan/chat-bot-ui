import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface AiModel { id: string; name: string; description: string; }

@Component({
  selector: 'app-model-selector',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="model-selector">
      <label for="model-select" class="label">Model</label>
      <select
        id="model-select"
        class="select"
        [ngModel]="selectedModel()"
        (ngModelChange)="modelChange.emit($event)"
      >
        @for (model of models(); track model.id) {
          <option [value]="model.id">{{ model.name }}</option>
        }
      </select>
    </div>
  `,
  styleUrl: './model-selector.scss',
})
export class ModelSelectorComponent {
  models = input.required<AiModel[]>();
  selectedModel = input.required<string>();
  modelChange = output<string>();
}
