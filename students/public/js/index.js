$(function() {
    //删除
    $('tbody').on('click', 'button.del', function () {
        let id = this.id
        let that = this;
        $.ajax({
            url: "/del",
            data: {id},
            dataType: 'json',
            type: 'POST',

            success: function (res) {
                if (res.code === 200) {
                    $(that).closest('tr').remove();
                } else {
                    console.log(res.message)
                }
            }
        });
    })

    //添加
    $("input[name='add']").click(function () {

        let formdata = $('form.add').serialize();
        // let name = $("input[name='name']").val().trim();
        // let age = $("input[name='age']").val().trim();
        // let classes = $("input[name='classes']").val().trim();
        // console.log(name,age,classes)
        let dataArr = $('form.add').serializeArray();
        $.ajax({
            url:"/add",
            type: 'post',
            dataType: 'json',
            data:formdata,
            success:function(res){
                if(res.code===200){

                    // let str = "<tr><td>"+res.id+"</td><td>"+name+"</td><td>"+classes+"</td><td>"+age+"</td><td><button class='btn btn-info del' id='"+res.id+"'>删除</button></td></tr>"
                    // $('tbody').append(str);
                    let data = changeType(dataArr);
                    data['id']=res.id;
                    appendTr(data);

                }else{
                    console.log(res.message);
                }

            }
        })
    })

    function appendTr(obj){
        let str = `<tr>
        <td>${obj.id}</td>
        <td>${obj.name}</td>
        <td>${obj.classes}</td>
        <td>${obj.age}</td>
        <td>
            <button class='btn btn-info del' id='${obj.id}'>删除</button>
            <button class="btn btn-info edit" id='${obj.id}'>修改</button>
            </td>
        </tr>`
        $('tbody').html(function (index,value) {
            return value+str;
        })

    }
    function changeType(Arr){
         var obj={};
        Arr.map(function (e,item) {
            obj[e.name]=e.value;
        });
        return obj;
    }


    //修改
    $('tbody').on('click', 'button.edit', function () {

        //获取id
        let id =this.id
        $('form.editForm input[name=id]').val(id);

        let name = $("tbody>tr[index="+id+"]>td[name='name']").text();
        let classes = $("tbody>tr[index="+id+"]>td[name='classes']").text();
        let age = $("tbody>tr[index="+id+"]>td[name='age']").text();
        console.log(name,classes,age)

        //编辑表格显示
        $('.editBox').css('display','block');
        $('form.editForm input[name="name"]').val(name);
        $('form.editForm input[name="classes"]').val(classes);
        $('form.editForm input[name="age"]').val(age);



        $("input[name='edition']").click(function(){

            let formdata = $("form.editForm").serialize();
            name = $('form.editForm input[name="name"]').val();
            classes = $('form.editForm input[name="classes"]').val();
            age = $('form.editForm input[name="age"]').val();
            $.ajax({
                url:"/edit",
                type:"post",
                data:formdata,
                dataType:"json",
                success:function(res){
                    if(res.code===200){
                        console.log(age)
                        $("tbody>tr[index="+id+"]>td[name='name']").text(name);
                        $("tbody>tr[index="+id+"]>td[name='classes']").text(classes);
                        $("tbody>tr[index="+id+"]>td[name='age']").text(age);

                        $('.editBox').css('display','none');

                    }else{
                        console.log(res.message);
                    }
                }
            })
        })

    })


    //编辑表格
    $('tbody').on('click', 'button.edit', function () {

        //获取id
        let id =this.id
        $('form.editForm input[name=id]').val(id);

        let name = $("tbody>tr[index="+id+"]>td[name='name']").text();
        let classes = $("tbody>tr[index="+id+"]>td[name='classes']").text();
        let age = $("tbody>tr[index="+id+"]>td[name='age']").text();
        console.log(name,classes,age)

        //编辑表格显示
        $('.editBox').css('display','block');
        $('form.editForm input[name="name"]').val(name);
        $('form.editForm input[name="classes"]').val(classes);
        $('form.editForm input[name="age"]').val(age);



        $("input[name='edition']").click(function(){
            let formdata = $("form.editForm").serialize();
            name = $('form.editForm input[name="name"]').val();
            classes = $('form.editForm input[name="classes"]').val();
            age = $('form.editForm input[name="age"]').val();

            asyncData({url:"/edit",type:"post",data:formdata,dataType:"json"})

                .then(res=>{
                    $("tbody>tr[    index="+id+"]>td[name='name']").text(name);
                    $("tbody>tr[index="+id+"]>td[name='classes']").text(classes);
                    $("tbody>tr[index="+id+"]>td[name='age']").text(age);

                    $('.editBox').css('display','none');
                }).catch(err=>{
                console.log(err.message);
            })


            /*$.ajax({
                    url:"/edit",
                    type:"post",
                    data:formdata,
                    dataType:"json",
                success:function(res){
                    if(res.code===200){
                        console.log(age)
                        $("tbody>tr[index="+id+"]>td[name='name']").text(name);
                        $("tbody>tr[index="+id+"]>td[name='classes']").text(classes);
                        $("tbody>tr[index="+id+"]>td[name='age']").text(age);

                        $('.editBox').css('display','none');

                    }else{
                        console.log(res.message);
                    }
                }
            })*/
        })

    })

    function asyncData({url,data,dataType,type}){
        return new Promise(function (resolve,reject) {
            $.ajax({
                url:url,
                type:type,
                data:data,
                dataType:dataType,
                success:function(res){
                    if(res.code===200){
                        resolve(res);

                    }else{
                        reject(res);
                    }
                }
            })
        })
    }


})