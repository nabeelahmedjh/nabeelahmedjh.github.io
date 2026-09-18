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
  /** Internal section anchor (e.g. '#volunteering-section') to switch to on click. */
  section?: string;
  /** External URL to open in a new tab on click. */
  url?: string;
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
    { title: 'Lead, Google Developer Student Club & Microsoft Learn Student Ambassador', description: 'Organized tech conferences, workshops, and hackathons; conducted sessions on Python, OOP, DSA, and Git to empower students with industry-ready skills.', section: '#volunteering-section' },
    { title: 'Campus Gold Medalist', description: 'Achieved the highest CGPA in the undergraduate batch (3.82/4.00), earning the Campus Gold Medal and Institute Silver Medal.', url: 'https://drive.google.com/file/d/1IeTjssKrj_DZmVJW_jp6sWXVXQUW61Dv/view?usp=sharing' },
    { title: '2 Years of Professional Experience,', description: 'Worked with international, product-based firms.', section: '#experience-section' },
    { title: 'Speed Programming Award', description: '2nd place in CUI’s University-level speed programming competition.', url: 'https://drive.google.com/file/d/1SvU53yKcriG_1rBO39r5ckUXSDDwBbX9/view?usp=sharing' },
  ];

  constructor() {
    this.syncHomeFromHash();
  }

  @HostListener('window:hashchange')
  onHashChange() {
    this.syncHomeFromHash();
  }

  goToSection(event: Event, section: string) {
    event.preventDefault();
    if (window.location.hash !== section) {
      window.location.hash = section;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  private syncHomeFromHash() {
    const hash = window.location.hash;
    this.isHomeSection = hash === '' || hash === '#' || hash === '#home-section';
    this.isVolunteeringSection = hash === '#volunteering-section';
  }
}
