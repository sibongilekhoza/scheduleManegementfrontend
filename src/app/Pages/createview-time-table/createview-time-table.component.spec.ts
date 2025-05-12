import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateviewTimeTableComponent } from './createview-time-table.component';

describe('CreateviewTimeTableComponent', () => {
  let component: CreateviewTimeTableComponent;
  let fixture: ComponentFixture<CreateviewTimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateviewTimeTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateviewTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
