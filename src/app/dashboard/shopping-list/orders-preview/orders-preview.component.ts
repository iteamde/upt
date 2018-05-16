import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ResponseContentType } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Observable} from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { DestroySubscribers } from 'ngx-destroy-subscribers';

import { ModalWindowService } from '../../../core/services/modal-window.service';
import { UserService } from '../../../core/services/user.service';
import { AccountService } from '../../../core/services/account.service';
import {OrderOptions, OrderService} from '../../../core/services/order.service';
import { ToasterService } from '../../../core/services/toaster.service';
import { APP_DI_CONFIG } from '../../../../../env';
import { HttpClient } from '../../../core/services/http.service';
import { EditFaxDataModal } from './edit-fax-data-modal/edit-fax-data-modal.component';
import { WarningOrderModalComponent } from './warning-order-modal/warning-order-modal.component';
import { OnlineOrderModalComponent } from './online-order-modal/online-order-modal.component';
import { SpinnerService } from '../../../core/services/spinner.service';
import { EditEmailDataModal } from './purchase-order/edit-email-data-modal/edit-email-data-modal.component';
import { ConfirmModalService } from '../../../shared/modals/confirm-modal/confirm-modal.service';


@Component({
  selector: 'app-orders-preview',
  templateUrl: './orders-preview.component.html',
  styleUrls: ['./orders-preview.component.scss']
})
@DestroySubscribers()
export class OrdersPreviewComponent implements OnInit, OnDestroy {
  public subscribers: any = {};

  public orderId = '';
  public orders$: Observable<any>;
  public prefillAllSubject$: Subject<any> = new Subject<any>();
  public saveOrderSubject$: Subject<any> = new Subject<any>();
  public location_id: string;
  public apiUrl: string;

  constructor(
    public modal: Modal,
    public modalWindowService: ModalWindowService,
    public userService: UserService,
    public windowLocation: Location,
    public accountService: AccountService,
    public route: ActivatedRoute,
    public orderService: OrderService,
    public toasterService: ToasterService,
    public router: Router,
    public httpClient: HttpClient,
    public spinner: SpinnerService,
    public confirmModalService: ConfirmModalService
  ) {
    this.apiUrl = APP_DI_CONFIG.apiEndpoint;
  }

  ngOnInit() {

    this.orders$ = this.orderService.collection$;

    this.subscribers.paramsSubscribtion = this.route.params
    .switchMap((p: Params) => {
      this.orderId = p['id'];
      return this.orderService.getOrder(p['id']);
    })
    .subscribe((items: any) => {
      return this.orderService.calcTT(items);
    });

    this.subscribers.saveOrderSubscription = this.saveOrderSubject$
    .switchMap((data) =>
      this.orderService.updateOrder(this.orderId, data)
    )
    .subscribe((res: any) => {
        this.toasterService.pop('', 'Data updated');
        this.orderService.calcTT(res);
      },
      (res: any) => {
        this.toasterService.pop('error', res.statusText);
        console.error(res);
      });
  }

  addSubscribers() {
    this.subscribers.confirmModalSubscription = this.modalWindowService.confirmModal$
      .subscribe(() => {
        this.confirmModalService.confirmModal('Success', 'Order is finalized ', [{text: 'Ok', value: 'ok', cancel: true}])
          .subscribe(() => this.router.navigate(['/shoppinglist']));
      });

    this.subscribers.prefillAllSubscription = this.prefillAllSubject$
    .switchMap(() =>
      this.orders$
      .map((orders: any) => {
        const order_ids = orders.map((order: any) => order.vendor_id);
        return this.orderService.convertData = {
          vendor_id: order_ids,
          location_id: this.location_id
        };
      })
    )
    .subscribe(() => {
      this.router.navigate(['/shoppinglist', 'purchase', this.orderId]);
    });
  }

  ngOnDestroy() {
    console.log('unsubscribe');
  }

  saveOrder(key: string, val, vendorId: string) {
    if (key !== 'ship_to' && key !== 'order_method') {
      const regex = /[\d\.]*/g;
      const m: any = regex.exec(val);
      regex.lastIndex++;
      const m1: any = regex.exec(val);
      if (m && m[0]) {
        val = parseFloat(m[0] ? m[0] : '0');
      } else if (m1 && m1[0]) {
        val = parseFloat(m1[0] ? m1[0] : '0');
      }
      if (!val) {
        val = 0;
      }

    }
    const data: any = {};
    data[key] = val;
    data['vendor_id'] = vendorId;
    this.saveOrderSubject$.next(data);
  }

  goBack(): void {
    this.windowLocation.back();
  }

  prefillDataForConvertion(order: any) {
    this.orderService.convertData = {
      vendor_id: [order[0].vendor_id],
      location_id: order[0].ship_to.location_id ? order[0].ship_to.location_id : order[0].ship_to_options[0].location_id
    };
    const data = new OrderOptions();
    data.ship_to = order[0].ship_to.location_id ? order[0].ship_to.location_id : order[0].ship_to_options[0].location_id;
    data.order_method = order[0].order_method;
    data['vendor_id'] = order[0].vendor_id;
    return data;
  }


  makeOrder(order: any) {

    const data = this.prefillDataForConvertion(order);
    /*let ua = navigator.userAgent.toLowerCase();
    let isSafari = ua.indexOf('safari') != -1;
    let w: Window;
    if (order[0].order_method === 'Mail' && isSafari) {
      w = window.open();
    }*/

    this.orderService.updateOrder(this.orderId, data)
    .subscribe((res: any) => {
        this.orderService.calcTT(res);
        //TODO: need to define, why order_method == null
        order[0].order_method = order[0].order_method == null ? 'Email' : order[0].order_method;
        switch (order[0].order_method) {
          case 'Email':
            this.convertOrder()
              .subscribe((order: any) => this.orderService.sendOrderRequest(order.id)
                .take(1)
                .subscribe((status: any) => {
                  this.showEmailDataEditModal({
                    order_method:order['order_method'],
                    attachments: order['attachments'],
                    email_text: status.email_text.replace('(vendor name)', order['vendor_name']),
                    po_number: order['po_number'],
                    preview_id: order['preview_id'],
                    order_id: order['id'],
                    vendor_email: order['vendor_email_address'],
                    user_email: this.userService.selfData.email_address,
                    from_fax_number: order['from_fax_number'] || '1 11111111111',
                    rmFn:  null
                  });
            }));
            break;
          case 'Fax':
            this.convertOrder()
              .subscribe(order => {
                this.orderService.sendOrderRequest(order.id)
                  .take(1)
                  .subscribe(status => {
                  this.modal.open(
                    EditFaxDataModal,
                    this.modalWindowService.overlayConfigFactoryWithParams({
                      order_method: order['order_method'],
                      attachments: order['attachments'],
                      fax_text: status.email_text.replace('(vendor name)', order['vendor_name']),
                      po_number: order['po_number'],
                      preview_id: order['preview_id'],
                      order_id: order['id'],
                      vendor_name: order['vendor_name'],
                      user_name: this.userService.selfData.name,
                      from_fax_number: order['from_fax_number'] || '1 11111111111',
                      rmFn: null
                    }, true, 'oldschool')
                  )
                });
              });
            break;
          case 'Online':
            this.modal.open(
              OnlineOrderModalComponent,
              this.modalWindowService.overlayConfigFactoryWithParams({
                order_id: this.orderId,
                vendor_id: order[0].vendor_id
              }, true, 'oldschool')
            );
            break;
          case 'Phone':
            this.convertOrder()
              .subscribe(order => {
                this.orderService.sendOrderRequest(order.id)
                  .take(1)
                  .subscribe((status: any) => {
                    this.openWarningOrderModal(order, status);
                  })
              });
            break;
          case 'Mail':
            this.convertOrder()
              .subscribe(order => {
                this.orderService.sendOrderRequest(order.id)
                  .take(1)
                  .subscribe(status => this.openWarningOrderModal(order, status))
              });
            break;
          default:
            break;
        }

      },
      (res: any) => {
        this.toasterService.pop('error', res.statusText);
        console.error(res);
      });
    }

    getButtonText(order: any) {
      switch (order.order_method) {
        case 'Email':
          return 'Send';
        case 'Fax':
          return 'Fax';
        case 'Online':
          return 'Finalize';
        case 'Phone':
          return 'Finalize';
        case 'Mail':
          return 'Finalize';
        default:
          return 'Send';
      }
    }

  prefillAll() {
    this.prefillAllSubject$.next(null);
  }

  onViewPoClick(order: any) {
    this.prefillDataForConvertion(order);
    this.router.navigate(['/shoppinglist', 'purchase', this.orderId]);
  }

  onPrintPoClick(order: any) {
    this.prefillDataForConvertion(order);
    this.spinner.show();
    let ua = navigator.userAgent.toLowerCase();
    let isSafari = ua.indexOf('safari') != -1;
    let w: Window;
    if (isSafari) {
      w = window.open();
    }

    this.orderService.convertOrders(this.orderId, this.orderService.convertData)
      .map(res => res.data.order)
      .switchMap(order => {
          return this.httpClient.get(APP_DI_CONFIG.apiEndpoint + '/po/' + order.id + '/download', {
            responseType: ResponseContentType.ArrayBuffer
          });
      })
      .subscribe((res) => {
        let file = new Blob([res.arrayBuffer()], {type: 'application/pdf'});
        let pdfUrl = window.URL.createObjectURL(file);

        if (isSafari) {
          setTimeout(() => {
            w.print();
          }, 500);
          w.location.assign(pdfUrl);
        } else {
          w = window.open(pdfUrl);
          w.print();
        }
        this.spinner.hide();
      })
  }

  convertOrder(): Observable<any> {
    return this.orderService.convertOrders(this.orderId, this.orderService.convertData)
      .map(res => res.data.order)
  }

  openWarningOrderModal(order, status) {
    this.modal.open(
      WarningOrderModalComponent,
      this.modalWindowService.overlayConfigFactoryWithParams({order, status}, true, 'oldschool')
    );
  }

  showEmailDataEditModal(data) {
    if (!data.email_text) {
      data.email_text = 'Email text';
    }
    if (!data.po_number) {
      data.po_number = '1234567890';
    }
    this.modal.open(EditEmailDataModal, this.modalWindowService.overlayConfigFactoryWithParams(data, true, 'oldschool'));
  }

}
