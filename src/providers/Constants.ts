let tag = true;
/*----------------------------------------后台Api地址----------------------------------------*/
export const APP_SERVE_URL = tag ? 'http://140.143.135.118/lfht_admin/app/' : 'http://192.168.0.149:8080/lfht_admin/app/';

/*----------------------------------------文件服务器地址----------------------------------------*/
export const FILE_SERVE_URL = '';//文件服务:测试环境

/*----------------------------------------app版本升级服务地址----------------------------------------*/
export const APP_VERSION_SERVE_URL = '';//app版本升级服务;测试环境,查询app最新版本号,更新日志等信息.

export const IS_DEBUG = true;//是否开发(调试)模式

export const DEFAULT_AVATAR = './assets/img/avatar.png';//用户默认头像
export const PAGE_SIZE = 5;//默认分页大小
export const IMAGE_SIZE = 512;//拍照/从相册选择照片压缩大小
export const QUALITY_SIZE = 95;//图像压缩质量，范围为0 - 100
export const REQUEST_TIMEOUT = 99999;//请求超时时间,单位为毫秒
export const SYNC_TIMEOUT = 30000;//请求超时时间,单位为毫秒

export const SIGN_IN_TO_MINE = 1;
export const SIGN_IN_TO_ORDER = 2;
export const SIGN_IN_TO_DISMISS = 3;

export const SHOPPING_CART = 1;
export const PRODUCT_DETAILS = 2;

export const ENABLE_FUNDEBUG = true;//是否启用fundebug日志监控
export const FUNDEBUG_API_KEY = '027c813c0197d66139ece1fa3496dfc9514afd7f090074c8be5be7ce045bd820';//去https://fundebug.com/申请key

export const APK_DOWNLOAD = '';//android apk下载完整地址,用于android本地升级
export const APP_DOWNLOAD = '';//app网页下载地址,用于ios升级或android本地升级失败

export const CODE_PUSH_DEPLOYMENT_KEY = {
  'android':{
    'Production':'Z3WHHJ1pEmTGC4DZke2Cf2EMvgttca148115-d117-4803-ad6a-e042af5f0644',
    'Staging':'raGoEUgNQZyiI3ZY_3S0mYKQ4Xvjca148115-d117-4803-ad6a-e042af5f0644'
  },
  'ios':{
    'Production':'CRxyKvlXoJaXW3s6PoXROuqwoK_1ca148115-d117-4803-ad6a-e042af5f0644',
    'Staging':'6IMEMuYfIhDGwDa_SJPDl25REjtoca148115-d117-4803-ad6a-e042af5f0644'
  }
};


