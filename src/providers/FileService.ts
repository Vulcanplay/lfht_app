import {Injectable} from "@angular/core";
import {HttpService} from "./HttpService";
import {FILE_SERVE_URL} from "./Constants";
import {FileObj} from "../model/FileObj";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {NativeService} from "./NativeService";

/**
 * 上传图片到文件服务器
 */
@Injectable()
export class FileService {
  constructor(private httpService: HttpService, private nativeService: NativeService) {
  }

  /**
   * 根据文件id获取文件信息
   * @param id
   * @returns {FileObj}
   */
  getFileInfoById(id: string): Observable<FileObj> {
    if (!id) {
      return Observable.of({});
    }
    return this.httpService.get(FILE_SERVE_URL + '/getById', {id: id}).map((res: Response) => {
      let result = res.json();
      if (!result.success) {
        this.nativeService.alert(result.msg);
        return {};
      } else {
        let fileObj = result.data;
        fileObj.origPath = FILE_SERVE_URL + fileObj.origPath;
        fileObj.thumbPath = FILE_SERVE_URL + fileObj.thumbPath;
        return fileObj;
      }
    });
  }

  /**
   * 根据文件id数组获取文件信息
   * @param ids
   * @returns {FileObj[]}
   */
  getFileInfoByIds(ids: string[]): Observable<FileObj[]> {
    if (!ids || ids.length == 0) {
      return Observable.of([]);
    }
    return this.httpService.get(FILE_SERVE_URL + '/getByIds', {ids: ids}).map((res: Response) => {
      let result = res.json();
      if (!result.success) {
        this.nativeService.alert(result.msg);
        return [];
      } else {
        for (let fileObj of result.data) {
          fileObj.origPath = FILE_SERVE_URL + fileObj.origPath;
          fileObj.thumbPath = FILE_SERVE_URL + fileObj.thumbPath;
        }
        return result.data;
      }
    });
  }

  /**
   * 批量上传图片,只支持上传base64字符串
   * @param fileObjList 数组中的对象必须包含bse64属性
   * @returns {FileObj[]}
   */
  uploadMultiByBase64(fileObjList: FileObj[]): Observable<FileObj[]> {
    if (!fileObjList || fileObjList.length == 0) {
      return Observable.of([]);
    }
    return this.httpService.post(FILE_SERVE_URL + '/appUpload?directory=liveWork', fileObjList).map((res: Response) => {
      let result = res.json();
      if (!result.success) {
        this.nativeService.alert(result.msg);
        return [];
      } else {
        for (let fileObj of result.data) {
          fileObj.origPath = FILE_SERVE_URL + fileObj.origPath;
          fileObj.thumbPath = FILE_SERVE_URL + fileObj.thumbPath;
        }
        return result.data;
      }
    });
  }

  /**
   * 上传单张图片,只支持上传base64字符串
   * @param fileObj 对象必须包含origPath属性
   * @returns {FileObj}
   */
  uploadByBase64(fileObj: FileObj): Observable<FileObj> {
    if (!fileObj.base64) {
      return Observable.of({});
    }
    return this.httpService.post(FILE_SERVE_URL + '/appUpload?directory=liveWork', [fileObj]).map((res: Response) => {
      let result = res.json();
      if (!result.success) {
        this.nativeService.alert(result.msg);
        return [];
      } else {
        let fileObj = result.data[0];
        fileObj.origPath = FILE_SERVE_URL + fileObj.origPath;
        fileObj.thumbPath = FILE_SERVE_URL + fileObj.thumbPath;
        return fileObj;
      }
    });
  }

  /**
   * 批量上传图片
   * @param fileObjList 数组中的对象必须包含origPath属性
   * @returns {FileObj[]}
   */
  uploadMultiByFilePath(fileObjList: FileObj[]): Observable<FileObj[]> {
    if (fileObjList.length == 0) {
      return Observable.of([]);
    }
    return Observable.create((observer) => {
      this.nativeService.showLoading();
      let fileObjs = [];
      for (let fileObj of fileObjList) {
        this.nativeService.convertImgToBase64(fileObj.origPath).subscribe(base64 => {
          fileObjs.push({
            'base64': base64,
            'type': FileService.getFileType(fileObj.origPath),
            'parameter': fileObj.parameter
          });
          if (fileObjs.length === fileObjList.length) {
            this.uploadMultiByBase64(fileObjs).subscribe(res => {
              observer.next(res);
              this.nativeService.hideLoading();
            })
          }
        })
      }
    });
  }

  /**
   * app上传单张图片
   * @param fileObj 对象必须包含origPath属性
   * @returns {FileObj}
   */
  uploadByFilePath(fileObj: FileObj): Observable<FileObj> {
    if (!fileObj.origPath) {
      return Observable.of({});
    }
    return Observable.create((observer) => {
      this.nativeService.showLoading();
      this.nativeService.convertImgToBase64(fileObj.origPath).subscribe(base64 => {
        let file = <FileObj>({
          'base64': base64,
          'type': FileService.getFileType(fileObj.origPath),
          'parameter': fileObj.parameter
        });
        this.uploadByBase64(file).subscribe(res => {
          observer.next(res);
          this.nativeService.hideLoading();
        })
      })
    });
  }

  private static getFileType(path: string): string {
    return path.substring(path.lastIndexOf('.') + 1);
  }

}
