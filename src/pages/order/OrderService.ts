import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import {Observable} from "rxjs/Observable";
import {Result} from "../../model/Result";

@Injectable()
export class OrderService {
  constructor(public httpServices: HttpService) {
  }
  /**
   * 提交订单
   * */
  getOrderList(p): Observable<(Result)> {
    return this.httpServices.postToken('getOrders.do', p).map(r => r.json());
  }

  /**
   * 取消订单
   * */
  cancelOrder(p): Observable<(Result)> {
    return this.httpServices.postToken('orderCancel.do', p).map(r => r.json());
  }

  /**
   * 上传签名
   * */
  uploadOrderSignature(p): Observable<(Result)> {
    return this.httpServices.postToken('orderSign.do', p).map(r => r.json());
  }
}
