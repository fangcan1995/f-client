import React from 'react';


//获取当前时间，格式YYYY-MM-DD
export  function getNowFormatDate(separator) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentDate = year + separator + month + separator + strDate;
    return currentDate;
}

//获得当前日期的前n天的日期
export  function getBeforeDate(n=0) {
    let d = new Date();
    let year = d.getFullYear();
    let mon=d.getMonth()+1;
    let day=d.getDate();
    if(day <= n){
        if(mon>1) {
            mon=mon-1;
        }
        else {
            year = year-1;
            mon = 12;
        }
    }
    d.setDate(d.getDate()-n);
    year = d.getFullYear();
    mon=d.getMonth()+1;
    day=d.getDate();
    let s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
    return s;
}