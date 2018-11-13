import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { NativeService } from "../../../providers/NativeService";
import { OrderService } from "../OrderService";
import {SignaturePadRPage} from "../../../shared/signature-pad-return/signature-pad-r";

declare var Swiper;
declare var MCanvas;

@Component({
  selector: 'page-signature-for-order',
  templateUrl: 'signature.html'
})
export class SignatureForOrderPage {
  @ViewChild('panel') panel: ElementRef;
  initialSlide: number = 0;
  picturePaths: string[] = [];

  //canvas参数
  public options = {
    //图片原始宽度
    naturalWidth: '',
    //图片原始高度
    naturalHeight: '',
    // 签名的宽度值，相对于画布；
    //example: width: 100 / '100%' / '100px'
    canvasSignatureWidth: '30%',
    // 相对于画布的坐标点，原点为左上点;
    // example：
    // x: 250 / '250px' / '100%' / 'left:250' / 'center',
    x:'',
    y:'',
  };

  // 要打印的图片路径
  beforePath:string = '';
  // 打印后的图片路径
  afterPath:string = '';
  constructor(public navCtrl: NavController,
              public orderService: OrderService,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              public nativeService: NativeService) {
  }


  ionViewDidLoad() {
    new Swiper(this.panel.nativeElement, {
      initialSlide: this.initialSlide,        //初始化显示第几个
      zoom: true,                             //双击,手势缩放
      loop: false,                            //循环切换
      lazyLoading: true,                      //延迟加载
      lazyLoadingOnTransitionStart: true,     // lazyLoadingInPrevNext : true,
      pagination: '.swiper-pagination',       //分页器
      paginationType: 'fraction',             //分页器类型
      onClick: ()=>{

      }
    });
    this.initialSlide = this.navParams.get('initialSlide');
    this.picturePaths = this.navParams.get('picturePaths');
    this.signatureInit();
  }

  /**
   * @SignatureRPage
   * 签字初始化
   * */
  signatureInit() {
    let self = this;
    self.beforePath = self.picturePaths[0];
    self.nativeService.showLoading();
    let image = new Image();
    image.src = self.beforePath;
    //加载完成回调
    image.onload = function(){
      self.options.naturalWidth = image.width.toString();
      self.options.naturalHeight = image.height.toString();
      self.options.x = (image.width * 0.2).toString();
      self.options.y = (image.height * 0.45).toString();
      self.nativeService.hideLoading();
    }
  }

  /**
   * @mCanvas
   * 合成
   * */
  signatureCompose(){
    let modal = this.modalCtrl.create(SignaturePadRPage, {}, {
    });
    let self = this;
    modal.present();
    modal.onDidDismiss(data => {
      //实例化合成图片
      let mc = new MCanvas(self.options.naturalWidth, self.options.naturalHeight);
      //遮罩
      self.nativeService.showLoading("正在处理");
      //添加设置底图
      mc.background(self.beforePath,{
        // 绘制方式: origin / crop / contain
        // origin : 原图模式，画布与背景图大小一致，忽略初始化传入的画布宽高；忽略 left/top值；
        // crop : 裁剪模式，背景图自适应铺满画布，多余部分裁剪；可通过 left/top值控制裁剪部分；
        // contain : 包含模式, 类似于 background-size:contain; 可通过left/top值进行位置的控制；
        type:'origin',

        // 背景图片距离画布左上角的距离，
        // 均可填入 0%/50%/ 100%
        // 0% ： 居左裁剪； 50% ：代表居中裁剪； 100% ： 代表居右裁剪
        left:'0%',
        top:0,

        // 除了背景图外的颜色，仅在 type:contain时可见；
        color:'#000000',
      });
      //添加设置签名
      mc.add(data, {
        width: self.options.canvasSignatureWidth,
        // 裁剪系数，相对于素材图；
        // crop params;
        crop:{
          // 相对于素材图的坐标点，原点为左上点；
          x:0,
          y:0,
          // 需要裁剪的宽高, example:100/'100%'/'100px'；
          // 内部有做最大值的判断；
          width:'100%',
          height:'100%',
        },
        // 位置系数，相对于画布；
        pos:{
          // 相对于画布的坐标点，原点为左上点;
          // example：
          // x: 250 / '250px' / '100%' / 'left:250' / 'center',
          x: self.options.x,
          y: self.options.y,

          // 素材放大值，会叠加 width 值，进行进一步基于中心点放大；
          scale:1,

          // 素材旋转角度；
          rotate:0,
        },
      });
      //绘图
      mc.draw({
        type: 'png',
        //  图片质量，对 png 格式无效； 0~1；
        // default: .9;
        quality: 1,
        callback(b64) {
          self.afterPath = b64;
          self.picturePaths[0] = self.afterPath;
          self.nativeService.hideLoading();
        }
      });
    })
    ;
  }
}
