import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "../../../providers/HttpService";
import { Result } from "../../../model/Result";

@Injectable()
export class SignInService {
  constructor(public httpServices: HttpService) {}

  /**
   * 登陆
   * */
  signIn(user): Observable<(Result)> {
    return this.httpServices.post('login.do', user).map(r => r.json());
  }

  /**
   * 登出
   * */
  signOut(): Observable<(Result)> {
    return this.httpServices.postToken('logout.do', {}).map(r => r.json());
  }

  /**
   * 查购物车数量
   * */
  cart(): Observable<(Result)> {
    return this.httpServices.postToken('selectShoppingAmt.do', {}).map(r => r.json());
  }
}
