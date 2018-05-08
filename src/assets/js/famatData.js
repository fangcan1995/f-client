import React from 'react';
export  function toMoney(value){
    const len=2;
    const comma=false;
    const patrn = /^(-)?\d+(\.\d+)?$/;
    //数值不合法时返回0
    if (patrn.exec(value) == null || value == "" || value == 0) {
        if(len>0){
            return '0.00';
        }else{
            return 0;
        }
    } else{
        value=parseFloat(value);
    }
    value = value.toFixed(len);

    value = parseFloat(value);
    if(comma){
        value = value.toLocaleString();
    }else{
        value = value.toString();
    }
    //补位小数点
    if(len>0){
        let ws='';
        if(value.indexOf(".") != -1 ){
            ws=Array(len-(value.split(".")[1].length)).join( '0' );
        }else{
            ws='.'+Array(len).join( '00' );

        };
        value=value+ws;
    }

    return value;
}

export  function toNumber(value){
    const patrn = /^(-)?\d?$/;
    if (patrn.exec(value) == null || value == "" || value == 0) {
        return '0';
    } else{
        value=parseInt(value);
        return value;
    }
}

//金额格式化,小数点前三位加个逗号，2为小数点
export  function addCommas(nStr){
    nStr += '';//改变成字符串
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1].substring(0,2) : '.00';  //小数点超出2位，只保留两位，没有小数点后补.00
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}