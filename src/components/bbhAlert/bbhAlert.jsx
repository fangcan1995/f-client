import React from 'react';
import './bbhAlert.less';
import { Button,Alert } from 'antd';
export  class BbhAlert extends React.Component{
    render(){
        let {info}=this.props;
        return(
            <div className="form__wrapper">
                <Alert
                    message={info.messsage}
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
                    `页面加载中...`
                    :``
                }
            </div>
        )
    }
}
export  class NoRecord extends React.Component{
    render(){
        let {isShow,title}=this.props;
        return(
            <div className="tips_noRecord">
                {(isShow===true)?
                    (!title)?`暂无记录`:`${title}`

                    :``
                }
            </div>
        )
    }
}