import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProductConfirmPage} from "../confirm/confirm";
import {CategoryService} from "../CategoryService";
import {NativeService} from "../../../providers/NativeService";
import {SHOPPING_CART} from "../../../providers/Constants";

@Component({
  selector: 'page-category-shopping-cart',
  templateUrl: 'shopping-cart.html'
})
export class ShoppingCartPage {

  public shoppingCartList: any = []; //购物车列表
  public itemsAmt: any = 0;

  constructor(public navCtrl: NavController,
              public nativeService: NativeService,
              public categoryService: CategoryService) {
  }

  ionViewWillEnter(){
    this.getShoppingCartList();
  }

  /**
   * 获取购物车列表
   * */
  getShoppingCartList(){
    this.categoryService.getShoppingCartList().subscribe(r => {
      if (r.ret){
        this.shoppingCartList = r.data == null ? [] : r.data.cartList;
        for (let item of this.shoppingCartList){
          item.checked = true;
          this.itemsAmt += item.price * item.num;
        }
      }
    });
  }
  /**
   * 购物车单项操作
   * */
  itemHandle(item, operating){
    this.categoryService.operatingShoppingItem({
      id: item.id,
      num: item.num,
      operating: operating,
    }).subscribe(r => {
      if (r.ret){
        let amt: number = parseInt(this.nativeService.getCartAmt());
        switch (operating){
          case "add":
            item.num++;
            this.nativeService.setCartAmt(amt + 1);
            break;
          case "less":
            item.num--;
            this.nativeService.setCartAmt(amt - 1);
            break;
          case "del":
            for (let i = 0; i < this.shoppingCartList.length; i++) {
              if (item.id == this.shoppingCartList[i].id){
                this.shoppingCartList.splice(i, 1);
              }
            }
            this.nativeService.setCartAmt(amt - parseInt(item.num));
            break;
        }
        this.updateItemsAmt(); //刷新总计
      } else {
        this.nativeService.alertTip(r.data[0].message);
      }
    });
  }
  /**
   * 计算总价
   * */
  updateItemsAmt(){
    this.itemsAmt = 0;
    for (let item of this.shoppingCartList) {
      if (item.checked){
        this.itemsAmt += item.price * item.num;
      }
    }
  }
  /**
   * @ProductConfirmPage
   * 下单
   * */
  confirm(){
    let arr = [];
    for (let item of this.shoppingCartList) {
      if (item.checked){
        arr = arr.concat(item);
      }
    }
    this.navCtrl.push(ProductConfirmPage, {data: arr, from: SHOPPING_CART});
  }
}
