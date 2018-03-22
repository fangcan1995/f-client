import React from 'react';
import './bbhAlert.less';
import { Button,Alert } from 'antd';
export default class BbhAlert extends React.Component{
    /*constructor(props){
        super(props);
    }*/
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
