import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformerEditComponent } from './transformer-edit.component';

describe('TransformerEditComponent', () => {
  let component: TransformerEditComponent;
  let fixture: ComponentFixture<TransformerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
