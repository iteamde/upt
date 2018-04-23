import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-vendor-product-variants',
  templateUrl: './vendor-product-variants.component.html',
  styleUrls: ['./vendor-product-variants.component.scss']
})
export class VendorProductVariantsComponent implements OnInit {

  @Input('variants') public variants: any[];
  @Output('addVendor') public addVendor = new EventEmitter();
  @Output('vendorDelete') public vendorDelete = new EventEmitter();

  public vendor: any = {};
  public variantsModify:any =[];
  public commonPackage:any =[];
  public v:any =[];

  constructor() { }

  ngOnInit() {
    this.vendor = {
      vendor_name: this.variants[0].vendor_name,
      vendor_id: this.variants[0].vendor_id
    }

    // console.log('Variants', this.variants);
    // this.variantsModify = this.variants.filter((item, index) =>{
    //       if(_.isEqual(this.variants[0].inventory_by, item.inventory_by)){
    //         this.commonPackage.push(item.variants[0]);
    //         //this.variants.splice(index,1);
    //
    //         console.log(item);
    //         return false;
    //       }
    //       return true;
    //     }
    //   )
    //
    // this.variants[0].variants = this.commonPackage;
    // this.variants = [].concat(this.variants[0], this.variantsModify);
    // console.log('Modify Variants', this.variants)

    console.log('Variants', this.variants);
    //this.variants.forEach(item => console.log(item));


    this.variants.forEach((item, index) => {
      this.variants.forEach((item1, index1) => {
        if (_.isEqual(item.inventory_by, item1.inventory_by) && (index1 != index)){
          item.variants.push(item1.variants[0]);
          this.variants.splice(index1,1);
        }

      })

    })
   //  var indexArr = new Array();
   //  var newArr = [];
   //  for (var i = 0 ; i < this.variants.length; i++) {
   //    if( indexArr.includes(i) ) {
   //      console.log('includes', i);
   //      continue;
   //    }
   //    newArr.push(this.variants[i]);
   //    for (var j = i+1 ; j <= this.variants.length - 1; j++) {
   //      if (_.isEqual(this.variants[i].inventory_by, this.variants[j].inventory_by)){
   //        console.log('equal', i,j);
   //        newArr[i].variants.push(this.variants[j].variants[0]);
   //        indexArr.push(j);
   //             }
   //    }
   //
   //  }
   //
   // this.variants = newArr;
   //  console.log('Modify Variants newArr',newArr);
  }


  onAddPackageClick() {
    this.addVendor.emit({...this.vendor, additional: true});//TODO: find a better way (additional)
  }

  onVendorDelete(i) {
    this.variants.splice(i, 1);
    if (!this.variants.length) {
      this.vendorDelete.emit();
    }
  }

}
