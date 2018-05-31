import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {each} from 'lodash';
import {Modal} from 'angular2-modal';
import {UploadEditImageModalComponent} from '../../../../shared/modals/upload-edit-image-modal/upload-edit-image-modal.component';
import {ModalWindowService} from '../../../../core/services';

@Component({
  selector: 'app-product-variant',
  templateUrl: 'product-variant.component.html',
  styleUrls: ['product-variant.component.scss']
})

export class ProductVariantComponent implements OnInit{
  @Input('vendor') public vendor;
  @Output('vendorDelete') public vendorDelete = new EventEmitter();

  public uniqueId: any = Math.random();
  public selected: boolean = true;
  public selectedVariant: any = null;

  constructor(private modal: Modal,
              private modalWindowService: ModalWindowService) {
  }

  ngOnInit() {
    this.selectAll();
  }

  deleteVendor() {
    this.vendorDelete.emit();
  }

  selectAll() {
    each(this.vendor.variants, (v) => {
      v.enabled = this.selected;
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

  showImage(variant) {
    this.selectedVariant = variant;
  }

  closeImage() {
    this.selectedVariant = null;
  }

  openUploadImageModal(event, variant) {
    this.modal.open(UploadEditImageModalComponent, this.modalWindowService
      .overlayConfigFactoryWithParams({ variant: this.vendor.variant, event, product: variant }, true, 'normal'))
      .then((resultPromise) => {
        resultPromise.result.then(
          (res) => {
          return variant.image = res;
        },
          (err) => {}
          );
      });
  }

}
