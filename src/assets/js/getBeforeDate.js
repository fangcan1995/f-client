import React from 'react';

export  function getBeforeDate(n=0) {
    //获得当前日期的前n天的日期
    //let n = n;
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
