"use strict"
var memmoryUserData=[];
module.exports = {
    Set: function (data) {
        var userIsAdd = false;
        for(var i in memmoryUserData){
            if(memmoryUserData[i]['nick']==data.nick){
                userIsAdd = true;
                memmoryUserData[i]=data;
            }
        }
        if(!userIsAdd){
            memmoryUserData.push(data);
        }
    }
    ,
    Get: function () {
        return memmoryUserData;
    }
}

