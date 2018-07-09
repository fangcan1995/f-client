import cFetch from './../utils/cFetch';
import {API_CONFIG} from "../config/api";

//let urls=`http://172.16.1.252:9090`;

let specialAc = {
    //根据id获取专题详情
    getInfo: (id) => {
        //console.log(`${urls}/information/subjects/${id}`);
        return {
            type: 'special/FETCH',
            async payload() {
                const res = await cFetch(`${API_CONFIG.hostWeb}${API_CONFIG.getSubjects}/${id}` , {method: 'GET'}, false);
                const {code, data} = res;
                //console.log('返回的数据');
                //console.log(res);
                return res;

            }
        }
    },

};
export default specialAc;

