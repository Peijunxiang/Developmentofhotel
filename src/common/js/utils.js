/**
 * @Author: v_mmma
 * @Date:   201-07-04
 * @Email:  v_mmma@tencent.com
 * @Desc:   format datas
 */

const menuConfig = {
  isDev: process.env.NODE_ENV === 'development',
  notShowMenu: [''], // 新功能上线时可以设为''
};
/**
 * 根据分页信息过滤数组
 * @data {Array} 原数组
 * @pagesize {Number} 每页显示的数量
 * @currentIndex {Number} 当前页
 * @res {Array}
 */
export const filterData = (data, pagesize, currentIndex) => {
  let res = [];
  const total = data.length;
  if (total > pagesize) {
    const start = (currentIndex - 1) * pagesize;
    const end = currentIndex * pagesize;
    res = data.slice(start, end);
  } else {
    res = data;
  }
  return res;
};

export const hasChild = item => item.children && item.children.length !== 0;

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */

export const getMenuByRouter = (list) => {
  const res = [];
  list.forEach((item) => { // 开发环境显示新菜单功能
    if (item.meta && (menuConfig.isDev || menuConfig.notShowMenu.indexOf(item.name) < 0) && !item.meta.hideInMenu) {
      const obj = {
        icon: (item.meta && item.meta.icon) || '',
        title: (item.meta && item.meta.title) || '',
        name: item.name,
        meta: item.meta,
      };
      if (hasChild(item)) {
        obj.children = getMenuByRouter(item.children);
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href;
      if (item) res.push(obj);
    }
  });
  return res;
};
/**
 * 生成随机的uuid
 */
export const uuid = () => {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = '-';
  s[13] = '-';
  s[18] = '-';
  s[23] = '-';
  return s.join('');
};
