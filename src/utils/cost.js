/**
 * 验证金额
 * @param data 类型为json对象 键：value验证值 type 1为2位小数 0为正整数 min_v最小值 max_v最大值 label提示标签 interval间隔
 * @returns 数组 [0]验证是否通过 [1]通过返回验证值value，否则返回0 [2]提示语
 */
export function checkMoney(json) {
    //初始化
    var value,type,min_v,max_v,label,interval;
    var reg,result,tips;
    ('value' in json)? value=json.value:result=[false,0,'无值']; //获取要验证的数字
    ('type' in json)?type=json.type:type=1;  //类型，1为允许2位小数，0为正整数
    ('min_v' in json)?min_v=json.min_v:min_v=0;   //最小值
    ('max_v' in json)?max_v=json.max_v:max_v=0;    //最大值
    ('label' in json)?label=json.label:label=''; //提示标签
    ('interval' in json)?interval=json.interval:interval=0;
    if(type==1){
        reg=/^\d+(\.\d{1,2})?$/;
        if(parseFloat(value)){
            tips=label+'格式不正确';
        }else{
            return [false,0,label+'输入有误'];
        }
    }else if((type==0)){
        reg=/^\+?[1-9][0-9]*$/;
        if(parseInt(value)){
            tips='必须为正整数';
        }else{
            return [false,0,label+'输入有误'];
        }
    }else{
        return [false,0,label+'输入有误'];
    }
    if(reg.test(value)){
        //金额验证通过,对比上限和下限
        if(max_v){
            if(value>max_v) return [false,value,label+'不能大于'+max_v+'元'];
        }
        if(min_v){
            if(value<min_v) return [false,value,label+'不能小于'+min_v+'元'];
        }
        //验证是否为interval的倍数
        if(interval){
            if(value%interval!=0){
                return [false,value,label+'必须是'+interval+'的整数倍'];
            }
        }
        return [true,value,label+'验证通过'];
    }else{
        return [false,0,tips];
    }
}
/**
 * 计算收益函数
 * @param val投资额 y_per年化收益 time type
 * @returns 收益
 */
export  function income(val,y_per,time,type){
    //按月投资
    let amount=0;
    if(type=='m'){
        amount=(val * (y_per / 100)) / 12 * time;
    }
    //按天投资
    if(type=='d'){
        amount=(val * (y_per / 100)) / 365 * time.toFixed(2);
    }
    return amount.toFixed(2);
}


//计算手续费
export  function poundage(amount,rate){
    return ((amount*rate).toFixed(2));
}

