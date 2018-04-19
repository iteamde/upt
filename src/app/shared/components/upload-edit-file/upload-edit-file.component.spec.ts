import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEditFileComponent } from './upload-edit-file.component';

describe('UploadEditFileComponent', () => {
  let component: UploadEditFileComponent;
  let fixture: ComponentFixture<UploadEditFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadEditFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEditFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
