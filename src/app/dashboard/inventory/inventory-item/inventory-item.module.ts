import { NgModule } from '@angular/core';
import { AppSharedModule } from '../../../shared/shared.module';
import { InventoryItemComponent } from './inventory-item.component';
import { InfoModalModule } from './default-info-modal/info-modal.module';
import { AddInventory2OrderModalModule } from './add-inventory-2order-modal/add-inventory-2order-modal.module';
import {ChangeDefaultProductModalModule} from './change-default-product-modal/change-default-product-modal.module';


@NgModule({
  declarations: [
    InventoryItemComponent
  ],
  imports: [
    AppSharedModule,
    InfoModalModule,
    ChangeDefaultProductModalModule,
    AddInventory2OrderModalModule
  ],
  providers: []
})
export class InventoryItemModule {
}