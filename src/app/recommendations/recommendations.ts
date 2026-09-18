import { Component, HostBinding, Input, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { ConfigService, RecommendationItem } from '../config.service';

/** A recommendation prepared for rendering (text split into paragraphs). */
interface RecommendationSlide extends RecommendationItem {
  paragraphs: string[];
  initials: string;
}

@Component({
  selector: 'app-recommendations',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './recommendations.html',
  styleUrl: './recommendations.scss'
})
export class Recommendations implements OnDestroy {
  private readonly cfg = inject(ConfigService);

  /** 'hero' = compact dark panel for the hero; 'wide' = full-width light section. */
  @Input() layout: 'hero' | 'wide' = 'hero';

  @HostBinding('class.rec-wide')
  get isWide(): boolean {
    return this.layout === 'wide';
  }

  readonly slides: RecommendationSlide[] = this.cfg.value.recommendationItems.map((item) => ({
    ...item,
    paragraphs: (item.text ?? '')
      .split(/\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0),
    initials: this.toInitials(item.name),
  }));

  currentIndex = 0;

  // Font Awesome icons
  readonly faChevronLeft = faChevronLeft;
  readonly faChevronRight = faChevronRight;
  readonly faQuoteLeft = faQuoteLeft;

  private readonly autoPlayMs = 7000;
  private autoTimer?: ReturnType<typeof setInterval>;

  constructor() {
    this.startAutoPlay();
  }

  get count(): number {
    return this.slides.length;
  }

  get current(): RecommendationSlide | undefined {
    return this.slides[this.currentIndex];
  }

  /** Single-item list of the active slide so the card is recreated (and re-animated) on change. */
  get activeSlides(): RecommendationSlide[] {
    return this.current ? [this.current] : [];
  }

  next() {
    if (this.count === 0) return;
    this.goTo((this.currentIndex + 1) % this.count);
  }

  prev() {
    if (this.count === 0) return;
    this.goTo((this.currentIndex - 1 + this.count) % this.count);
  }

  goTo(index: number) {
    this.currentIndex = index;
    this.restartAutoPlay();
  }

  pause() {
    this.stopAutoPlay();
  }

  resume() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  private toInitials(name: string): string {
    return (name ?? '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  private startAutoPlay() {
    if (this.count < 2 || this.autoTimer) return;
    this.autoTimer = setInterval(() => this.next(), this.autoPlayMs);
  }

  private stopAutoPlay() {
    if (this.autoTimer) {
      clearInterval(this.autoTimer);
      this.autoTimer = undefined;
    }
  }

  private restartAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
