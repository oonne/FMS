/**
 * 拼接url参数
 * @return key=value&key1=value1
 */
export function obj2url(params) {
  const result = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return result;
}

/**
 * 获取n位的数字随机数
 */
export function randomn(n) {
  if (n > 21) return null;
  return parseInt((Math.random() + 1) * 10 ** (n - 1), 10);
}

/**
 * 日期格式化
 * @param {date} date
 * @param {string} fmt
 * @returns {string}
 */
export function formatDate(date, format = 'yyyy-MM-dd hh:mm:ss') {
  let fmt = format;
  const options = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length),
    );
  }

  Object.keys(options).forEach((keyItem) => {
    if (new RegExp(`(${keyItem})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? options[keyItem]
          : `00${options[keyItem]}`.substr(`${options[keyItem]}`.length),
      );
    }
  });

  return fmt;
}

/**
 * 执行传入的promise并返回一个数组，方便在async函数中使用await时判断异常
 */
export function to(promise) {
  if (promise instanceof Promise) {
    return promise
      .then((res) => {
        return [null, res];
      })
      .catch((err) => {
        return [err, null];
      });
  }

  return [null, promise];
}
