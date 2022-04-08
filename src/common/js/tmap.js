/**
 * @Author: v_mmma
 * @Date:   201-07-04
 * @Email:  v_mmma@tencent.com
 * @Desc:   页面引入地图相关的js
 */
export default function TMap() {
  const key = 'SQRBZ-5BOR2-MG7UF-CSLLB-R7CLO-JABRC';
  return new Promise((resolve, reject) => {
    window.init = function () {
      // eslint-disable-next-line no-undef
      resolve(qq); // 注意这里
    };
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `http://map.qq.com/api/js?v=2.exp&callback=init&key=${key}`; // + "&libraries=drawing,geometry,autocomplete,convertor";
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
