import React from 'react';

export  function getData(source='',pageNum=1,pageSize=10,filter=''){
    let conditions = "";
    if(filter){
        for(var item in filter){
            conditions += "&"+item+"="+filter[item];
        }
    }
    let url = `${source}?pageNum=${pageNum}&pageSize=${pageSize}${conditions}`;
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

            console.log("Fetch错误:"+err);

            //console.log("Fetch错误:"+err);
        });


};