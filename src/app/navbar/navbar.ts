import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { ConfigService } from '../config.service';

export interface HireLink {
  label: string;
  url: string;
  icon: typeof faFileLines;
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  private readonly cfg = inject(ConfigService);
  isMobileMenuOpen = false;
  isHireDialogOpen = false;
  currentSection: '#home-section' | '#projects-section' | '#experience-section' | '#volunteering-section' = '#home-section';

  // Feature flags from runtime config
  readonly showProjects = this.cfg.getFeature('projects');
  readonly showBlog = this.cfg.getFeature('blog');
  readonly showMedia = this.cfg.getFeature('media');
  readonly showVolunteering = this.cfg.getFeature('volunteering');
  
  // Font Awesome icons
  readonly faBars = faBars;
  readonly faTimes = faTimes;

  // TODO: Replace the resume placeholder with the actual Google Drive PDF link.
  private static readonly RESUME_URL = 'https://drive.google.com/REPLACE_WITH_RESUME_LINK';
  private static readonly TRANSCRIPT_URL = 'https://drive.google.com/file/d/12VRUY_3WdlqQVOyXrQXtd6o8eDSpLXZE/view?usp=sharing';

  // Items shown in the "Hire me" dialog, in display order.
  readonly hireLinks: HireLink[] = [
    { label: 'Resume', url: Navbar.RESUME_URL, icon: faFileLines },
    { label: 'Transcript', url: Navbar.TRANSCRIPT_URL, icon: faFileLines },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/nabeelahmedjh/', icon: faLinkedin },
    { label: 'GitHub', url: 'https://github.com/nabeelahmedjh', icon: faGithub },
  ];

  constructor() {
    this.syncCurrentSection();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  openHireDialog(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.isMobileMenuOpen = false;
    this.isHireDialogOpen = true;
  }

  closeHireDialog() {
    this.isHireDialogOpen = false;
  }

  navigateToSection(event: Event, hash: '#home-section' | '#projects-section' | '#experience-section' | '#volunteering-section') {
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
    if (this.isHireDialogOpen) {
      this.closeHireDialog();
    }
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  private syncCurrentSection() {
    const hash = window.location.hash;
    if (hash === '#projects-section' || hash === '#experience-section' || hash === '#volunteering-section') {
      this.currentSection = hash;
      return;
    }
    this.currentSection = '#home-section';
  }
}
