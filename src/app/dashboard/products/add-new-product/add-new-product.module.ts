import { NgModule } from '@angular/core';

import { AddNewProductComponent } from './add-new-product.component';
import {AppSharedModule} from '../../../shared/shared.module';
import {ProductVariantModule} from "../../../shared/components/product-variant/product-variant.module";

import {UploadEditFileModule} from "../../../shared/components/upload-edit-file/upload-edit-file.module";
import {UploadEditImageModalModule} from "../../../shared/modals/upload-edit-image-modal/upload-edit-image-modal.module";

@NgModule({
  declarations: [
    AddNewProductComponent,
  ],
  imports: [
    AppSharedModule,
    ProductVariantModule,
    UploadEditFileModule,
    UploadEditImageModalModule

  ],
  providers: [],
  exports: [
  ],
  // IMPORTANT:
  // Since 'AdditionCalculateWindow' is never explicitly used (in a template)
  // we must tell angular about it.
  entryComponents: [AddNewProductComponent]
})
export class AddNewProductModule {

}
