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

  // Feature flags from runtime config
  readonly showProjects = this.cfg.getFeature('projects');
  readonly showBlog = this.cfg.getFeature('blog');
  readonly showMedia = this.cfg.getFeature('media');
  
  // Font Awesome icons
  readonly faBars = faBars;
  readonly faTimes = faTimes;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}
