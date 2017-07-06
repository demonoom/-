/**
 * Created by Noom on 2017/7/4 0004.
 */
$(function () {
    var code = 'ems',
        phone_num = 11183;
    /*获取快递公司*/
    var promise = $.ajax({
        url: "http://v.juhe.cn/expressonline/getCarriers.php",
        type: 'get',
        data: {
            dtype: 'json',
            key: '6b863eed81c6fca2bfd2c0566815422b'
        },
        dataType: 'jsonp',
        success: function (data) {
            var html = template('template', data);
            $('#choose>select').html(html);
        }
    })
    /*选择快递之后取出对应的公司代码*/
    promise.then(
        $('#choose>select').change(function () {
            $.each($('#choose>select>option'), function (i, v) {
                if (v.selected) {
                    code = $(v).attr('carrier_code');
                    phone_num = $(v).attr('value');
                }
            });
        }))

    $('#submit').click(function () {
        var sub_data = {};
        sub_data.carrier_code = code;
        sub_data.sender_name = $('#post>div:eq(0)>input').val();
        sub_data.sender_telphone = $('#post>div:eq(1)>input').val();
        sub_data.sender_province_name = $('#post .title>span:eq(0)').html();
        sub_data.sender_city_name = $('#post .title>span:eq(1)').html();
        sub_data.sender_district_name = $('#post .title>span:eq(2)').html();
        sub_data.sender_address = $('#post>div:eq(3)>input').val();
        sub_data.receiver_name = $('#get>div:eq(0)>input').val();
        sub_data.receiver_telphone = $('#get>div:eq(1)>input').val();
        sub_data.receiver_province_name = $('#get .title>span:eq(0)').html();
        sub_data.receiver_city_name = $('#get .title>span:eq(1)').html();
        sub_data.receiver_district_name = $('#get .title>span:eq(2)').html();
        sub_data.receiver_address = $('#get>div:eq(3)>input').val();
        sub_data.dtype = 'json';
        sub_data.key = '6b863eed81c6fca2bfd2c0566815422b';
        //sub_data.send_method = 'addOrderInfoMes';//普通发快递
        sub_data.send_method = 'addOrderInfoAsy';//异步发快递
        sub_data.isWaybill = 1;
        sub_data.order_no = 20171005321900956591;
        sub_data.sender_post_code = $('#post>div:eq(4)>input').val();
        sub_data.receiver_post_code = $('#get>div:eq(4)>input').val();
        $.ajax({
            url: "http://v.juhe.cn/expressonline/expressSend.php",
            type: 'post',
            data: sub_data,
            dataType: 'jsonp',
            success: function (data) {
                $('.success').html(data.reason);
                if (data.error_code == 0) {
                    window.open('success.html?code=' + data.result.order_no + '&num=' + data.result.carrier_code + '')
                }
            }
        });
    });
})