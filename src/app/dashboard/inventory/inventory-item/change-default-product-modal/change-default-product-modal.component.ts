import {Component, OnDestroy, OnInit} from '@angular/core';

import {DialogRef, Modal, ModalComponent} from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { InventoryService } from '../../../../core/services';

import { DestroySubscribers } from 'ngx-destroy-subscribers';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';


export class ChangeDefaultProductModalContext extends BSModalContext {
  public data: any;
}
@Component({
  selector: 'app-inventory-change-default-product-modal',
  templateUrl: './change-default-product-modal.component.html',
  styleUrls: ['./change-default-product-modal.component.scss']
})
@DestroySubscribers()
export class ChangeDefaultProductModalComponent implements OnInit, OnDestroy, ModalComponent<ChangeDefaultProductModalContext> {

  context$: Observable<any>;
  dataEmit$: Subject<any>;
  defaultProduct;
  inventoryGroupId: string;

  private subscribers: any = {};

  constructor(
    public dialog: DialogRef<ChangeDefaultProductModalContext>,
    public modal: Modal,
    public inventoryService: InventoryService
  ) {
      this.context$ = dialog.context.data;
      this.dataEmit$ = new Subject<any>();
  }

  ngOnInit() {
    this.subscribers.getDefaultProduct = this.context$
    .map((inventoryGroup) => {
      this.inventoryGroupId = inventoryGroup.id;
      return this.defaultProduct = _.find(inventoryGroup.inventory_products, 'default_product');
    })
    .subscribe();

    this.subscribers.sendDefaultProduct = this.dataEmit$
    .switchMap(data => this.inventoryService.changeDefaultProduct(this.inventoryGroupId, data))
    .subscribe((res) => {
        this.dialog.close(res);
      }
    );

  }
  ngOnDestroy() {
    console.log('for unsubscribing');
  }
  dismissModal() {
    this.dialog.dismiss();
  }
  saveNewDefaultProduct() {
    this.dataEmit$.next(this.defaultProduct);
  }
}
