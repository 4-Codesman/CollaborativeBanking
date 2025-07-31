import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettings } from './account-settings';

describe('AccountSettings', () => {
  let component: AccountSettings;
  let fixture: ComponentFixture<AccountSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
