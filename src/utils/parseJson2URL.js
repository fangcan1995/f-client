const parseJson2URL = params => {
  let paramStr = '';
  let mappingOperator = '=';
  let separator = '&';
  for ( let key in params ) {
    let value = params[key];
    if ( value != null && value != '' ) {
      if ( typeof value === 'string' || value instanceof Number || typeof value === 'number' || value instanceof Boolean || typeof value === 'boolean' ) {
        paramStr += key + mappingOperator + value + separator;
      } else if ( typeof value === 'object' ) {
        paramStr += key + mappingOperator + JSON.stringify(value) + separator;
      }
    }
  }
  paramStr = paramStr.substring(0, paramStr.length - 1);
  return paramStr;
};

export default parseJson2URL;