import StandardError from 'standard-error';
// 超时版的fetch
function _fetch(fetch, timeout = Infinity) {
  return Promise.race([
    fetch,
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(new StandardError({
        statusCode: -1,
        msg: '请求超时',
      })), timeout);
    })
  ]);
}

export default _fetch;