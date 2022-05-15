import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceDesComponent } from './source-des.component';

describe('SourceDesComponent', () => {
  let component: SourceDesComponent;
  let fixture: ComponentFixture<SourceDesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceDesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceDesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
