import React,{ Component } from "react";
import './pagination.less';
export default class Pagination extends Component{
    constructor(props){
        super(props)
        // 设置当前页码，默认为第一页
        this.state = {
            pageCount:10,
            currentPage:1,
            groupCount:5,
            startPage:1,

        }
    }
    componentDidMount() {
        this.setState({
            pageCountEle:document.querySelector("#pageCount"),
        });

        setTimeout(()=>{
            document.addEventListener("click",(e)=>{
                if(e.target.id !== "pageCount"){
                    this.state.pageCountEle.parentNode.className = "hide";
                }
            },false);
        },0)
    }
    choosePageCount(e){
        const parentUI = this.state.pageCountEle.parentNode;
        parentUI.className = (parentUI.className === "hide")?"":"hide";
    }
    confirmPageCount(pageCount){
        const {
            pageCountEle,
            currentPage,
        } = this.state;

        // 设置每页显示条数
        this.setState({
            pageCount
        });
        pageCountEle.innerHTML = pageCount;
        pageCountEle.parentNode.className = "hide";

        setTimeout(()=>{
            this.go(currentPage, true);
        },0);
    }

    create(){
        const {
            totalPage,
        } = this.props.config;
        const {
            currentPage,groupCount,startPage,
        } = this.state;

        let pages = [];
        if( totalPage <= groupCount){

            pages.push(<li onClick = { this.goPrev.bind(this) } className = { this.state.currentPage === 1? "nomore":"" } key={0}>&lt;</li>)
            for(let i = 1;i <= totalPage; i++){
                // 点击页码时调用 go 方法，根据 state 判断是否应用 active 样式
                pages.push(<li onClick = { this.go.bind(this,i) } className = { currentPage === i ? "active" : "" } key={i}>{i}</li>)
            }
            pages.push(<li onClick = { this.goNext.bind(this) } className = { this.state.currentPage === totalPage? "nomore":"" } key={totalPage + 1}>&gt;</li>)
        }else{
            pages.push(<li className = { this.state.currentPage === 1? "nomore":"" } key={ 0 } onClick = { this.goPrev.bind(this) }>&lt;</li>)
            for(let i = startPage;i < groupCount + startPage;i ++){
                if(i <= totalPage - 1){
                    pages.push(<li className = { this.state.currentPage === i? "active":""} key={i} onClick = { this.go.bind(this,i) }>{i}</li>)
                }
            }
            // 分页中间的省略号
            if(totalPage - startPage > groupCount){
                pages.push(<li className = "ellipsis" key={ -1 }>···</li>)
            }
            // 倒数第一页
            pages.push(<li className = { this.state.currentPage === totalPage ? "active":""} key={ totalPage } onClick = { this.go.bind(this,totalPage) }>{ totalPage }</li>)
            // 下一页
            pages.push(<li className = { this.state.currentPage === totalPage ? "nomore":"" } key={ totalPage + 1 } onClick = { this.goNext.bind(this) }>&gt;</li>)
        }
        return pages;


    }

    // 更新 state
    go(currentPage,reset = false){

        const {
            groupCount
        } = this.state;
        // 获取总页数
        const {
            totalPage,
            paging
        } = this.props.config;

        // 处理下一页的情况
        if(currentPage % groupCount === 1){
            this.setState({
                startPage:currentPage
            })
        }

        // 处理上一页的情况
        if(currentPage % groupCount === 0){
            this.setState({
                startPage:currentPage - groupCount + 1
            })
        }
        // 点击最后两页时重新计算 startPage
        if(totalPage - currentPage < 2){
            this.setState({
                startPage:totalPage - groupCount,
            })
        }
        // 选择每页条数后重新分页
        if(reset === true){
            this.setState({
                currentPage:1,
                startPage:1,
            });
        }else{
            this.setState({
                currentPage
            });
        }
        setTimeout(()=>{
            paging({
                currentPage:this.state.currentPage,
                pageCount:this.state.pageCount
            })
        });



    }
    // 页面向前
    goPrev(){
        let {
            currentPage,
        } = this.state;
        if(--currentPage === 0){
            return;
        }
        this.go( currentPage )
    }
    // 页面向后
    goNext(){
        let {
            currentPage,
        } = this.state;
        const {
            totalPage,
        } = this.props.config;

        if(++currentPage > totalPage){
            return;
        }
        this.go( currentPage )
    }
    jumpPage(e){
        this.setState(
            {page: e.target.value}
        );
    }
    render(){
        const Pages = this.create.bind(this)();
        return(
            <div className="pagination">
                <div className = "bar">
                    <span>每页显示</span>
                    <div className = "select">
                        <ul className ="hide">
                            <li id="pageCount" onClick = { this.choosePageCount.bind(this) }>10</li>
                            <li onClick = { this.confirmPageCount.bind(this,10) }>10</li>
                            <li onClick = { this.confirmPageCount.bind(this,20) }>20</li>
                            <li onClick = { this.confirmPageCount.bind(this,30) }>30</li>
                            <li onClick = { this.confirmPageCount.bind(this,50) }>50</li>
                        </ul>
                    </div>
                </div>
                <ul className = "page">
                    { Pages }
                    <li className="jump">到第<input type="text" className="pagination__page" value={this.state.page} onChange = {this.jumpPage} />页
                        <button className="pagination__button" onClick = {this.jumpPage}>确定</button>
                    </li>

                </ul>

            </div>
        );
    }
}