import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { Projects } from './projects';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [provideHttpClient(), provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links company names in every experience role to a new tab', () => {
    component.activeSection = 'experience';
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const links = element.querySelectorAll<HTMLAnchorElement>('.timeline-org a');

    expect(links.length).toBe(3);
    expect(Array.from(links, (link) => link.href)).toEqual([
      'https://www.coldsend.pro/',
      'https://www.expertflow.com/',
      'https://www.expertflow.com/',
    ]);
    expect(Array.from(links, (link) => link.textContent?.trim())).toEqual([
      'Coldsend', 'Expertflow', 'Expertflow',
    ]);
    for (const link of links) {
      expect(link.target).toBe('_blank');
      expect(link.relList.contains('noopener')).toBeTrue();
      expect(link.relList.contains('noreferrer')).toBeTrue();
      expect(link.getAttribute('aria-label')).toContain('opens in a new tab');
    }
    expect(links[0].parentElement?.textContent).toContain('Dubai, Remote');
    expect(links[1].parentElement?.textContent).toContain('Switzerland, Remote');
  });
});
