import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewwStuffComponent } from './vieww-stuff.component';

describe('ViewwStuffComponent', () => {
  let component: ViewwStuffComponent;
  let fixture: ComponentFixture<ViewwStuffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewwStuffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewwStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
