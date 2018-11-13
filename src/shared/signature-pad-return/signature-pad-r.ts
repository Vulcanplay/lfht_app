import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from "ionic-angular";
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'page-modal-signature-pad-r',
  templateUrl: 'signature-pad-r.html'
})
export class SignaturePadRPage {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: Object = {};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
    this.signaturePadOptions = {
      minWidth: 1,
      maxWidth: 5,
    }
    this.signaturePad.resizeCanvas();
  }
  clear() {
    this.signaturePad.clear();
  }
  save() {
    if (!this.signaturePad.isEmpty()) {
      this.viewCtrl.dismiss(this.signaturePad.toDataURL('image/png'));
    } else {
      this.alertTip('请签字');
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  alertTip(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }
}
