import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEditImageModalComponent } from './upload-edit-image-modal.component';

describe('UploadEditImageModalComponent', () => {
  let component: UploadEditImageModalComponent;
  let fixture: ComponentFixture<UploadEditImageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadEditImageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEditImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
