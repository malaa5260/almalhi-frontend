import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { About } from './about';

describe('About', () => {
  let fixture: ComponentFixture<About>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('renders the system purpose, audiences, and at least three capabilities', () => {
    expect(compiled.textContent).toContain('About Almalhi System');
    expect(compiled.textContent).toContain('protected Angular platform');

    for (const audience of [
      'Visitors',
      'New users',
      'Existing users',
      'Dashboard users',
    ]) {
      expect(compiled.textContent).toContain(audience);
    }

    const capabilityHeadings = fixture.debugElement.queryAll(
      By.css('[aria-labelledby="capabilities-title"] h3')
    );

    expect(capabilityHeadings.length).toBeGreaterThanOrEqual(3);
    expect(compiled.textContent).toContain('Account access');
    expect(compiled.textContent).toContain('Protected dashboard');
    expect(compiled.textContent).toContain('Reusable platform');
  });

  it('renders support guidance, protected dashboard wording, contact email, and no form fields', () => {
    expect(compiled.textContent).toContain('How the system supports users');
    expect(compiled.textContent).toContain('dashboard access remains limited');
    expect(compiled.textContent).toContain('Email Support');

    const supportLinks = fixture.debugElement.queryAll(
      By.css('a[href="mailto:support@almalhi.com"]')
    );

    expect(supportLinks.length).toBeGreaterThanOrEqual(1);
    expect(compiled.querySelector('form')).toBeNull();
    expect(compiled.querySelector('input')).toBeNull();
    expect(compiled.querySelector('textarea')).toBeNull();
  });

  it('renders next actions for public, account, and support journeys', () => {
    const hrefs = Array.from(compiled.querySelectorAll('a')).map(anchor =>
      anchor.getAttribute('href')
    );

    expect(hrefs).toContain('/home');
    expect(hrefs).toContain('/auth/login');
    expect(hrefs).toContain('/auth/register');
    expect(hrefs).toContain('mailto:support@almalhi.com');
  });
});
