import { Injectable } from '@angular/core';

import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as _ from 'lodash';

import { OrderListBaseService } from '../../classes/order-list-base.service';
import { InvoicesTableService } from './invoices-table.service';
import { ToasterService } from '../../../../core/services/toaster.service';

@Injectable()
export class AllInvoicesListService extends OrderListBaseService {

  protected idName = 'invoice_id';
  private postItemRequest$: Observable<any>;
  private postItem$: Subject<any> = new Subject();

  constructor(
    private restangular: Restangular,
    private invoicesTableService: InvoicesTableService,
    private toasterService: ToasterService,
  ) {
    super(invoicesTableService);

    this.postItemRequest$ = this.postItem$
    .switchMap((item) =>
      this.restangular.all('invoices').all('favorite')
      .customPOST({'invoices' : [{'favorite': !item.favorite, invoice_id: item.invoice_id}]})
      .map((res: any) => {
        this.toasterService.pop('', res.data[0].favorite ? 'Favorite' : 'Unfavorite');
        return res.data[0];
      })
      .catch((error) => Observable.never())
    )
    .share();

    this.invoicesTableService.addCollectionStreamToEntittesStream(this.getCollectionRequest$);
    this.invoicesTableService.addCollectionStreamToEntittesStream(this.postItemRequest$.map(item => [item]));

    const collectionIdsGetRequest$ = this.getCollectionRequest$
    .map((items) => _.map(items, this.idName))
    .let(this.getSetAction);

    this.ids$ = Observable.merge(
      collectionIdsGetRequest$,
    )
    .scan(this.reducer, [])
    .publish();
    this.ids$.connect();

    this.collection$ = Observable.combineLatest(
      this.invoicesTableService.entities$,
      this.ids$,
    )
    .map(([entities, ids]) =>
      ids.map((id) => entities[id])
    );
  }

  getRequest(params) {
    return this.restangular.one('invoices', 'all').customGET('', params);
  }

  postItem(item) {
    this.postItem$.next(item);
    return this.postItemRequest$;
  }

}
