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

  constructor() { }

  ngOnInit() {
    this.vendor = {
      vendor_name: this.variants[0].vendor_name,
      vendor_id: this.variants[0].vendor_id
    }


    for (let i = 0; i < this.variants.length; i++) {
      for (let j = i + 1; j < this.variants.length; j++){
        if (_.isEqual(this.variants[i].inventory_by, this.variants[j].inventory_by)){
          this.variants[i].variants.push(this.variants[j].variants[0]);
          this.variants[i].common = this.variants[j].inventory_by[0][2].label;
          this.variants[j].common = this.variants[j].inventory_by[0][2].label;
          //console.log('Inventory_by', this.variants[j].inventory_by[0][2].label);
        }
      };
    }

    // his.variantsModify1 = [...this.variants];
    // this.variantsModify = [..._.uniqBy(this.variants, 'common')];

    this.variantsModify = _.uniqBy(this.variants, 'common');
    console.log('variantsModify ', this.variantsModify);
    this.variants.splice(0);

    this.variantsModify.forEach(item => {
      if (item.common) delete item.common;
      this.variants.push(item);
    });


    console.log('VAriants ', this.variants);
    console.log('variantsModify ', this.variants);


    // this.variantsModify1 = [...this.variants];
    // // console.log('Variants', this.variants);
    // this.variantsModify = this.variants.filter((item, index) =>{
    //
    //       for (let i = 0; i < this.variantsModify1.length; i++ ) {
    //         if (_.isEqual(this.variantsModify1[i].inventory_by, item.inventory_by)) {
    //           this.commonPackage.push(item.variants[0]);
    //           this.variantsModify1.splice(index,1);
    //           return false;
    //         }
    //         return true;
    //       }
    //   })
    // console.log('variantsModify ', this.variantsModify);
    //
    // this.variants[0].variants = this.commonPackage;
    // this.variants = [].concat(this.variants[0], this.variantsModify);
    // console.log('Modify Variants', this.variants)

    //console.log('Variants', this.variants);
    // this.variants.forEach(item => console.log(item));
    //
    // this.variantsModify = [...this.variants];
    // console.log('variantsModify ', this.variantsModify);

    // this.variants.forEach((item, index) => {
    //   const a = item;
    //   this.variants.forEach((item1, index1) => {
    //     if (_.isEqual(a.inventory_by, item1.inventory_by)){
    //       //item.variants.push(item1.variants[0]);
    //       this.variants.splice(index1,1);
    //      // delete this.variants[index1];
    //       console.log("a");
    //       if(this.variants.indexOf(a)) this.variants.push(a);
    //     }
    //
    //
    //
    //   })
    //
    // })

    // console.log('Variants',this.variants)
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
