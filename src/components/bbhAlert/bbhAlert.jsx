import React from 'react';
import './bbhAlert.less';
import { Button,Alert } from 'antd';
export  class BbhAlert extends React.Component{
    render(){
        let {info}=this.props;
        console.log('话术是');
        console.log(info);
        return(
            <div className="form__wrapper">
                <Alert
                    message={info.message}
                    description={info.description}
                    type={info.type}
                    showIcon
                />
                <div className="form__bar center" style={{marginTop:'30px'}}>
                    <Button type="primary" className='pop__large'  onClick={() => info.callback() }>确定</Button>
                </div>

            </div>
        )
    }
}
export  class Loading extends React.Component{
    render(){
        let {isShow}=this.props;
        return(
            <div className="tips_loading">
                {(isShow===true)?
                    `数据加载中...`
                    :``
                }
            </div>
        )
    }
}
export  class Posting extends React.Component{
    render(){
        let {isShow}=this.props;
        return(
            <p className="tips_posting">
                {(isShow===true)?
                    `提交中，请稍候...`
                    :``
                }
            </p>
        )
    }
}
export  class NoRecord extends React.Component{
    render(){
        let {isShow,title}=this.props;
        return(
            <div className="tips_noRecord">
                {(isShow===true)?
                <div>
                    <div className="iconfont icon-noRecord"></div>
                    {(!title)?<p>暂无记录</p>:<p>{title}</p>}

                </div>
                    :``
                }
            </div>
        )
    }
}
export  class Page404 extends React.Component{
    render(){
        let {isShow}=this.props;
        return(
            <div className="tips_404">
                        <img src={require('../../assets/images/public/404.png')} />
                            <h2>很抱歉，您访问的页面不在地球上...</h2>
                          {/*  <p><img  src={require('../../assets/images/public/loading.gif')} />正在自动跳转到上一页，如没有跳转请点击此链接</p>*/}
                            <p>
                                <a href="/">返回首页</a>
                                <a href="javascript:window.history.go(-1)">返回上一页</a>
                            </p>
            </div>

        )
    }
}