import { Component, inject } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-featured-work',
  imports: [],
  templateUrl: './featured-work.html',
  styleUrl: './featured-work.scss'
})
export class FeaturedWork {
  private readonly cfg = inject(ConfigService);
  readonly featuredItems = this.cfg.value.featuredWorkItems;
}
