import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { DestroySubscribers } from 'ngx-destroy-subscribers';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

import { UserService, AccountService } from '../../../core/services/index';
import { SlFilters } from '../../../models/slfilters.model';
import { NouiFormatter } from "ng2-nouislider";

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






  constructor(
      public dialog: DialogRef<ProductFilterModalContext>,
      public userService: UserService,
      public accountService: AccountService
  ) {
    this.context = dialog.context;
    this.filter = this.context.currentFilters;
  }




  ngOnInit(){


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



  /*
  @ViewChild('slider', { read: ElementRef }) slider: ElementRef;
  someKeyboardConfig: any = {
    connect: [true, true, true],
    tooltips: [new MyFormatter, new MyFormatter],
    start: [24, 34],
    step: 1,
    range: {
      min: 0,
      max: 100
    }
  }
}
export class MyFormatter implements NouiFormatter {
  to(value: number): string {
    let output = "$" + value;
    return output;
  }
  from(value: string): number {
    return Number(value.split(" ")[0]);
  }
 */
}
