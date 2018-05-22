import React ,{ Component } from "react";
import {formatPostResult,getTips} from '../../utils/famatData';
import {Icon} from 'antd';
let title,content,url,code,icon,allowGoOn;
export  default  class PayAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeOut: ``,
        };
    }

    componentWillMount() {
        const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
        console.log(pathSnippets);
        title = pathSnippets[3];
        content= pathSnippets[4];
        url= pathSnippets[5];

        if(title=='success'){
            icon=<Icon type="check-circle-o" style={{color:`#00a854`,fontSize:`86px` }} />;

       }else if(title=='fail'){
            icon=<Icon type="close-circle-o" style={{color:`#ff6666`,fontSize:`86px` }} />;
        }else{
            icon=``;
        }
        code=getTips(content).code;

        allowGoOn=getTips(content).allowGoOn;
        this.setState({
            timeOut:5
        })
    }
    componentDidMount() {
        console.log('跳转');
        /*if(this.state.title=='fail' && this.state.url!=``){
            window.location.href=url;
        }*/
        if(allowGoOn){
            //console.log(url);
            //console.log('----------');
            ///console.log('/'+url.replace(/_/g, "/"));
            setTimeout(()=>{
                window.location.href='/'+url.replace(/_/g, "/");
            }, 5000);
        }
    }
    render(){
        if(allowGoOn && this.state.timeOut && this.state.timeOut>0){
            let timeOut=this.state.timeOut;
            console.log(timeOut+'秒');
            setTimeout(()=>{
                this.setState({
                    timeOut:timeOut-1,
                });
            }, 1000);
        }
        return(
            <main className="main" className={title}>
                <div className="wrapper" style={{ paddingTop:`100px`,textAlign:`center`}}>
                    {icon}
                </div>
                <div className="wrapper" style={{ fontSize:`24px`,textAlign:`center`,paddingTop:`40px`}}>
                    {getTips(content).message}
                </div>
                {allowGoOn?
                    <div className="wrapper" style={{ fontSize:`16px`,textAlign:`center`,paddingTop:`40px`}}>
                        <p>{this.state.timeOut}秒后页面将自动跳转</p>
                    </div>
                    :``
                }
            </main>
            )

    }
}