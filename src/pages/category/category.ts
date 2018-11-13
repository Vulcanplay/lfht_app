import { Component } from "@angular/core";
import { NavController, ModalController } from 'ionic-angular';
import {ShoppingCartPage} from "./shopping-cart/shopping-cart";
import {ProductDetailsPage} from "./details/details";
import {CategoryService} from "./CategoryService";
import {NativeService} from "../../providers/NativeService";
import {SIGN_IN_TO_DISMISS} from "../../providers/Constants";
import {SignInPage} from "../login/sign-in/sign-in";

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  public categoryList: any = [];        //类目数组
  public productList: any = [];         //精品数组
  public categorySelectId: number = 0;  //选中的id
  public searchText: string = '';       //要搜索的文字
  public cartAmt: string = '0';           //购物车数量

  constructor(public navCtrl: NavController,
              public nativeService: NativeService,
              public categoryService: CategoryService,
              public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.getCategoryList();
    setTimeout(() => {
      this.updateCartAmt();
    }, 1000);
  }
  /**
   * @getCategoryList
   * 获取类目
   * */
  getCategoryList(){
    this.categoryService.getCategoryList({}).subscribe(r => {
      if (r.ret){
        this.categoryList = r.data.categoryList;
        /*if (this.categoryList.length != 0){
          this.categoryList[0].active = 1;
          this.getProductList(this.categoryList[0].details[0].id);
        }*/
      } else {
        this.nativeService.alertTip(r.data[0].message);
      }
    });
  }
  /**
   * @getProduct
   * 获取商品列表
   * params
   * 子类目id
   * */
  getProductList(id){
    this.categorySelectId = id;
    this.categoryService.getProductList({id: this.categorySelectId, queryText: this.searchText}).subscribe(r => {
      if (r.ret){
        this.productList = r.data.productList;
      } else {
        this.nativeService.alertTip(r.data[0].message);
      }
    });
  }
  /**
   * 搜索商品
   * params
   * 子类目id
   * */
  searchData() {
    this.getProductList(this.categorySelectId);
  }
  /**
   * @categoryListCtrl
   * 控制类目列表收缩
   * */
  categoryListCtrl(item){
    item.active = item.active == 0 ? 1 : 0;
  }
  /**
   * @shoppingCartAppend
   * 添加进购物车
   * */
  shoppingCartAppend(item){
    if (this.nativeService.isSign()){
      this.categoryService.addProductToCart({
        productId: item.id,
        productName: item.productName,
        price: item.productPrice,
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
   * @DetailsPage
   * 精品详情
   * */
  details(item){
    this.navCtrl.push(ProductDetailsPage, {item: item});
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
