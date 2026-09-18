import { Component, HostListener, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faImage, faTimes, faChevronLeft, faChevronRight, faPlay, faFilePdf } from '@fortawesome/free-solid-svg-icons';
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
  private readonly sanitizer = inject(DomSanitizer);

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
  readonly faPlay = faPlay;
  readonly faYoutube = faYoutube;
  readonly faFilePdf = faFilePdf;

  /** True when a media URL points to a video clip rather than a picture. */
  isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
  }

  /** Extracts the YouTube video id, or an empty string when the URL is not YouTube. */
  youtubeId(url: string): string {
    const match = /(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/.exec(url);
    return match ? match[1] : '';
  }

  isYouTube(url: string): boolean {
    return this.youtubeId(url).length > 0;
  }

  /** True when a media URL points to a PDF document (e.g. a certificate). */
  isPdf(url: string): boolean {
    return /\.pdf(\?|#|$)/i.test(url);
  }

  /** Sanitized URL so the lightbox can render a PDF in an iframe. */
  pdfSrc(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /** Poster frame for a YouTube recording, used in the gallery and thumb strip. */
  youtubeThumb(url: string): string {
    return `https://i.ytimg.com/vi/${this.youtubeId(url)}/hqdefault.jpg`;
  }

  /** Sanitized embed URL so the lightbox can play a YouTube recording inline. */
  youtubeEmbed(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${this.youtubeId(url)}?rel=0`,
    );
  }

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
