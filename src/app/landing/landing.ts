import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLinkedin, faGithub, faAngular, faNodeJs, faJs, faPython, faDocker, faGitAlt, faNpm } from '@fortawesome/free-brands-svg-icons';
import { Navbar } from '../navbar/navbar';
import { Projects } from '../projects/projects';
import { Volunteering } from '../volunteering/volunteering';
import { Recommendations } from '../recommendations/recommendations';
import { ConfigService } from '../config.service';

interface TechDrop {
  icon: IconDefinition;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

interface CompanyLogo {
  name: string;
  icon?: IconDefinition;
  imageUrl?: string;
  /** Show the name label under an image logo (for mark-only logos). */
  showName?: boolean;
}

interface Achievement {
  title: string;
  description: string;
}

@Component({
  selector: 'app-landing',
  imports: [CommonModule, FontAwesomeModule, Navbar, Projects, Volunteering, Recommendations],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {
  private readonly cfg = inject(ConfigService);
  readonly showProjects = this.cfg.getFeature('projects');
  readonly showVolunteering = this.cfg.getFeature('volunteering');
  readonly showRecommendations = this.cfg.getFeature('recommendations');
  isHomeSection = true;
  isVolunteeringSection = false;
  readonly year = new Date().getFullYear();
  
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

  // Companies worked with (logos) plus organizations volunteered for (brand icons)
  readonly companies: CompanyLogo[] = [
    { name: 'ExpertFlow', imageUrl: 'images/companies/expertflow-logo.png' },
    { name: 'ColdSend', imageUrl: 'images/companies/coldsend-logo.svg', showName: true },
    { name: 'Google', imageUrl: 'images/companies/google-logo.svg', showName: true },
    { name: 'Microsoft', imageUrl: 'images/companies/microsoft-logo.svg', showName: true },
  ];

  readonly achievements: Achievement[] = [
    { title: 'Led Angular Modernization', description: 'Drove the migration of a large client suite from Angular v8 to v14, improving maintainability and developer experience.' },
    { title: 'Shipped GraphQL Gateway', description: 'Designed and delivered a centralized GraphQL gateway that unified search across internal and external data sources.' },
    { title: 'Faster CI/CD Pipelines', description: 'Reduced CI/CD pipeline completion time, enabling quicker and more reliable releases across the team.' },
    { title: 'Production Platform Launch', description: 'Built and launched Yurt, a full-stack collaborative learning platform with real-time features and an AI assistant.' },
    { title: 'Quality Champion', description: 'Introduced TDD/BDD practices that raised test coverage and release confidence across projects.' },
    { title: 'Consistent Delivery', description: 'Recognized for reliably shipping features with clean architecture and user-first thinking.' },
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
    this.isVolunteeringSection = hash === '#volunteering-section';
  }
}
