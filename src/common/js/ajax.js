/**
 * @Desc:   封装axios,用于发起网络请求
 */
import axios from 'axios';

export default function (url = '', data = {}, type = 'GET', config = {}) {
  return new Promise((resolve, reject) => {
    let promise;
    const ts = (Date.parse(new Date()) / 1000).toString();
    const random = Math.random()
      .toString()
      .slice(-6);
    data.seqId = `${ts}${random}`;
    if (type.toUpperCase() === 'GET') {
      promise = axios.get(url, Object.assign({ params: data }, config));
    } else if (type.toUpperCase() === 'DELETE') {
      promise = axios.delete(url, Object.assign({ params: data }, config));
    } else if (type.toUpperCase() === 'PUT') {
      promise = axios.put(url, data, config);
    } else {
      promise = axios.post(url, data, config);
    }
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
