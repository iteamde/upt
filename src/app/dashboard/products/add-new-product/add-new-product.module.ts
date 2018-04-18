import { NgModule } from '@angular/core';

import { AddNewProductComponent } from './add-new-product.component';
import {AppSharedModule} from '../../../shared/shared.module';
import {ProductVariantModule} from "../../../shared/components/product-variant/product-variant.module";

import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

@NgModule({
  declarations: [
    AddNewProductComponent,
    ImageCropperComponent

  ],
  imports: [
    AppSharedModule,
    ProductVariantModule
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
