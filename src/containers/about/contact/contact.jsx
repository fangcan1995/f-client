import React from 'react';

export default ({ location, match, history }) => {
    return(

        <div>
            <div className="m-crumb">
                <div>您所在的位置： 联系我们</div>
            </div>
            <div className="title__list">
                <div className="tab_title">
                    <ul>
                        <li className="on"><h3>联系我们</h3></li>
                    </ul>
                </div>
                <div className="tab_content">
                    <div className="contact">
                        <iframe frameborder="0" scrolling="no" src="http://www.baba88.com/a/autofinancing/aboutUs/map.html"   className="map">

                        </iframe>
                        <div className="contact_txt">
                            <div className="tab_title">
                                <ul><li className="on"><h3>总部地址</h3></li></ul>
                            </div>
                            <h3>巴巴汇金服</h3>
                            <p>地址：中国 辽宁 大连市沙河口区现代服务业大厦22层</p>
                            <p>邮编：116000</p>
                            <p>总机：0411-82916999</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="title__list">
                <div className="tab_content">
                    <div className="branch">
                        <div className="tab_title">
                            <ul><li className="on"><h3>巴巴汇金服全国分支机构服务热线</h3></li></ul>
                        </div>
                        <table className="fengongsi">
                            <thead>
                            <tr>
                                <th>区域</th>
                                <th>分支机构</th>
                                <th>地址</th>
                                <th>前台电话</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td rowSpan="7">大连</td>
                                <td className="center">沙区分公司</td>
                                <td>辽宁省大连市沙河口区黄河路620号现代服务业总部大厦22层</td>
                                <td>0411-88124488</td>
                            </tr>
                            <tr>
                                <td className="center">马栏营业部</td>
                                <td>大连市沙河口区红旗东路42号公建1楼国汇财富</td>
                                <td>0411-84232209</td>
                            </tr>
                            <tr>
                                <td className="center">五一路营业部</td>
                                <td>大连市沙河口区五一路100-1号国汇财富</td>
                                <td>0411-84577985</td>
                            </tr>
                            <tr>
                                <td className="center">中山营业部</td>
                                <td>大连市中山区北斗街41-12号国汇财富</td>
                                <td>0411-83731294</td>
                            </tr>
                            <tr>
                                <td className="center">华南营业部</td>
                                <td>大连市甘井子区山东路113-1-3号巴巴汇金服</td>
                                <td>0411-84951853</td>
                            </tr>
                            <tr>
                                <td className="center">华乐营业部</td>
                                <td>大连市中山区华乐街134号国汇财富</td>
                                <td>0411-84577029</td>
                            </tr>
                            <tr>
                                <td className="center">桃源营业部</td>
                                <td>大连市中山区于家巷7号1层2号</td>
                                <td>暂无座机</td>
                            </tr>
                            <tr>
                                <td rowSpan="7">辽区</td>
                                <td className="center">开发区营业部</td>
                                <td>大连开发区文华园鹏运家园38-7号国汇财富</td>
                                <td>0411-39267508</td>
                            </tr>
                            <tr>
                                <td className="center">本溪营业部</td>
                                <td>辽宁省本溪市平山区平山路31-6号1单元2层国汇财富</td>
                                <td>024-42871787</td>
                            </tr>
                            <tr>
                                <td className="center">沈阳分公司</td>
                                <td>沈阳市沈河区万柳塘路42号1门国汇财富（沈空俱乐部对面）</td>
                                <td>18202477717</td>
                            </tr>
                            <tr>
                                <td className="center">朝阳营业部</td>
                                <td>朝阳市建平县怡馨家园7-1号国汇财富</td>
                                <td>0421-7888887</td>
                            </tr>
                            <tr>
                                <td className="center">丹东分公司</td>
                                <td>丹东市振兴区振八街56-4号国汇财富</td>
                                <td>0415-2178333</td>
                            </tr>
                            <tr>
                                <td className="center">凌源</td>
                                <td>辽宁省，凌源市美食城，步行街朝阳路西段26-13-8</td>
                                <td>15842111658</td>
                            </tr>
                            <tr>
                                <td className="center">敦化</td>
                                <td>吉林省敦化市工农路紫钰嘉园二期8号东侧的二间临街门市</td>
                                <td>04336624444</td>
                            </tr>
                            <tr>
                                <td rowSpan="3">内蒙</td>
                                <td className="center">霍林郭勒分公司</td>
                                <td>内蒙古通辽市霍林郭勒市康佳小区B2-商2-2国汇财富</td>
                                <td>0475-2768603</td>
                            </tr>
                            <tr>
                                <td className="center">呼和浩特分公司</td>
                                <td>呼和浩特市赛罕区新华东街26号万达广场A座1805国汇财富</td>
                                <td>15334712105</td>
                            </tr>
                            <tr>
                                <td className="center">通辽分公司</td>
                                <td>内蒙古通辽市科尔沁区明仁大街东段妇婴医院东200米路南国汇财富</td>
                                <td>0475-8318608</td>
                            </tr>
                            <tr>
                                <td rowSpan="2">山东区</td>
                                <td className="center">烟台分公司</td>
                                <td>烟台市芝罘区万达金街B3-106 国汇财富</td>
                                <td>0535-2119066</td>
                            </tr>
                            <tr>
                                <td className="center">青岛营业部</td>
                                <td>青岛市市北区延吉路18-2国汇财富（体育街斜对面）</td>
                                <td>0532-67738286</td>
                            </tr>
                            <tr>
                                <td>北 京</td>
                                <td className="center">北京</td>
                                <td>北京市朝阳区东三环中路63号富力中心9层912-916国汇财富</td>
                                <td>13391941244</td>
                            </tr>
                            <tr>
                                <td>河北区</td>
                                <td className="center">秦皇岛</td>
                                <td>河北省秦皇岛市海港区西港路101-1（国汇财富）</td>
                                <td>0335-3913886</td>
                            </tr>
                            <tr>
                                <td rowSpan="2">吉林区</td>
                                <td className="center">长春</td>
                                <td>长春市朝阳区西安大路1077号金都商务中心8楼国汇财富</td>
                                <td>0431-81615995</td>
                            </tr>
                            <tr>
                                <td className="center">梅河口</td>
                                <td>吉林省梅河口市台湾城1号楼即站前路492号国汇财富</td>
                                <td>0435-4778677</td>
                            </tr>
                            <tr>
                                <td rowSpan="12">龙区</td>
                                <td className="center">哈尔滨</td>
                                <td>黑龙江省哈尔滨市道里区高谊街87号国汇财富</td>
                                <td>0451-84594836</td>
                            </tr>
                            <tr>
                                <td className="center">齐齐哈尔</td>
                                <td>齐齐哈尔建华区中华路282号国汇财富</td>
                                <td>0452-2743666</td>
                            </tr>
                            <tr>
                                <td className="center">克山</td>
                                <td>齐齐哈尔市克山县克山镇友谊路三段路西新检察院对面国汇财富公司</td>
                                <td>0452-4419666</td>
                            </tr>
                            <tr>
                                <td className="center">依安</td>
                                <td>齐齐哈尔市依安县佳和阳光8#11楼（名仕洗浴北）国汇财富</td>
                                <td>13904826009</td>
                            </tr>
                            <tr>
                                <td className="center">富裕</td>
                                <td>齐齐哈尔市富裕县信德华府一号楼115号国汇财富</td>
                                <td>0452-3126186</td>
                            </tr>
                            <tr>
                                <td className="center">牡丹江</td>
                                <td>牡丹江市江南新区卧龙街北威虎山路东世茂南外滩二期1-104 国汇财富</td>
                                <td>15754631803</td>
                            </tr>
                            <tr>
                                <td className="center">鹤岗</td>
                                <td>鹤岗市南山区全兴小区二号楼103室（21中学对面）国汇财富</td>
                                <td>0468-6655999</td>
                            </tr>
                            <tr>
                                <td className="center">双鸭山</td>
                                <td>黑龙江省双鸭山市尖山区四马路大地春饼斜对面国汇财富</td>
                                <td>0469-8980777</td>
                            </tr>
                            <tr>
                                <td className="center">伊春</td>
                                <td>伊春市伊春区新兴中大街82号原计生委写字楼2楼国汇财富</td>
                                <td>0458-3671888</td>
                            </tr>
                            <tr>
                                <td className="center">大庆</td>
                                <td>黑龙江省大庆市让胡路区西宾路龙南高层裙房318号国汇财富</td>
                                <td>0459-5977366</td>
                            </tr>
                            <tr>
                                <td className="center">鸡西</td>
                                <td>鸡西市鸡冠区中心塔小区新时代广场2#楼15#门市国汇财富</td>
                                <td>0467-2380366</td>
                            </tr>
                            <tr>
                                <td className="center">扎旗</td>
                                <td>通辽市扎鲁特旗大华综合楼D22_28_7</td>
                                <td>04757332888</td>
                            </tr>
                            <tr>
                                <td rowSpan="5">资产端</td>
                                <td className="center">沈阳北站资产端</td>
                                <td>沈阳市沈河区北站路55号财富中心C座3-20-2国汇财富</td>
                                <td>024-66756900</td>
                            </tr>
                            <tr>
                                <td className="center">朝阳资产端</td>
                                <td>朝阳市双塔区朝阳大街一段8-4（湖畔雅居门市房大恒投资）</td>
                                <td>0421-3992277</td>
                            </tr>
                            <tr>
                                <td className="center">哈尔滨资产端</td>
                                <td>黑龙江省哈尔滨市南岗区长江路209号浦发大厦1213号国汇财富</td>
                                <td>0451-84313327</td>
                            </tr>
                            <tr>
                                <td className="center">牡丹江资产端</td>
                                <td>黑龙江省牡丹江市西平安街17号 新鸿基大厦（久山大厦）16层1610室</td>
                                <td>13555002745</td>
                            </tr>
                            <tr>
                                <td className="center">齐齐哈尔资产端</td>
                                <td>齐齐哈尔市建华区中百综合楼8层5号</td>
                                <td>13019090618</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}