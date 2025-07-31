import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSavingsLeagueComponent } from './create-savings-league.component';

describe('CreateSavingsLeagueComponent', () => {
  let component: CreateSavingsLeagueComponent;
  let fixture: ComponentFixture<CreateSavingsLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSavingsLeagueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSavingsLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
