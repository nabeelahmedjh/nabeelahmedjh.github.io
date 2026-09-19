import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { Landing } from './landing';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [provideHttpClient(), provideRouter([]), provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Landing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links company logos and names to their websites in a new tab', () => {
    const element: HTMLElement = fixture.nativeElement;
    const links = element.querySelectorAll<HTMLAnchorElement>('.logo-card[href]');

    expect(links.length).toBe(2);
    for (const [name, url] of [
      ['ExpertFlow', 'https://www.expertflow.com/'],
      ['ColdSend', 'https://www.coldsend.pro/'],
    ]) {
      const link = element.querySelector<HTMLAnchorElement>(`.logo-card[href="${url}"]`)!;
      expect(link).toBeTruthy();
      expect(link.target).toBe('_blank');
      expect(link.relList.contains('noopener')).toBeTrue();
      expect(link.relList.contains('noreferrer')).toBeTrue();
      expect(link.querySelector('img')?.alt).toBe(`${name} logo`);
      expect(link.getAttribute('aria-label')).toContain('opens in a new tab');
    }
    expect(links[1].querySelector('span')?.textContent).toBe('ColdSend');
  });

  it('keeps companies without a website as non-link cards', () => {
    const element: HTMLElement = fixture.nativeElement;
    const cards = element.querySelectorAll('div.logo-card');

    expect(cards.length).toBe(2);
    expect(cards[0].textContent).toContain('Google');
    expect(cards[1].textContent).toContain('Microsoft');
    expect(element.querySelectorAll('.logo-card img').length).toBe(4);
  });
});
