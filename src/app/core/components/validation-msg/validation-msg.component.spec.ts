import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationMsgComponent } from './validation-msg.component';

describe('ValidationMsgComponent', () => {
  let component: ValidationMsgComponent;
  let fixture: ComponentFixture<ValidationMsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ValidationMsgComponent]
    });
    fixture = TestBed.createComponent(ValidationMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
