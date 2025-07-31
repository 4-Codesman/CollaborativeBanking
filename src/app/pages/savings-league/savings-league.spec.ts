import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsLeague } from './savings-league.component';

describe('SavingsLeague', () => {
  let component: SavingsLeague;
  let fixture: ComponentFixture<SavingsLeague>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavingsLeague]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavingsLeague);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
