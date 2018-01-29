/*import React from 'react';
import jQuery from 'jquery';
var commonFn = React.createClass({

    funA: function() {
        alert('a');
    },

})
export default commonFn;*/
import jQuery from 'jquery';

export  function getData(url='',currentPage=1,pageSize=10,filter=''){
    console.log('后台获取第'+currentPage+'页数据，每页'+pageSize+'条,查询条件：全部');
    console.log('后台获取数据');
    console.log(url);
    console.log('第'+currentPage+'页数据，每页'+pageSize+'条');
    console.log('查询条件:'+filter);
};