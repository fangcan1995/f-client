import React,{Component}from 'react';
import { Route, Link} from 'react-router-dom';
import './aboutus-common.less';

const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest}/>
    </li>
  )}/>
)

//给当前菜单的父级菜单加active
const TitleParent=({ title, to, ...rest }) => (
    <Route render={
        (props) => {
            const { location } = props;
            const url = location.pathname;
            return(
                <h3 className={(url.toLowerCase().indexOf(to.toLowerCase()) === 0) ? 'active' : ''}>
                    {title}
                </h3>
            )
        }
    } />
)


export default class About extends Component {
    constructor(props) {
        super(props)

            this.key=1,
            this.state = {
                current:1
            }
    }
    componentDidMount() {
        //const { location } = this.props;

       /* this.setState({
            current: 2,
        });*/

    }
    collapse(key){
        const {current} = this.state;

        if(current != key){
            this.setState({
                current:key
            })
        }
    }

    render(){
        return(
            <main className="main">
                <div className="wrapper">
                    <div className="about__sidebar">

                        <h2><Link to="/about/constant">信息披露</Link></h2>
                        <dl key="1" onClick = { this.collapse.bind(this,1)} className = { this.state.current === 1? "showChildren":""}>
                            <dt>
                                <TitleParent title="关于我们" to="/about" />
                            </dt>
                            <dd>
                                <ul>
                                    <ListItemLink to="/about/introduce" >公司简介</ListItemLink>
                                    <ListItemLink to="/about/team" >管理团队</ListItemLink>
                                    <ListItemLink to="/about/honor" >荣誉资质</ListItemLink>
                                    <ListItemLink to="/about/partners" >合作伙伴</ListItemLink>
                                    <ListItemLink to="/about/history" >发展历程</ListItemLink>
                                </ul>
                            </dd>
                        </dl>
                        <dl key="2" onClick = { this.collapse.bind(this,2)} className = { this.state.current === 2? "showChildren":""}>
                            <dt><TitleParent title="新闻动态" to="/news" /></dt>
                            <dd>
                                <ul>
                                    <ListItemLink to="/news/mediaReport">公司动态</ListItemLink>
                                    <ListItemLink to="/news/media-report">媒体报道</ListItemLink>
                                    <ListItemLink to="/news/mediaReport">行业新闻</ListItemLink>
                                </ul>
                            </dd>
                        </dl>
                        <dl key="3" onClick = { this.collapse.bind(this,3)} className = { this.state.current === 3? "showChildren":""}>
                            <dt><TitleParent title="官方公告" to="/news" /></dt>
                            <dd>
                                <ul>
                                    <ListItemLink to="/news/notice">网站公告</ListItemLink>
                                </ul>
                            </dd>
                        </dl>
                        <dl key="4" onClick = { this.collapse.bind(this,4)} className = { this.state.current === 4? "showChildren":""}>
                            <dt><TitleParent title="运营报告" to="/news" /></dt>
                            <dd>
                                <ul>
                                    <ListItemLink to="/news/report">运营报告</ListItemLink>
                                </ul>
                            </dd>
                        </dl>
                        <dl key="5" onClick = { this.collapse.bind(this,5)} className = { this.state.current === 5? "showChildren":""}>
                            <dt><TitleParent title="安全保障" to="/about" /></dt>
                            <dd>
                                <ul>
                                    <ListItemLink to="/plus/list.php?tid=56">风控流程</ListItemLink>
                                    <ListItemLink to="/plus/list.php?tid=57">风险提示</ListItemLink>
                                    <ListItemLink to="/plus/list.php?tid=58">风险教育</ListItemLink>
                                </ul>
                            </dd>
                        </dl>
                        <dl key="6" onClick = { this.collapse.bind(this,6)} className = { this.state.current === 6? "showChildren":""}>
                            <dt><TitleParent title="法律法规" to="/laws" /></dt>
                            <dd>
                                <ul>
                                    <ListItemLink to="/laws/rules">相关规则</ListItemLink>
                                </ul>
                            </dd>
                        </dl>
                        <dl key="7" onClick = { this.collapse.bind(this,7)} className = { this.state.current === 7? "showChildren":""}>
                            <dt><TitleParent title="活动公告" to="/about/aaa/" /></dt>
                            <dd>
                                <ul>
                                    <ListItemLink to="/about/news/mediaReport">活动公告</ListItemLink>
                                </ul>
                            </dd>
                        </dl>
                        <dl key="8" onClick = { this.collapse.bind(this,8)} className = { this.state.current === 8? "showChildren":""}>
                            <dt><TitleParent title="帮助中心" to="/about/help/" /></dt>
                            <dd>
                                <ul>
                                    <ListItemLink to="/about/help/questions">常见问题</ListItemLink>
                                    <ListItemLink to="/about/help/contact">联系我们</ListItemLink>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                    <div className="about__main">
                        {this.props.children}
                    </div>
                </div>
            </main>
        )
    }
}
