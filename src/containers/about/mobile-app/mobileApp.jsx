import React from 'react';
import PropTypes from 'prop-types';
import './mobileApp.less';

export default class MobileApp extends React.Component{
    render(){
        return (
            <main className="main">
                    <div className="banner">
                        <ul>
                            <li className="top" >
                                <div className="wrapper">
                                    <a className="ios" href="https://itunes.apple.com/cn/app/巴巴汇/id1140354118?mt=8">
                                        <img src={require('../../../assets/images/about/down_app1.png')} />
                                    </a>
                                    <a className="Android" href="http://42.202.130.40/bbh_web/apk/dlghApp.apk">
                                        <img src={require('../../../assets/images/about/down_app2.png')} />
                                    </a>
                                </div>
                            </li>
                            <li style={{height:`660px`,background:`#fff`}}>
                                <img src={require('../../../assets/images/about/down_img1.jpg')} /></li>
                            <li style={{height:`660px`,background:`#e5e5e5`}}><img src={require('../../../assets/images/about/down_img2.jpg')}/></li>
                            <li style={{height:`660px`,background:`#fff`}}><img src={require('../../../assets/images/about/down_img3.jpg')}/></li>
                            <li style={{height:`660px`,background:`#e5e5e5`}}><img src={require('../../../assets/images/about/down_img4.jpg')}/></li>
                        </ul>
                    </div>
            </main>
        )
    }
}