import { NgModule } from '@angular/core';
import {ProductVariantComponent} from "./product-variant.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Angular2FontawesomeModule} from "angular2-fontawesome";
import {MaterializeModule} from "angular2-materialize/dist";
import {NguiAutoCompleteModule} from "@ngui/auto-complete";
import {PriceInputModule} from "../../price-input/price-input.module";
import {ScannerModule} from "../../../../dashboard/scanner/scanner.module";
import {VendorProductPackageComponent} from "../vendor-product-package/vendor-product-package.component";
import {DropdownPackageComponent} from "../vendor-product-package/dropdown-package/dropdown-package.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    ProductVariantComponent,
    VendorProductPackageComponent,
    DropdownPackageComponent

  ],
  imports: [
    ScannerModule,
    CommonModule,
    FormsModule,
    Angular2FontawesomeModule,
    MaterializeModule,
    NguiAutoCompleteModule,
    PriceInputModule,
    BrowserAnimationsModule
  ],
  exports: [
    ProductVariantComponent
  ],
  providers: [],
})
export class ProductVariantModule {}
