import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, ToastController, ViewController} from "ionic-angular";
import {IonDigitKeyboardCmp, IonDigitKeyboardOptions} from "../ion-digit-keyboard";

@Component({
  selector: 'page-modal-payment-password',
  templateUrl: 'payment-password.html'
})
export class PaymentPasswordPage implements OnInit{
  @ViewChild(IonDigitKeyboardCmp) keyboard;

  paymentPassword: string = '';
  focus: string = '';
  ps: number = 0;

  public keyboardSettings: IonDigitKeyboardOptions = {
    align: 'center',
    //width: '85%',
    visible: false,
    rightActionOptions: {
      iconName: 'ios-backspace-outline',
      fontSize: '1.4em'
    },
    roundButtons: false,
    showLetters: false,
    swipeToHide: true,
    // Available themes: IonDigitKeyboard.themes
    theme: 'light'
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public toastCtrl: ToastController) {
  }
  ionViewDidLoad() {
    this.setFocus('paymentPassword');
  }
  ionViewWillLeave() {
    this.keyboard.hide();
  }

  ngOnInit(): void {
    /**
     * Since we want to prevent native keyboard to show up, we put the disabled
     * attribute on the input, and manage focus programmaticaly.
     */
    this.keyboard.onClick.subscribe((key: any) => {
      let field = this.focus;
      if (typeof key == 'number') {
        if (this[field].length < 6){
          this[field] += key;
          this.ps = this[field].length;
        }
        if (this[field].length == 6) this.paymentCommit();
      } else {
        if (key == 'right') this[field] = this[field].substring(0, this[field].length - 1);
        this.ps = this[field].length;
      }
      console.log(this.ps);
    });

    // (BLur) Clear focus field name on keyboard hide
    this.keyboard.onHide.subscribe(() => {
      this.focus = '';
    });
  }

  setFocus(field: string) {
    this.focus = field;
    this.keyboard.show();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  private paymentCommit() {
    let toast = this.toastCtrl.create({
      message: this.paymentPassword.toString(),
      duration: 3000
    });
    toast.present();
    /*this.keyboard.hide(() => {
      // Alert after keyboard get hidden
      alert('"\nPassword: "' + this.paymentPassword + '"')
    });*/
  }

}
