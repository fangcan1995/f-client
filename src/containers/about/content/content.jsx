import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';



const articalContent = (props) => {
    console.log(props);
    return (
        <div>123</div>
    );
}

export default articalContent;

/* class articalContent extends Component {

    constructor (props) {
        super(props);
        this.state = {
            typeTitle: ''
        }
    }

    render () {

        //数据
        console.log(this.props);
        const { list } = this.props.data;

        const listData = list ? list : [];

        //路由
        const { match } = this.props;
        const urlToArray = match.url.split('/');
        const typeText = urlToArray[urlToArray.length -1];
        const typeTitle = setTitle(typeText);
        

        return(
                            <ul className="list">
                                {
                                    listData.map((item, i) => {
                                        return (
                                            <li key={i}>
                                                <Link to="/">{item.title}</Link>
                                                <span>{item.updateTime.split(' ')[0]}</span>
                                            </li>
                                        );
                                    })
                                }
                                <li><a href="#" target="_blank">聚焦智能金融巴巴汇金服获中国金融服务行业十大领先品牌聚焦智能金融巴巴汇金服获中国金融服务行业十大领先品牌聚焦智能金融巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-12-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                                <li><a href="#" target="_blank">聚焦智能金融 巴巴汇金服获中国金融服务行业十大领先品牌</a><span>2017-5-8</span></li>
                            </ul>
                            
        )
    }
}
 */


