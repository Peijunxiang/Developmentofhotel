/**
 * 四舍五入，并返回格式化的字符串
 * 支持保留n位小数，n>=0，如 round(1.325, 2)=1.33
 * 支持格式化字符串时取出末尾的0，如round(1.109, 2, true)=1.1
 * @param {any} x 原数字
 *                如果n不是合法数字或者无法转换为合法数字，roundStr结果返回''
 * @param {any} n 保留几位小数，默认0
 *                如果n不是合法数字或者无法转换为合法数字，roundStr结果返回''
 *                如果n小于0，roundStr结果返回''
 *                如果n的值包含小数部分，roundStr处理时只关注n的整数部分值
 * @param {boolean} removeTrailingZero 是否移除字符串末尾的无效数字0
 * @returns {string} 返回四舍五入后的字符串，异常情况下返回空字符串''
 */
const roundStr = (x, n = 2, removeTrailingZero = false) => {
  let xNum = Number(x); // x转换为数字
  const nNum = Math.floor(Number(n)); // n转换为数字，且只保留整数部分

  // 异常情况，返回''
  if (isNaN(xNum) || isNaN(nNum) || nNum < 0) return '';

  // 仅保留整数的情况
  if (nNum === 0) return Math.round(xNum);

  // 保留n位小数的情况
  const xStr = xNum.toString();
  const rexExp = new RegExp(`\\.\\d{${nNum}}5`);

  // 1. 大部分情况下，四舍五入使用Number.toFixed即可
  // 2. 然而，Number.toFixed方法在某些情况下对第n+1位是5的四舍五入存在问题，如1.325保留2小数时结果为1.32（期望为1.33）
  //    对此种情况下，有两种处理方式：
  //    2.1 先扩大10^n倍，舍掉小数部分取整数部分，然后加1，最后缩小10^n倍
  //        但此种情况下，不能处理过大的数字，也不能处理保留小数位数过多的情况，会可能导致数字超过Infinity
  //    2.2 Number.toFixed是四舍6入，对于第n+1位是5的情况，增加2*10^(-n-1)，保证满足第n+1位>6
  //        增加2*10^(-n-1)而不是增加1*10^(-n-1)是因为后者不能保证第n+1位>=6，例如1.325+0.001=1.32599999...第n+1位仍然为5
  // 此处，采用2.2方式，解决Number.toFixed的问题，又能避免2.1方式中数字超过Infinity的问题
  if (rexExp.test(xStr)) { // 情况2，处理方式2.1：如果小数部分第n+1位是5，增加2*10^(-n-1)
    xNum += 2 * (10 ** (-nNum - 1));
  }

  const str = xNum.toFixed(nNum);
  if (!removeTrailingZero) return str;

  // 去除末尾的0
  if (/^\d+\.0*$/.test(str)) { // 小数部分全是0
    return str.replace(/^(\d+)(\.0*)$/, (_m, s1) => s1);
  }
  return str.replace(/^(\d+\.\d*[1-9]{1})(0*)$/, (_m, s1) => s1);
};

/**
 * @function
 * @description 金额转换 分 => 元
 * @param {String|Number} cent 数额（分）
 * @param {Number} fixedLength 保留几位小数
 * @param {Boolean} removeTrailingZero 是否移除末尾的0
 * @return {String} yuan 数额（元）
 */
function centToYuan(cent, fixedLength = 2, removeTrailingZero = true) {
  return roundStr(parseInt(String(cent), 10) / 100, fixedLength, removeTrailingZero);
}
/**
 * 金额转换 元 => 分
 * @param {*} yuan
 * @returns {Number} 分
 */
function yuanToCent(yuan) {
  const numYuan = Number(yuan);
  return parseInt(numYuan * 100, 10);
}

export {
  centToYuan,
  yuanToCent,
};
