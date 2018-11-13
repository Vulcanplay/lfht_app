import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import {Observable} from "rxjs/Observable";
import {Result} from "../../model/Result";

@Injectable()
export class CategoryService {
  constructor(public httpServices: HttpService) {
  }
  /**
   * 提交订单
   * */
  submitOrder(p): Observable<(Result)> {
    return this.httpServices.postToken('insertOrder.do', p).map(r => r.json());
  }
  /**
   * 获取类目
   * */
  getCategoryList(p): Observable<(Result)> {
    return this.httpServices.post('selectCategory.do', p).map(r => r.json());
  }

  /**
   * 添加购物车
   * */
  addProductToCart(p): Observable<(Result)> {
    return this.httpServices.postToken('insertShopping.do', p).map(r => r.json());
  }

  /**
   * 获取精品
   * */
  getProductList(p): Observable<(Result)> {
    return this.httpServices.post('selectProductByCategoryId.do', p).map(r => r.json());
  }

  /**
   * 获取购物车列表
   * */
  getShoppingCartList(): Observable<(Result)> {
    return this.httpServices.postToken('selectShoppingByUser.do', {}).map(r => r.json());
  }

  /**
   * 操作购物车
   * */
  operatingShoppingItem(p): Observable<(Result)> {
    return this.httpServices.postToken('addOrLessOrDelShopping.do', p).map(r => r.json());
  }

  /**
   * 获取车型
   * */
  getCarBrand(): Observable<(Result)> {
    return this.httpServices.postToken('selectCarTypeAll.do').map(r => r.json());
  }

  /**
   * 获取商品详情的HTML内容
   * */
  getProductParticulars(p): Observable<(Result)> {
    return this.httpServices.post('selectProductParticularsByPrimaryKey.do', p).map(r => r.json());
  }
}
