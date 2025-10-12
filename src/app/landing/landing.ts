import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';
import { FeaturedWork } from '../featured-work/featured-work';
import { Projects } from '../projects/projects';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, Navbar, FeaturedWork, Projects],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {
  private readonly cfg = inject(ConfigService);
  readonly showProjects = this.cfg.getFeature('projects');
  readonly showFeatured = this.cfg.getFeature('featuredProjects');
}
