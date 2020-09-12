$(function () {

    $("input[name=edition]").click(function(){
        let formdata = $('form[name=update]').serialize();


        asyncData({url:"/update",type:"post",data:formdata,dataType:"json"})
            .then(resolve=>{
                    location.href="/list";
                }

            ).catch()

    })




    function asyncData({url,data,dataType,type}) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                type: type,
                data: data,
                dataType: dataType,
                success: function (res) {
                    if (res.code === 200) {
                        resolve(res);

                    } else {
                        reject(res);
                    }
                }
            })
        })
    }
})

