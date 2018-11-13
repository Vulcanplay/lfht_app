import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import {Observable} from "rxjs/Observable";
import {Result} from "../../model/Result";

@Injectable()
export class MineService {
  constructor(public httpServices: HttpService) {
  }

}
