import { Component, HostListener, inject } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  private readonly cfg = inject(ConfigService);
  activeSection: 'projects' | 'experience' = 'projects';
  readonly projectHighlights = this.cfg.value.projectHighlights;
  readonly experienceHighlights = this.cfg.value.experienceHighlights;

  constructor() {
    this.syncSectionFromHash();
  }

  @HostListener('window:hashchange')
  onHashChange() {
    this.syncSectionFromHash();
  }

  private syncSectionFromHash() {
    this.activeSection = window.location.hash === '#experience-section' ? 'experience' : 'projects';
  }

  openCardLink(url?: string) {
    if (!url) {
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
