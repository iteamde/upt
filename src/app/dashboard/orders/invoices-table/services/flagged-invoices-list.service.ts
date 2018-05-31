import { Injectable } from '@angular/core';

import { Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { OrderListBaseService } from '../../classes/order-list-base.service';
import { InvoicesTableService } from './invoices-table.service';
import { ToasterService } from '../../../../core/services/toaster.service';

@Injectable()
export class FlaggedInvoicesListService extends OrderListBaseService {

  protected idName = 'invoice_id';

  private putItemRequest$: Observable<any>;
  private putItem$: Subject<any> = new Subject();

  constructor(
    private restangular: Restangular,
    private invoicesTableService: InvoicesTableService,
    private toasterService: ToasterService,
  ) {
    super(invoicesTableService);

    this.putItemRequest$ = this.putItem$
    .switchMap((item) => {
      const data = {
        'flagged': true,
        'flagged_comment': item.flagged_comment,
      };
      return this.restangular.one('invoice', item[this.idName]).all('flag').customPUT(data)
      .map((res: any) => {
        this.toasterService.pop('', res.data[0].flagged ? 'Flagged' : 'Unflagged');
        return res.data[0];
      })
      .catch((error) => Observable.never());
    })
    .share();

    this.invoicesTableService.addCollectionStreamToEntittesStream(this.getCollectionRequest$);
    this.invoicesTableService.addCollectionStreamToEntittesStream(this.putItemRequest$.map(item => [item]));

    const collectionIdsGetRequest$ = this.getCollectionRequest$
    .map((items) => _.map(items, this.idName))
    .let(this.getSetAction);

    const collectionAddIds$ = this.putItemRequest$
    .filter((item) => item.flagged)
    .map((item) => [item[this.idName]])
    .let(this.getAddAction);

    const collectionRemoveIds$ = this.putItemRequest$
    .filter((item) => !item.flagged)
    .map((item) => [item[this.idName]])
    .let(this.getRemoveAction);

    const collectionVoidedIds$ = this.invoicesTableService.removeIds$
    .let(this.getRemoveAction);

    this.ids$ = Observable.merge(
      collectionIdsGetRequest$,
      collectionAddIds$,
      collectionRemoveIds$,
      collectionVoidedIds$,
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
    return this.restangular.one('invoices', 'flagged').customGET('', params);
  }

  putItem(item) {
    this.putItem$.next(item);
    return this.putItemRequest$;
  }

}
