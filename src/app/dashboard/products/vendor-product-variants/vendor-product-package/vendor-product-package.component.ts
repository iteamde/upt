import {Component, Output, EventEmitter, Input, ViewChild} from '@angular/core';
import {CustomProductVariantModel} from "../../../../models/custom-product.model";
import {InventoryService} from "../../../../core/services/inventory.service";
import {DestroySubscribers} from "ngx-destroy-subscribers";
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-vendor-product-package',
  templateUrl: 'vendor-product-package.component.html',
  styleUrls: ['vendor-product-package.component.scss']
})

@DestroySubscribers()
export class VendorProductPackageComponent {

  @Input('package') public package: any;
  @Input('additional') public additional: boolean = true;
  @Output('fillColumn') fillColumn = new EventEmitter();
  @Output('fillAll') fillAll = new EventEmitter();

  @ViewChild('qty') public qty: boolean;

  public subscribers: any = {};
  public mainPrices: any = new CustomProductVariantModel();

  constructor(public inventoryService: InventoryService) {
  }

  onFillAll(price: string) {
    this.mainPrices.our_price = price;
    this.fillAll.emit(price);
  }

  onFillColumn(prop, value) {
    this.fillColumn.emit({prop, value});
  }

  packageSummary(pack): string {
    const inner = `of ${pack[1].qty} ${pack[1].label}`;
    const consumable = `of ${pack[2].qty} ${pack[2].label}`;
    const total = pack[2].units_per_package || (1 * (pack[1].qty || 1) * pack[2].qty);
    return `1 ${pack[0].label} ${pack[1].label && pack[1].qty ? inner : ''} ${pack[2].label && pack[2].qty ? consumable : ''}, 1 ${pack[0].label} = ${total} ${pack[2].label}(s)`;
  }

  qtyValid(): boolean {
    const qtyValue = parseInt(this.qty['value'], 10);
    if (isNaN(qtyValue)) {
      return false;
    } else {
      return qtyValue <= 0;
    }
  }

}
