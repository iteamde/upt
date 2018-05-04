import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {each} from 'lodash';

@Component({
  selector: 'app-product-variant',
  templateUrl: 'product-variant.component.html',
  styleUrls: ['product-variant.component.scss']
})

export class ProductVariantComponent implements OnInit{
  @Input('vendor') public vendor;
  @Input('unGroupedVariants') public unGroupedVariants: any;
  @Output('vendorDelete') public vendorDelete = new EventEmitter();

  public uniqueId: any = Math.random();
  public selected: boolean = true;

  constructor() {
  }

  ngOnInit() {
    this.selectAll();
  }

  deleteVendor() {
    this.vendorDelete.emit();
  }

  selectAll() {
    each(this.vendor.variants, (v) => {
      v.enabled = this.selected
    });
  }

  onFillAll(price) {
    each(this.vendor.variants, v => {
      v.list_price = v.our_price = price;
    });
  }

  onFillColumn(price) {
    each(this.vendor.variants, v => v[price.prop] = price.value);
  }

  onFillOur(price, i) {
    this.vendor.variants[i].our_price = price;
  }

  updateProductDisplay(newVariant) {
    each(this.unGroupedVariants, localVariant => {


      // if (localVariant.catalog_number == newVariant.catalog_number) {
      //   localVariant['name'] = newVariant['name'];
      //   localVariant['club_price'] = newVariant['club_price'];
      //   localVariant['list_price'] = newVariant['list_price'];
      //   localVariant['our_price'] = newVariant['our_price'];
      //   localVariant['upc'] = newVariant['upc'];
      // }

       each(localVariant.vendor_variants, localVendorVariant => {
        if (localVendorVariant.id == newVariant.id) {
          localVendorVariant['name'] = newVariant['name'];
          localVendorVariant['club_price'] = newVariant['club_price'];
          localVendorVariant['list_price'] = newVariant['list_price'];
          localVendorVariant['our_price'] = newVariant['our_price'];
          localVendorVariant['upc'] = newVariant['upc'];
        }
      })

    })




  }

}
