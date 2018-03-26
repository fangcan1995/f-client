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

export function toDefinedString(value) {
    if(value){return value
    }else {
        return ``
    }
}