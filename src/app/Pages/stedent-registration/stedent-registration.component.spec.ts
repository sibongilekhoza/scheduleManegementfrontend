import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StedentRegistrationComponent } from './stedent-registration.component';

describe('StedentRegistrationComponent', () => {
  let component: StedentRegistrationComponent;
  let fixture: ComponentFixture<StedentRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StedentRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StedentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
