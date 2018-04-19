import { NgModule } from '@angular/core';
import { AppSharedModule } from '../../shared.module';
import {UploadEditFileComponent} from "./upload-edit-file.component";
import {ImageCropperComponent} from 'ng2-img-cropper';

@NgModule({
  declarations: [UploadEditFileComponent, ImageCropperComponent],
  exports: [ImageCropperComponent, UploadEditFileComponent],
  imports: [AppSharedModule],
  providers: [],
})
export class UploadEditFileModule { }
