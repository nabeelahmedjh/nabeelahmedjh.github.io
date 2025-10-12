import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-work',
  imports: [],
  templateUrl: './featured-work.html',
  styleUrl: './featured-work.scss'
})
export class FeaturedWork {
  featuredItems = [
    {
      title: 'Project Alpha',
      description: 'A cutting-edge project that revolutionizes technology.',
      imageUrl: 'https://themeforest.net/search/dummy?srsltid=AfmBOoqoq-qB_X7BcbgFEYolvTtS4sKsAcap-yXI883dCCGAqK0Q8OhS'
    },
    {
      title: 'Project Beta',
      description: 'An innovative solution for modern problems.',
      imageUrl: 'https://themeforest.net/search/dummy?srsltid=AfmBOoqoq-qB_X7BcbgFEYolvTtS4sKsAcap-yXI883dCCGAqK0Q8OhS'
    },
    {
      title: 'Project Gamma',
      description: 'A groundbreaking approach to software development.',
      imageUrl: 'https://themeforest.net/search/dummy?srsltid=AfmBOoqoq-qB_X7BcbgFEYolvTtS4sKsAcap-yXI883dCCGAqK0Q8OhS'
    }
  ];
}
