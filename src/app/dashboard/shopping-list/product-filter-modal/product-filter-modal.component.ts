import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { DestroySubscribers } from 'ngx-destroy-subscribers';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider';

import wNumb from 'materialize-css/extras/noUiSlider/nouislider';

import { UserService, AccountService } from '../../../core/services/index';
import { SlFilters } from '../../../models/slfilters.model';

export class ProductFilterModalContext extends BSModalContext {
  public vendors: any;
  public currentFilters: SlFilters;
  public callback = function(a:any){};
}




@Component({
  selector: 'app-product-filter-modal',
  templateUrl: './product-filter-modal.component.html',
  styleUrls: ['./product-filter-modal.component.scss']
})
@DestroySubscribers()
export class ProductFilterModal implements OnInit, ModalComponent<ProductFilterModalContext> {
  public subscribers: any = {};
  context: ProductFilterModalContext;
  public filter:SlFilters = new SlFilters;

 x;
 y;
  constructor(
      public dialog: DialogRef<ProductFilterModalContext>,
      public userService: UserService,
      public accountService: AccountService
  ) {
    this.context = dialog.context;
    this.filter = this.context.currentFilters;
  }

  ngOnInit() {
    this.createSlider();

  }

  createSlider() {
    // console.log("FUNCTION THAT MAKE SLIDER", noUiSlider);
    const slider = document.getElementById('test-slider') as noUiSlider.Instance;
     noUiSlider.create(slider, {
      start: [20, 80],
      connect: true,
      step: 1,
      orientation: 'horizontal', // 'horizontal' or 'vertical'
      range: {
        'min': 0,
        'max': 100
      }
    });
    // const x = slider.noUiSlider.get();
    // console.log( "ITS VALUE", x);
    slider.noUiSlider.on('update', function(){
      console.log(slider.noUiSlider.get());
      this.x = slider.noUiSlider.get()[0];
      this.y = slider.noUiSlider.get()[1];
      console.log(this.x, this.y);
    });
  }



  dismissModal(){
    this.dialog.dismiss();
  }

  closeModal(data){
    this.dialog.close(data);
  }

  triggerFilterChange(){
    this.context.callback(this.filter);
    this.dismissModal();
  }

  resetFilters(){
    this.filter = new SlFilters;
    this.triggerFilterChange();
  }
}
