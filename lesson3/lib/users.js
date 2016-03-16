var memmoryUserData={};
module.exports = {
    Set: function (data) {
        memmoryUserData[data.nick]=data;
    }
    ,
    Get: function () {
        return memmoryUserData;
    }
}

