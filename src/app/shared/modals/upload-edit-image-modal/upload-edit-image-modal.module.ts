import { NgModule } from '@angular/core';
import {AppSharedModule} from "../../shared.module";
import {UploadEditImageModalComponent} from "./upload-edit-image-modal.component";
import {UploadEditFileModule} from "../../components/upload-edit-file/upload-edit-file.module";



@NgModule({
  imports: [AppSharedModule, UploadEditFileModule],
  declarations: [UploadEditImageModalComponent],
  exports: [],
  entryComponents: [UploadEditImageModalComponent]
})
export class UploadEditImageModalModule { }
