import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  private readonly cfg = inject(ConfigService);
  isMobileMenuOpen = false;
  currentSection: '#home-section' | '#projects-section' | '#experience-section' = '#home-section';

  // Feature flags from runtime config
  readonly showProjects = this.cfg.getFeature('projects');
  readonly showBlog = this.cfg.getFeature('blog');
  readonly showMedia = this.cfg.getFeature('media');
  
  // Font Awesome icons
  readonly faBars = faBars;
  readonly faTimes = faTimes;

  constructor() {
    this.syncCurrentSection();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  navigateToSection(event: Event, hash: '#home-section' | '#projects-section' | '#experience-section') {
    event.preventDefault();
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
    this.closeMobileMenu();
    this.syncCurrentSection();
  }

  @HostListener('window:hashchange')
  onHashChange() {
    this.syncCurrentSection();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  private syncCurrentSection() {
    const hash = window.location.hash;
    if (hash === '#projects-section' || hash === '#experience-section') {
      this.currentSection = hash;
      return;
    }
    this.currentSection = '#home-section';
  }
}
