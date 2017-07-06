/**
 * Created by Noom on 2017/7/6 0006.
 */
$(function () {
    var http = location.search;
    var arr = http.split('=');
    var code = arr[2];
    getNum(arr[1]);
    $('#btn').click(function () {
        $.ajax({
            url: 'http://v.juhe.cn/expressonline/cancleSend.php',
            type: 'post',
            data: {
                dtype: 'json',
                key: '6b863eed81c6fca2bfd2c0566815422b',
                order_no: value,
                carrier_code: code
            },
            dataType: 'jsonp',
            success: function (data) {
                console.log(data);
                $('h1').html(data.reason)
            }

        })
    })




    /**
     * 从字符串中提取数字的方法
     * @param text
     */
    function getNum(text) {
        return value = text.replace(/[^0-9]/ig, "");
    }
})