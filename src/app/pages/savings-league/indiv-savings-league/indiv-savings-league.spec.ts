import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivSavingsLeague } from './indiv-savings-league';

describe('IndivSavingsLeague', () => {
  let component: IndivSavingsLeague;
  let fixture: ComponentFixture<IndivSavingsLeague>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndivSavingsLeague]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndivSavingsLeague);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
