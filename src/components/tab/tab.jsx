import React,{ Component } from "react";

export default class Tab extends Component {
    constructor(props){
        super(props);
        this.state = {
            current: 0
        };
    }

    itemNav = (index) => {
        return index === this.state.current ? "tab tab--active" : "tab"
    }

    itemCon = (index) => {
        return index === this.state.current ? "tab__panel tab__panel--active" : "tab__panel"
    }

    render(){
        return (
            <div className="tablist">
                { /* 动态生成Tab导航 */ }
                <div className="tabs__nav">
                    {
                        React.Children.map(this.props.children,(element,index) => {
                            return (
                                <li onClick={ () => { this.setState({ current: index }) } } className={ this.itemNav(index) }>{ element.props.name }</li>
                            )
                        })
                    }
                </div>
                { /* Tab内容区域 */ }
                <div className="tabs__content">
                    {
                        React.Children.map(this.props.children, (element,index) => {
                            return (
                                <div onClick={ () => { this.setState({ current: index }) } } className={ this.itemCon(index) }>{ element }</div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}