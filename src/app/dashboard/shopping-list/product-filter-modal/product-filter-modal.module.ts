import { NgModule } from '@angular/core';

import { ProductFilterModal } from './product-filter-modal.component';
import { AppSharedModule } from '../../../shared/shared.module';
import { NouisliderModule } from 'ng2-nouislider';

@NgModule({
  declarations: [
    ProductFilterModal
  ],
  imports: [
    AppSharedModule,
    NouisliderModule
  ],
  providers: [],
  // IMPORTANT:
  // Since 'AdditionCalculateWindow' is never explicitly used (in a template)
  // we must tell angular about it.
  entryComponents: [ ProductFilterModal ]
})
export class ProductFilterModalModule {
}
