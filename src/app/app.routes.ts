import { Routes } from '@angular/router';
import { Landing } from './landing/landing';

export const routes: Routes = [
  {
    path: 'leadership/coding-competition-2nd-place',
    component: Landing,
    data: { detailSlug: 'coding-competition-2nd-place' },
    title: '2nd Place in Coding Competition | Nabeel Ahmed Jhatial',
  },
  { path: '', pathMatch: 'full', component: Landing, title: "Nabeel's Experience" },
  { path: '**', redirectTo: '' },
];
