import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformersListComponent } from './transformers-list.component';

describe('TransformersListComponent', () => {
  let component: TransformersListComponent;
  let fixture: ComponentFixture<TransformersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
