import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {HttpService} from "../../providers/HttpService";
import {NativeService} from "../../providers/NativeService";
import {Logger} from "../../providers/Logger";
import {Utils} from "../../providers/Utils";

/**
 *
 */
@Injectable()
export class CommonService {
  constructor(public httpService: HttpService, public nativeService: NativeService, public logger: Logger) {
  }


  /**
   * 登录获取token
   */
  getToken(username, password) {
    return this.httpService.post('/v1/login', {
      'client_id': 'app',
      'username': username,
      'password': Utils.hex_md5(password)
    });
  }

  /**
   * 查询用户信息
   */
  getUserInfo() {
    return this.httpService.get('/v1/public/user/self');
  }


  /**
   * 获取新token
   */
  getNewToken() {
    return this.httpService.post('/v1/refresh_token');
  }


}
