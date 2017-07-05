/**
 * Created by Noom on 2017/7/4 0004.
 */
$(function () {
    var AppKey = '6b863eed81c6fca2bfd2c0566815422b';
    /*获取快递公司*/
    $.ajax({
        url:"http://v.juhe.cn/expressonline/getCarriers.php",
        type:'get',
        data:{dtype:'json',key:'6b863eed81c6fca2bfd2c0566815422b'},
        dataType:'jsonp',
        success: function (data) {
            console.log(data);
        }
    })
})