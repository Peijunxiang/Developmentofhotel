/**
 * @file: 请求后端相关接口
 */
import ajax from '../common/js/ajax';

export const commonApiRequest = function (url, params, method = 'GET', config = {}) {
  return new Promise((resolve, reject) => {
    ajax(url, params, method, config)
      .then((res) => {
        if (res.errCode !== 0) {
          reject(res);
        }
        resolve(res.resData);
      })
      .catch((res) => {
        reject(res);
      });
  });
};
