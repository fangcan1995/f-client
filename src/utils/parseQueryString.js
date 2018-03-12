const parseQueryString = url => {
  let obj = {},
      queryStr = url.substr(url.lastIndexOf('?') + 1, url.length),
      arr = queryStr.split('&');
  for ( let i = 0, len = arr.length; i < len; i++ ) {
    let tmp = arr[i].split('=');
    if ( tmp[0].length && typeof tmp[1] != 'undefined' ) {
      obj[tmp[0]] = tmp[1];
    }
  }
  return obj;
}
export default parseQueryString;