import React ,{ Component } from "react";


export  default  class PayAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ``,
            content:``
        };
    }

    componentWillMount() {
        const pathSnippets = this.props.location.pathname.split('/').filter(i => i);
        console.log(pathSnippets);
        let title = pathSnippets[3];
        let content= pathSnippets[4];
        if(title=='success'){
            title=`操作成功`;


        }else if(title=='fail'){
            title=`操作失败`;


        }else{
            title=``;
        }
        this.setState({
            title: title,
            content:content
        })
    }
    render(){
        return(
            <main className="main">
                <div className="wrapper" style={{ fontSize:`36px`,textAlign:`center`,paddingTop:`100px`}}>
                    {this.state.title}
                </div>
                <div className="wrapper" style={{ fontSize:`18px`,textAlign:`center`,paddingTop:`40px`}}>
                    {this.state.content}
                </div>
            </main>
            )

    }
}