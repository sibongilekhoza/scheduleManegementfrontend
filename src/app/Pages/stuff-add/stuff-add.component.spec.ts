import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuffAddComponent } from './stuff-add.component';

describe('StuffAddComponent', () => {
  let component: StuffAddComponent;
  let fixture: ComponentFixture<StuffAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuffAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StuffAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
