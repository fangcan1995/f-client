import React from 'react';

export  function getData(source='',pageNum,pageSize,filter){
    //let url = `${source}?pageNum=${pageNum}&pageSize=${pageSize}${conditions}`;
    let url = `${source}`
    let conditions = "";
    if(pageNum != undefined){
        url += `?pageNum=${pageNum}`;
    }
    if(pageNum != undefined){
        url += `&pageSize=${pageSize}`;
    }
    if(filter != undefined){
        for(var item in filter){
            if(filter[item]!= undefined && filter[item]!=''){
                conditions += "&"+item+"="+filter[item];
            }

        };
        url += `${conditions}`;
    }
    console.log('******************************');
    console.log(url);
    console.log('******************************');
    fetch(url,{
        method:"get",
        /*headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(userObj),*/
    })
        .then(function (response){
            if (response.status == 200){
                return response;
            }
        })
        .then((data) => data.json())
        .then((data) => {
                return data.data;
            }
        )
        .catch(function(err){
            //console.log("Fetch错误:"+err);

        });


};