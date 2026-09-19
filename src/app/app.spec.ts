import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { ConfigService, VolunteeringItem } from './config.service';

describe('App', () => {
  const detailUrl = '/leadership/coding-competition-2nd-place';
  const competition: VolunteeringItem = {
    title: '2nd place winner of University level Coding Competition',
    role: 'Competitor',
    organization: 'COMSATS University Sahiwal',
    period: '3rd Semester',
    description: 'The start of my leadership journey.',
    bullets: ['Won 2nd place'],
    detail: {
      slug: 'coding-competition-2nd-place',
      sections: [{ heading: 'The competition', paragraphs: ['Competition story.'] }],
    },
    imageUrls: [
      '/images/volunteering/coding-competition/photo-1.webp',
      '/images/volunteering/coding-competition/photo-2.webp',
      '/images/volunteering/coding-competition/2nd-position-certificate.pdf',
      '/images/volunteering/coding-competition/clip-1.mp4',
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter(routes, withComponentInputBinding()),
        {
          provide: ConfigService,
          useValue: {
            getFeature: (flag: string) => flag === 'volunteering',
            value: { volunteeringHighlights: [competition, { title: 'Another activity' }] },
          },
        },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('keeps the detail page out of Overview and navigation', async () => {
    const harness = await RouterTestingHarness.create('/');
    const page = harness.routeNativeElement!;
    expect(page.querySelector('h1')?.textContent).toContain('Nabeel Ahmed Jhatial');
    expect(page.querySelector(`a[href="${detailUrl}"]`)).toBeNull();
  });

  it('loads only the competition story and media at its direct URL', async () => {
    const harness = await RouterTestingHarness.create(detailUrl);
    const page = harness.routeNativeElement!;
    expect(page.querySelector('h1')?.textContent).toBe(competition.title);
    expect(page.textContent).toContain('Competition story.');
    expect(page.textContent).not.toContain('Another activity');
    expect(page.querySelector('.hero-section')).toBeNull();
    expect(page.querySelector('app-projects')).toBeNull();
    expect(page.querySelectorAll('.card-gallery .thumb').length).toBe(4);
    expect(page.querySelector('.certificate-link')?.getAttribute('href')).toBe(competition.imageUrls![2]);
    expect(page.querySelector('app-navbar .active-link')?.textContent).toBe('Leadership');
    expect(page.querySelector(`app-navbar a[href="${detailUrl}"]`)).toBeNull();
  });

  it('returns to the Leadership summary and opens the detail link', async () => {
    const harness = await RouterTestingHarness.create(detailUrl);
    const router = TestBed.inject(Router);
    const backLink = harness.routeNativeElement!.querySelector('.back-link') as HTMLAnchorElement;
    expect(backLink.getAttribute('href')).toBe('/#volunteering-section');
    await harness.navigateByUrl(backLink.getAttribute('href')!);
    const cards = harness.routeNativeElement!.querySelectorAll('.timeline-item');
    expect(cards.length).toBe(2);
    expect(cards[0].querySelectorAll('.card-gallery .thumb').length).toBe(4);
    expect(cards[0].querySelector('.card-bullets')?.textContent).toContain('Won 2nd place');
    expect(cards[0].querySelector('.card-link')?.getAttribute('href')).toBe(detailUrl);
    await harness.navigateByUrl(detailUrl);
    expect(router.url).toBe(detailUrl);
    expect(harness.routeNativeElement!.querySelector('h1')?.textContent).toBe(competition.title);
  });

  it('navigates from the detail page to Overview through the navbar', async () => {
    const harness = await RouterTestingHarness.create(detailUrl);
    const router = TestBed.inject(Router);
    const navigate = spyOn(router, 'navigate').and.callThrough();
    const link = harness.routeNativeElement!.querySelector('.desktop-nav a') as HTMLAnchorElement;
    link.click();
    expect(navigate).toHaveBeenCalledWith(['/'], { fragment: 'home-section' });
    await navigate.calls.mostRecent().returnValue;
    harness.detectChanges();
    expect(router.url).toBe('/#home-section');
    expect(harness.routeNativeElement!.querySelector('#leadership-detail')).toBeNull();
    expect(harness.routeNativeElement!.querySelector('.hero-section')).not.toBeNull();
  });

  it('preserves photo, certificate, and video lightbox behavior on the detail page', async () => {
    const harness = await RouterTestingHarness.create(detailUrl);
    const page = harness.routeNativeElement!;
    const thumbs = page.querySelectorAll<HTMLButtonElement>('.card-gallery .thumb');
    thumbs[0].click();
    harness.detectChanges();
    expect(page.querySelector('.lightbox-stage img')?.getAttribute('src')).toBe(competition.imageUrls![0]);
    (page.querySelector('.lightbox-close') as HTMLButtonElement).click();
    harness.detectChanges();
    thumbs[2].click();
    harness.detectChanges();
    expect(page.querySelector('iframe.lightbox-pdf')?.getAttribute('src')).toBe(competition.imageUrls![2]);
    (page.querySelector('.lightbox-nav.next') as HTMLButtonElement).click();
    harness.detectChanges();
    expect(page.querySelector('.lightbox-stage video')?.getAttribute('src')).toBe(competition.imageUrls![3]);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    harness.detectChanges();
    expect(page.querySelector('.lightbox')).toBeNull();
  });
});
