import { NgModule } from '@angular/core';
import {AppSharedModule} from '../../../../shared/shared.module';

import {ChangeDefaultProductModalComponent} from './change-default-product-modal.component';

@NgModule({
  declarations: [
      ChangeDefaultProductModalComponent,
  ],
  imports: [
    AppSharedModule,
  ],
  providers: [],
  entryComponents: [ ChangeDefaultProductModalComponent ]
})
export class ChangeDefaultProductModalModule { }
