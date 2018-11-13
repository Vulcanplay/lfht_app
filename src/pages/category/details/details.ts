import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from "@angular/platform-browser";
import { ShoppingCartPage } from "../shopping-cart/shopping-cart";
import { ProductItem } from "../../../model/Product";
import { CategoryService } from "../CategoryService";
import { NativeService } from "../../../providers/NativeService";
import { PRODUCT_DETAILS, SIGN_IN_TO_DISMISS } from "../../../providers/Constants";
import { SignInPage } from "../../login/sign-in/sign-in";
import { ProductConfirmPage } from "../confirm/confirm";
@Component({
  selector: 'page-category-details',
  templateUrl: 'details.html'
})
export class ProductDetailsPage {

  public productItem: ProductItem;        //商品对象
  public cartAmt: string = '0';           //购物车数量

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public _sanitizer: DomSanitizer,
              public navParams: NavParams,
              public categoryService: CategoryService,
              public nativeService: NativeService) {
  }

  ngOnInit() {
    this.productItem = this.navParams.get("item");
    this.getProductParticulars(this.productItem.id);
    setTimeout(() => {
      this.updateCartAmt();
    }, 1000);
  }

  /**
   * 获取详情
   * */
  getProductParticulars(id){
    this.categoryService.getProductParticulars({productId: id}).subscribe(r => {
      if (r.ret){
        this.productItem.itemParticular = r.data == null ? '' : r.data.detailDesc;
      } else {
        this.nativeService.alertTip(r.data[0].message);
      }
    });
  }

  /**
   * @shoppingCartAppend
   * 添加进购物车
   * */
  shoppingCartAppend(){
    if (this.nativeService.isSign()){
      this.categoryService.addProductToCart({
        productId: this.productItem.id,
        productName: this.productItem.productName,
        price: this.productItem.productPrice,
      }).subscribe(r=>{
        console.log(JSON.stringify(r));
        if (r.ret){
          this.nativeService.alertTip("添加购物车成功");
          this.nativeService.setCartAmt(r.data.cartCount);
          this.updateCartAmt();
        } else {
          this.nativeService.alertTip(r.data[0].message);
        }
      });
    } else {
      this.signIn();
    }
  }

  /**
   * @ShoppingPage
   * 购物车
   * */
  shoppingCart(){
    if (this.nativeService.isSign()){
      this.navCtrl.push(ShoppingCartPage);
    } else {
      this.signIn();
    }
  }
  /**
   * @ProductConfirmPage
   * 结算
   * */
  confirm(){
    if (this.nativeService.isSign()){
      this.navCtrl.push(ProductConfirmPage, {data: this.productItem, from: PRODUCT_DETAILS});
    } else {
      this.signIn();
    }
  }
  /**
   * 插入HTML代码
   * */
  assembleHTML(strHTML: any) {
    return this._sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  /**
   * 背景图片
   * */
  getBackground(image) {
    if (image == '') {
      image = "./assets/img/category/default_img.png";
    }
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  /**
   * @SignInPage
   * 登陆
   * */
  signIn(){
    let sign = this.modalCtrl.create(SignInPage, {to: SIGN_IN_TO_DISMISS});
    sign.present();
    sign.onDidDismiss(data=>{
      if (data != null){
        this.nativeService.alertTip(data.message);
        this.updateCartAmt();
      } else {
        this.nativeService.alertTip("用户取消登陆");
      }
    })
  }

  /**
   * 更新购物车数量
   * */
  updateCartAmt(){
    this.cartAmt = this.nativeService.getCartAmt();
  }
}
