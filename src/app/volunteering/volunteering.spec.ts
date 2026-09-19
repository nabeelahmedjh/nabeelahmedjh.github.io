import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { Volunteering } from './volunteering';

describe('Volunteering', () => {
  let component: Volunteering;
  let fixture: ComponentFixture<Volunteering>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Volunteering],
      providers: [provideHttpClient(), provideRouter([]), provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Volunteering);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a fallback and return link when detail content is unavailable', () => {
    fixture.componentRef.setInput('detailSlug', 'missing-competition');
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toBe('Achievement unavailable');
    expect(page.querySelector('.back-link')?.getAttribute('href')).toBe('/#volunteering-section');
    expect(page.querySelector('.timeline-item')).toBeNull();
  });
});
