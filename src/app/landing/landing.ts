import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLinkedin, faGithub, faAngular, faNodeJs, faJs, faPython, faDocker, faGitAlt, faNpm } from '@fortawesome/free-brands-svg-icons';
import { Navbar } from '../navbar/navbar';
import { Projects } from '../projects/projects';
import { ConfigService } from '../config.service';

interface TechDrop {
  icon: IconDefinition;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

@Component({
  selector: 'app-landing',
  imports: [CommonModule, FontAwesomeModule, Navbar, Projects],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {
  private readonly cfg = inject(ConfigService);
  readonly showProjects = this.cfg.getFeature('projects');
  isHomeSection = true;
  
  // Font Awesome icons
  readonly faLinkedin = faLinkedin;
  readonly faGithub = faGithub;
  readonly techDrops: TechDrop[] = [
    { icon: faAngular, left: 8, delay: -4.8, duration: 12, size: 2.1 },
    { icon: faNodeJs, left: 28, delay: -1.6, duration: 10.5, size: 1.9 },
    { icon: faJs, left: 44, delay: -8.1, duration: 11.2, size: 1.8 },
    { icon: faPython, left: 63, delay: -6.4, duration: 12.7, size: 2.05 },
    { icon: faDocker, left: 79, delay: -2.5, duration: 9.9, size: 2.2 },
    { icon: faGitAlt, left: 17, delay: -7.2, duration: 10.8, size: 1.7 },
    { icon: faNpm, left: 53, delay: -3.4, duration: 12.1, size: 1.7 },
    { icon: faGithub, left: 72, delay: -5.6, duration: 11.4, size: 1.8 },
  ];

  constructor() {
    this.syncHomeFromHash();
  }

  @HostListener('window:hashchange')
  onHashChange() {
    this.syncHomeFromHash();
  }

  private syncHomeFromHash() {
    const hash = window.location.hash;
    this.isHomeSection = hash === '' || hash === '#' || hash === '#home-section';
  }
}
