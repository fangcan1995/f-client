import React ,{ Component } from "react";
import {getTips} from '../../utils/famatData';
import {Icon} from 'antd';
import { Link,withRouter } from 'react-router-dom';
/*let title,content,url,code,icon,allowGoOn;*/
let t;
class PayAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeOut: ``,
            title:``,
            content:``,
            url:``,
            code:``,
            icon:``,
            allowGoOn:``
        };
    }

    componentWillMount() {
        const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
        let title = pathSnippets[3];
        let content= pathSnippets[4];
        let url= pathSnippets[5];
        let icon=``;

        if(title=='success'){
            icon=<Icon type="check-circle-o" style={{color:`#00a854`,fontSize:`86px` }} />;

       }else if(title=='fail'){
            icon=<Icon type="close-circle-o" style={{color:`#ff6666`,fontSize:`86px` }} />;
        }else{
            icon=``;
        }
        let code=getTips(content).code;
        let allowGoOn=getTips(content).allowGoOn;

        this.setState({
            timeOut:5,
            title:title,
            content:content,
            url:url,
            icon:icon,
            code:code,
            allowGoOn:allowGoOn,
        })
    }
    componentDidMount() {
        if(this.state.allowGoOn){
            t=window.setTimeout(()=>{
                window.location.href='/'+this.state.url.replace(/_/g, "/");
            }, 5000);
        }
    }

    componentWillUnmount(){
        //清除定时器
        window.clearTimeout(t);
    }

    render(){
        if(this.state.allowGoOn && this.state.timeOut && this.state.timeOut>0){
            let timeOut=this.state.timeOut;
            setTimeout(()=>{
                this.setState({
                    timeOut:timeOut-1,
                });
            }, 1000);
        }
        return(
            <main className="main" className={this.state.title}>
                <div className="wrapper" style={{ paddingTop:`100px`,textAlign:`center`}}>
                    {this.state.icon}
                </div>
                <div className="wrapper" style={{ fontSize:`24px`,textAlign:`center`,paddingTop:`40px`}}>
                    {getTips(this.state.content).message}
                </div>
                {this.state.allowGoOn?
                    <div className="wrapper" style={{ fontSize:`16px`,textAlign:`center`,paddingTop:`40px`}}>
                        <p>{this.state.timeOut}秒后页面将自动跳转</p>
                    </div>
                    :``
                }
            </main>
            )

    }
}
export  default  withRouter(PayAccount)