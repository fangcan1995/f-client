import React  from "react";
import { Link } from 'react-router-dom';

//普通标/债转标切换
export const InvestTab = ({isTransfer, ...rest}) => {
    console.log(' 参数是')
    console.log(isTransfer);
    return (
        <div className="tablist">
            <div className="tabs__nav">
                <Link to="/invest-list" className={((isTransfer===false)?`tab tab--active`:`tab`)}>散标</Link>
                <Link to="/transfer-list" className={((isTransfer===true)?`tab tab--active`:`tab`)}>债权</Link>
            </div>
        </div>
    )
}
//进度条
export const ProgressBar=({value,...rest})=>{
    console.log(' 参数是')
    console.log(value);
    return(
        <dl className="progressbar">
            <dt>
                <div className="finished" style={{width:`${parseInt(value)}%`}}></div>
            </dt>
            <dd><strong>{parseInt(value)}%</strong></dd>
        </dl>
    )
}
//标的状态
export const InvestButton=({status,id,...rest})=>{
    console.log(' 参数是')
    console.log(status);
    let investTitle=``,className=`disabled`;;
    switch(status){
        case 1:
            investTitle=`待发布`;
            break;
        case 2:
            investTitle=`立即投资`;
            className=``;
            break;
        case 3:
            investTitle=`满标待划转`;
            break;
        case 4:
            investTitle=`还款中`;
            break;
        case 6:
            investTitle=`已流标`;
            break;
        case 5:
            investTitle=`已结清`;
            break;
    }
    return(
        <Link to={`/invest-detail/${id}`} className={`btn ${className}`}>{investTitle}</Link>
    )
}
