import { Component } from '@angular/core';
import { NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import {SignaturePadRPage} from "../../../shared/signature-pad-return/signature-pad-r";
import {OrderService} from "../OrderService";
import {NativeService} from "../../../providers/NativeService";
@Component({
  selector: 'page-order-details',
  templateUrl: 'details.html'
})
export class OrderDetailsPage {

  public orderDetails: any = {
    orderId: '',
    orderStatus: 0,
    carTypeName: '',
    color: '',
    vin: '',
    discount: '',
    createTime : '',
    orderDetailList: [{baseMasterUrl:'', productName:'', buyNum: 0, productPrice: '', }],
    totalPrice: 0,
    discountPrice: 0,
    actualPrice: 0,
    createUserName: ''
  };

  constructor(public navParams: NavParams,
              public orderService: OrderService,
              public nativeService: NativeService,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.orderDetails = this.navParams.get("item");
    let discount;
    switch (this.orderDetails.discount){
      case 1:
        discount = "无";
        break;
      case 0.95:
        discount = "9.5折";
        break;
      case 0.9:
        discount = "9折";
        break;
      case 0.85:
        discount = "8.5折";
        break;
      case 0.8:
        discount = "8折";
        break;
      case 0.75:
        discount = "7.5折";
        break;
      case 0.7:
        discount = "7折";
        break;
      case 0.65:
        discount = "6.5折";
        break;
      case 0.6:
        discount = "6折";
        break;
      case 0.55:
        discount = "5.5折";
        break;
      case 0.5:
        discount = "5折";
        break;
      case 0.45:
        discount = "4.5折";
        break;
      case 0.4:
        discount = "4折";
        break;
      case 0.35:
        discount = "3.5折";
        break;
      case 0.3:
        discount = "3折";
        break;
      case 0.25:
        discount = "2.5折";
        break;
      case 0.2:
        discount = "2折";
        break;
      case 0.15:
        discount = "1.5折";
        break;
      case 0.1:
        discount = "1折";
        break;
      case 0:
        discount = "0折";
        break;
    }
    this.orderDetails.discount = discount;
  }

  /**
   * 签字
   * */
  signature(){
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择签字类型',
      buttons: [
        {
          text: '客户签字',
          role: 'destructive',
          handler: () => {
            let modal = this.modalCtrl.create(SignaturePadRPage, {}, {});
            modal.present();
            modal.onDidDismiss(data => {
              if (data != null) {
                this.orderService.uploadOrderSignature({
                  imageStr: data,
                  orderSignType : 1,
                  orderId: this.orderDetails.orderId
                }).subscribe(r => {
                  if (r.ret) {
                    this.nativeService.alertTip("客户签字已上传.");
                  } else {
                    this.nativeService.alertTip(r.data[0].message);
                  }
                });
              }
            });
          }
        },
        {
          text: '经理签字',
          handler: () => {
            let modal = this.modalCtrl.create(SignaturePadRPage, {}, {});
            modal.present();
            modal.onDidDismiss(data => {
              if (data != null) {
                this.orderService.uploadOrderSignature({
                  imageStr: data,
                  orderSignType: 2,
                  orderId: this.orderDetails.orderId
                }).subscribe(r => {
                  if (r.ret) {
                    this.nativeService.alertTip("经理签字已上传.");
                  } else {
                    this.nativeService.alertTip(r.data[0].message);
                  }
                });
              }
            });
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
}
