import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPackageComponent } from './dropdown-package.component';

describe('DropdownPackageComponent', () => {
  let component: DropdownPackageComponent;
  let fixture: ComponentFixture<DropdownPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
