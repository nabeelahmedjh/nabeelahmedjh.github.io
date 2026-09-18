import { Component, HostListener, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faImage, faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ConfigService, VolunteeringItem } from '../config.service';

export interface VolunteeringEntry {
  item: VolunteeringItem;
  images: string[];
}

@Component({
  selector: 'app-volunteering',
  imports: [FontAwesomeModule],
  templateUrl: './volunteering.html',
  styleUrl: './volunteering.scss'
})
export class Volunteering {
  private readonly cfg = inject(ConfigService);

  // Normalize each item into a consistent image list (imageUrls wins over imageUrl)
  readonly entries: VolunteeringEntry[] = this.cfg.value.volunteeringHighlights.map((item) => ({
    item,
    images:
      item.imageUrls && item.imageUrls.length
        ? item.imageUrls
        : item.imageUrl
          ? [item.imageUrl]
          : [],
  }));

  // Font Awesome icons
  readonly faImage = faImage;
  readonly faTimes = faTimes;
  readonly faChevronLeft = faChevronLeft;
  readonly faChevronRight = faChevronRight;

  // Lightbox state
  selected: VolunteeringEntry | null = null;
  selectedIndex = 0;

  openImage(entry: VolunteeringEntry, index: number) {
    if (!entry.images.length) {
      return;
    }
    this.selected = entry;
    this.selectedIndex = index;
  }

  closeImage() {
    this.selected = null;
    this.selectedIndex = 0;
  }

  showImage(index: number) {
    this.selectedIndex = index;
  }

  nextImage() {
    if (!this.selected) {
      return;
    }
    this.selectedIndex = (this.selectedIndex + 1) % this.selected.images.length;
  }

  prevImage() {
    if (!this.selected) {
      return;
    }
    const len = this.selected.images.length;
    this.selectedIndex = (this.selectedIndex - 1 + len) % len;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.closeImage();
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight() {
    if (this.selected) {
      this.nextImage();
    }
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft() {
    if (this.selected) {
      this.prevImage();
    }
  }
}
