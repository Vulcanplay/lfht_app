import {Injectable} from "@angular/core";
import {NativeService} from "./NativeService";
/*import {JPush} from "../../typings/modules/jpush/index";*/
import {Observable} from "rxjs";
import {DEFAULT_AVATAR, APP_VERSION_SERVE_URL} from "./Constants";
import {FileService} from "./FileService";
import {FileObj} from "../model/FileObj";
import {Http, Response} from "@angular/http";
import {Utils} from "./Utils";
import {Logger} from "./Logger";
import {AlertController} from "ionic-angular";
import * as fundebug from "fundebug-javascript";

/**
 * Helper类存放和业务有关的公共方法
 * @description
 */
@Injectable()
export class Helper {

  constructor(/*private jPush: JPush,*/
              private http: Http,
              public logger: Logger,
              private alertCtrl: AlertController,
              private fileService: FileService,
              private nativeService: NativeService) {
  }

  funDebugInit() {
    if (this.nativeService.isMobile()) {
      this.nativeService.getVersionNumber().subscribe(version => {
        fundebug.appversion = version;
      })
    }
  }
  /**
   * 断言app是否需要更新
   * @returns {any}
   */
  assertUpgrade(): Observable<any> {
    if (!this.nativeService.isMobile()) {
      return Observable.of({update: false, msg: '请使用真机调试'});
    }
    return Observable.create(observer => {
      this.nativeService.getPackageName().subscribe(packageName => {//获得app包名
        let appName = packageName.substring(packageName.lastIndexOf('.') + 1);
        let appType = this.nativeService.isAndroid() ? 'android' : 'ios';
        let url = Utils.formatUrl(`${APP_VERSION_SERVE_URL}/app/${appName}/${appType}/latest/version`);
        this.http.get(url).map((res: Response) => res.json()).subscribe(res => {//从后台查询app最新版本信息
          if (!res) {
            observer.next({update: false, msg: '暂无更新信息'});
            return;
          }
          this.nativeService.getVersionNumber().subscribe(currentNo => {//获得当前app版本
            if (currentNo == res.version) {//比较版本号
              observer.next({update: false, msg: '已经是最新版本'});
            } else {
              if (res.isForcedUpdate == 1) {//判断是否强制更新
                this.alertCtrl.create({
                  title: '重要升级',
                  subTitle: '您必须升级后才能使用！',
                  enableBackdropDismiss: false,
                  buttons: [{
                    text: '确定', handler: () => {
                      observer.next({update: true, msg: ''});
                    }
                  }
                  ]
                }).present();
              } else {
                this.alertCtrl.create({
                  title: '升级',
                  subTitle: '发现新版本,是否立即升级？',
                  enableBackdropDismiss: false,
                  buttons: [
                    {
                      text: '取消', handler: () => {
                      observer.next({update: false, msg: ''});
                    }
                    },
                    {
                      text: '确定', handler: () => {
                      observer.next({update: true, msg: ''});
                    }
                    }
                  ]
                }).present();
              }
            }
          })
        }, err => {
          this.logger.log(err, '从版本升级服务获取版本信息失败', {
            url: url
          })
        })
      })
    });


  }

  /**
   * 获取用户头像路径
   * @param avatarId
   * @returns {any}
   */
  loadAvatarPath(avatarId) {
    return Observable.create(observer => {
      if (!avatarId) {
        observer.next(DEFAULT_AVATAR);
      } else {
        this.fileService.getFileInfoById(avatarId).subscribe((res: FileObj) => {
          if (res.origPath) {
            let avatarPath = res.origPath;
            observer.next(avatarPath);
          } else {
            observer.next(DEFAULT_AVATAR);
          }
        }, () => {
          observer.next(DEFAULT_AVATAR);
        })
      }
    });
  }
  /*JPlus
  initJpush() {
    if (!this.nativeService.isMobile()) {
      return;
    }
    this.jPush.init();
    if (this.nativeService.isIos()) {
      this.jPush.setDebugModeFromIos();
    } else {
      this.jPush.setDebugMode(true);
    }

    this.jPushAddEventListener();
  }

  private jPushAddEventListener() {
    this.jPush.getUserNotificationSettings().then(result => {
      if (result == 0) {
        console.log('系统设置中已关闭应用推送');
      } else if (result > 0) {
        console.log('系统设置中打开了应用推送');
      }
    });

    //点击通知进入应用程序时会触发的事件
    document.addEventListener("jpush.openNotification", event => {
      //  window['plugins'].jPushPlugin.resetBadge();
      let content = this.nativeService.isIos() ? event['aps'].alert : event['alert'];
      console.log("jpush.openNotification" + content);
    }, false);

    //收到通知时会触发该事件
    document.addEventListener("jpush.receiveNotification", event => {
      let content = this.nativeService.isIos() ? event['aps'].alert : event['alert'];
      console.log("jpush.receiveNotification" + content);
    }, false);

    //收到自定义消息时触发这个事件
    document.addEventListener("jpush.receiveMessage", event => {
      let message = this.nativeService.isIos() ? event['content'] : event['message'];
      console.log("jpush.receiveMessage" + message);
    }, false);


    //设置标签/别名回调函数
    document.addEventListener("jpush.setTagsWithAlias", event => {
      console.log("onTagsWithAlias");
      let result = "result code:" + event['resultCode'] + " ";
      result += "tags:" + event['tags'] + " ";
      result += "alias:" + event['alias'] + " ";
      console.log(result);
    }, false);

  }

  //设置标签
  setTags() {
    if (!this.nativeService.isMobile()) {
      return;
    }
    let tags = [];
    if (this.nativeService.isAndroid()) {
      tags.push('android');
    }
    if (this.nativeService.isIos()) {
      tags.push('ios');
    }
    console.log('设置setTags:' + tags);
    this.jPush.setTags(tags);
  }

  //设置别名,一个用户只有一个别名
  setAlias(userId) {
    if (!this.nativeService.isMobile()) {
      return;
    }
    console.log('设置setAlias:' + userId);
    this.jPush.setAlias('' + userId);////ios设置setAlias有bug,值必须为string类型,不能是number
  }

  setTagsWithAlias(userId) {
    if (!this.nativeService.isMobile()) {
      return;
    }
    console.log('设置setTagsWithAlias:' + userId);
    this.jPush.setTagsWithAlias(['man', 'test'], '' + userId);
  }
  */
}
