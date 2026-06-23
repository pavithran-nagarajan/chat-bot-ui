import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/chat/pages/chat-page/chat-page').then(m => m.ChatPageComponent),
  },
  { path: '**', redirectTo: '' },
];
