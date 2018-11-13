import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PRODUCT_DETAILS, SHOPPING_CART } from "../../../providers/Constants";
import { CategoryService } from "../CategoryService";
import { NativeService } from "../../../providers/NativeService";
import { TabsPage } from "../../tabs/tabs";
@Component({
  selector: 'page-product-confirm',
  templateUrl: 'confirm.html'
})
export class ProductConfirmPage {

  public carBrandList: any = [];  //车型数组集合
  public productList: any = [];   //商品数组集合

  public productItem: any = {
    productId: 0,       //商品ID
    productName: '',    //商品名称
    baseUrl: '',            //缩略图链接
    productPrice: 0,    //商品价格
    buyNum: 0,          //购买数量
    priceAmt: 0         //单个商品合计
  };
  public orderItem: any = {
    productCount: 0,  //购买总数
    totalPrice: 0,    //总金额
    discount: 1,      //折扣
    actualPrice: 0,   //实际支付金额
    carTypeId: 0,     //车型id
    carTypeName: '',  //车型名称
    color: '',        //颜色
    vin: ''           //VIN
  };
  public discountPrice: any = 0;  //折扣金额
  public carBrandId: any = 0;     //选择的车型

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nativeService: NativeService,
              public alertCtrl: AlertController,
              public categoryService: CategoryService) {
  }

  ngOnInit(){
    this.categoryService.getCarBrand().subscribe(r => {
      if (r.ret){
        this.carBrandList = r.data.carTypeList;
        this.carBrandId = this.carBrandList[0].id;
      }
    });
  }
  //
  ionViewWillEnter() {
    let data = this.navParams.get("data");
    console.log(JSON.stringify(data));
    switch (this.navParams.get("from")){
      case SHOPPING_CART:
        for (let item of data) {
          this.productItem.productId = item.productId;
          this.productItem.productName = item.productName;
          this.productItem.baseUrl = item.attachment == null ? '' : item.attachment.baseUrl;
          this.productItem.productPrice = item.price;
          this.productItem.buyNum = item.num;
          this.productItem.priceAmt = item.price * item.num;
          this.orderItem.totalPrice += item.price * item.num;
          this.orderItem.productCount += item.num;
          this.productList = this.productList.concat(this.productItem);
          this.productItem = {};
        }
        break;
      case PRODUCT_DETAILS:
        this.productItem.productId = data.id;
        this.productItem.productName = data.productName;
        this.productItem.baseUrl = data.attachment == null ? '' : data.attachment.baseUrl;
        this.productItem.productPrice = data.productPrice;
        this.productItem.buyNum = 1;
        this.productItem.priceAmt = data.productPrice * 1;
        this.orderItem.totalPrice += data.productPrice * 1;
        this.orderItem.productCount = 1;
        this.productList = this.productList.concat(this.productItem);
        this.productItem = {};
        break;
    }
    this.discountChange();
  }

  /**
   * 折扣变化
   * */
  discountChange(){
    this.orderItem.actualPrice = this.orderItem.totalPrice * this.orderItem.discount;
    this.discountPrice = this.orderItem.totalPrice - this.orderItem.actualPrice;
  }

  /**
   * 提交
   * */
  submit(){
    if (this.orderItem.color === '') {
      this.nativeService.alertTip("颜色不能为空");
    } else if (this.orderItem.vin === '') {
      this.nativeService.alertTip("车架号不能为空");
    } else {
      /**
       * 迭代车型 查询所选
       * */
      for (let item of this.carBrandList){
        if (item.id = this.carBrandId) {
          this.orderItem.carTypeId = item.id;
          this.orderItem.carTypeName = item.name;
          break;
        }
      }
      this.alertCtrl.create({
        title: '是否提交精品订单？',
        buttons: [{ text: '取消' },
          {
            text: '确定',
            handler: () => {
              /**
               * @submit
               * 提交订单
               * */
              this.categoryService.submitOrder({
                order: this.orderItem,
                orderDetailList: this.productList
              }).subscribe(r => {
                if (r.ret) {
                  //this.nativeService.setCartAmt(parseInt(this.nativeService.getCartAmt()) - this.orderItem.productCount);
                  this.nativeService.alertTip("订单提交成功.");
                  this.navCtrl.push(TabsPage, {index: 0});
                } else {
                  this.nativeService.alertTip(r.data[0].message);
                }
              });
            }
          }
        ]
      }).present();
    }
  }
}
