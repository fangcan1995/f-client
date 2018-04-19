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