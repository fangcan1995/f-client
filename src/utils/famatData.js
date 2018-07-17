import React from 'react';

export  function toMoney(value){
    const len=2;
    const comma=false;
    const patrn = /^(-)?\d+(\.\d+)?$/;
    //数值不合法时返回0
    if (patrn.exec(value) == null || value == "" || value == 0) {
        if(len>0){
            return '0.00';
        }else{
            return 0;
        }
    } else{
        value=parseFloat(value);
    }
    value = value.toFixed(len);

    value = parseFloat(value);
    if(comma){
        value = value.toLocaleString();
    }else{
        value = value.toString();
    }
    //补位小数点
    if(len>0){
        let ws='';
        if(value.indexOf(".") != -1 ){
            ws=Array(len-(value.split(".")[1].length)).join( '0' );
        }else{
            ws='.'+Array(len).join( '00' );

        };
        value=value+ws;
    }

    return value;
}

export  function toNumber(value){
    const patrn = /^(-)?\d?$/;
    if (patrn.exec(value) == null || value == "" || value == 0) {
        return '0';
    } else{
        value=parseInt(value);
        return value;
    }
}

//金额格式化,小数点前三位加个逗号，2为小数点
export  function addCommas(nStr){
    nStr += '';//改变成字符串
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1].substring(0,2) : '.00';  //小数点超出2位，只保留两位，没有小数点后补.00
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

//身份证计算年龄
export  function cardGetAge(identityCard) {
    let len = (identityCard + "").length;
    if (len == 0) {
        return 0;
    } else {
        if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
        {
            return 0;
        }
    }
    let strBirthday = "";
    if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
    {
        strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
    }
    if (len == 15) {
        strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
    }
    //时间字符串里，必须是“/”
    let birthDate = new Date(strBirthday);
    let nowDateTime = new Date();
    let age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//身份证计算年龄
export  function cardGetSex(identityCard) {
    let len = (identityCard + "").length;
    if (len == 0) {
        return 0;
    } else {
        if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
        {
            return 0;
        }
    }
    let sex = 0;
    if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
    {
        if(parseInt(identityCard.substr(16, 1)) % 2 == 1){
            sex = 1;//男
        }else{
            sex = 2;
        }
    }
    if (len == 15) {
        if(parseInt(identityCard.substr(14, 1)) % 2 == 1){
            sex = 1;//男
        }else{
            sex = 2;
        }
    }
    return sex;
}

//格式化成功失败信息
export  function formatPostResult(res){
    let type=``;
    let message=``;
    let description=``;
    if(res.code == 0){
        type='success';
        if(res.message.length>12){
            message=`操作成功`;
            description=res.message
        }else{
            message=res.message;
            description=``
        }
    }else{
        type='error';
        message=res.message;
    }

    return {
        code:res.code,
        type:type,
        message:message,
        description:description||``,
    }
}
export function getTips(messageCode){
    const errDicts = [
        {
            code:`invest_000`,
            message:{code: 1, message: `前端验证提示1`, allowGoOn: true}
        },
        {
            code:`invest_001`,
            message:{code: 100, message: `请输入交易密码！`, allowGoOn: true}
        },
        {
            code:`invest_002`,
            message:{code: 100, message: `交易密码错误！`, allowGoOn: true}
        },
        {
            code:`invest_003`,
            message:{code: 100, message: `系统异常，请稍后再试！`, allowGoOn: true}
        },
        {
            code:`invest_004`,
            message:{code: 100, message: `请先进行开户操作！`, allowGoOn: true}
        },
        {
            code:`invest_005`,
            message:{code: 100, message: `账户余额不足，请先充值！`, allowGoOn: true}
        },
        {
            code:`invest_006`,
            message:{code: 100, message: `投资金额必须是100的整数倍！`, allowGoOn: true}
        },
        {
            code:`invest_007`,
            message:{code: 100, message: `投标开始时间未到！`, allowGoOn: true}
        },
        {
            code:`invest_008`,
            message:{code: 100, message: `招标已结束！`, allowGoOn: true}
        },
        {
            code:`invest_009`,
            message:{code: 100, message: `您是该转让标发起人，该项目不可投！`, allowGoOn: true}
        },
        {
            code:`invest_010`,
            message:{code: 100, message: `该项目处于不可投资状态，请刷新！`, allowGoOn: true}
        },
        {
            code:`invest_011`,
            message:{code: 100, message: `投资金额低于使用红包的最低投资金额！`, allowGoOn: true}
        },
        {
            code:`invest_012`,
            message:{code: 100, message: `投资金额低于使用加息券的最低投资金额！`, allowGoOn: true}
        },
        {
            code:`invest_013`,
            message:{code: 100, message: `你已经投资成功过，不允许投资新手标！`, allowGoOn: true}
        },
        {
            code:`invest_014`,
            message:{code: 100, message: `你已经借款成功过，不允许投资新手标！`, allowGoOn: true}
        },
        {
            code:`invest_015`,
            message:{code: 100, message: `该项目不可重复投资！`, allowGoOn: true}
        },
        {
            code:`invest_016`,
            message:{code: 100, message: `投资金额不能大于标的可投剩余金额！`, allowGoOn: true}
        },
        {
            code:`invest_017`,
            message:{code: 100, message: `请您先进行风险评测！`, allowGoOn: true}
        },
        {
            code:`invest_018`,
            message:{code: 100, message: `投资额度超过风险评估总额上限！`, allowGoOn: true}
        },
        {
            code:`invest_019`,
            message:{code: 100, message: `标的少于起投金额时，需全部进行投资！`, allowGoOn: true}
        },
        {
            code:`invest_020`,
            message:{code: 100, message: `剩余金额少于起投金额，需全部进行投资！`, allowGoOn: true}
        },
        {
            code:`invest_021`,
            message:{code: 100, message: `请大于最低投资限额！`, allowGoOn: true}
        },
        {
            code:`invest_022`,
            message:{code: 100, message: `请小于最高投资限额！`, allowGoOn: true}
        },
        {
            code:`invest_023`,
            message:{code: 101, message: `当前投资用户过多，请耐心等待！`, allowGoOn: true}
        },
        {
            code:`invest_024`,
            message:{code: 100, message: `投资失败，借款人未开户！`, allowGoOn: true}
        },
        {
            code:`invest_025`,
            message:{code: 102, message: `系统烦忙，请耐心等待！`, allowGoOn: true}
        },
        {
            code:`invest_026`,
            message:{code: 201, message: `非法操作`, allowGoOn: false}
        },
        {
            code:`invest_027`,
            message:{code: 0, message: `操作成功`, allowGoOn: false}
        },
        {
            code:`invest_028`,
            message:{code: 9999, message: `操作失败`, allowGoOn: false}
        },
        {
            code:`invest_029`,
            message:{code: 100, message: `您是原标发起人，该项目不可投！`, allowGoOn: true}
        },



        {
            code:`pay_000000`,
            message:{code: 0, message: `操作成功`, allowGoOn: true}
        },
        {
            code:`pay_1001`,
            message:{code: 0, message: `未进行实名认证`, allowGoOn: false}
        },
        {
            code:`pay_1002`,
            message:{code: 0, message: `尚未开户`, allowGoOn: false}
        },
        {
            code:`pay_1003`,
            message:{code: 0, message: `会员信息有误`, allowGoOn: false}
        },
        {
            code:`pay_1004`,
            message:{code: 0, message: `暂无更换银行卡请求记录`, allowGoOn: false}
        },
        {
            code:`pay_1005`,
            message:{code: 0, message: `请输入合法的金额`, allowGoOn: false}
        },
        {
            code:`pay_1006`,
            message:{code: 0, message: `账户余额不足 `, allowGoOn: false}
        },
        {
            code:`pay_999999`,
            message:{code: 9999, message: `操作失败`, allowGoOn: true}
        },
        {
            code:`pay_9999_0`,
            message:{code: 99990, message: `换卡申请失败`, allowGoOn: false}
        }


    ];
    let index=errDicts.findIndex((x)=>
        x.code ==messageCode
    );
    if (index==-1){
        return {code: 406, message: messageCode, allowGoOn: true}
    }else{
        return errDicts[index].message;
    }

}

