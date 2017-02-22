

1、WebRoot/js/common.js  (总的匿名函数自执行，命名空间封装)

//命名空间规范：一个功能模块，放到一个匿名函数中，全局函数放到一个common中；

//命名空间：common

(function(window){

 

            //注册命名空间 'common' 到window对象上  [1]

            window['common']={};

 

            //这里如果没写参数的话，调用的时候，传递的参数会自动转成arguments数组；           

            /**公共调用函数：ajax提交表单*/

            function ajaxSubmit(inStr,outStr, url){               

                var formObj=$(inStr);

                var tableObj=$(outStr);

                $.ajax({

                    cache: false,           

                    async:false,

                    type: "POST",

                    url: url,

                    //data:$('#form1').serialize(),//要发送的是#form1表单中的数据

                    data:formObj.serialize(),

                    error: function(response) {

                        alert("发送请求失败！");

                        console.log("错误提示："+response.responseText);                       

                    },

                    success: function(response) {

                        tableObj.html(response);    //将返回的结果显示到ajaxDiv中

                    }

                });           

            };                           

 

            /**公共调用函数：ajax提交表单(json格式)*/

            function ajaxSubmitByJson(inStr,outStr,url){

 

                var formJson =$(inStr).serializeObject();

                //console.info(JSON.stringify(formJson));

                var tableObj=$(outStr);   

                $.ajax({

                    cache: false,

                    async:false,

                    type: "POST",

                    url: url,

                    //dataType:"json",返回数据为json的时候才这样定义，这种定义方式，可以用于远程的接口调用；

                    contentType:'application/json;charset=UTF-8',

                    data:JSON.stringify(formJson),//要发送的是#form1表单中的数据

                     //data:JSON.stringify({deptId:'014014'}),

                    error: function(response) {                

                        alert(("发送请求失败！"));

                        console.log("错误提示："+response.responseText);

                    },

                    success: function(response) {

                        tableObj.html(response);    //将返回的结果显示到ajaxDiv中

                    }

                });           

            };

 

            /**公共调用函数：ajax提交json参数*/

            function ajaxSubmitByJsonObj(jsonObj,outStr,url){                               

                //console.info(jsonObj);

                var tableObj=$(outStr);   

                $.ajax({

                    cache: false,

                    async:false,

                    type: "POST",

                    url: url,

                    //dataType:"json",返回数据为json的时候才这样定义，这种定义方式，可以用于远程的接口调用；

                    contentType:'application/json;charset=UTF-8',

                    //data:JSON.stringify(jsonObj),

                    data:jsonObj,  //这里有时候需要字符串化，有时候不需要，根据情况而定；

                    error: function(response) {                

                        alert(("发送请求失败！"));

                        console.log("错误提示："+response.responseText);

                    },

                    success: function(response) {

                        tableObj.html(response);

                    }

                });           

            };

 

 

 

            /**公共调用函数：ajax提交(简单无参提交，load函数的升级版)*/

            function ajaxSubmitNoParam(outStr, url){               

                var Obj=$(outStr);

                $.ajax({

                    cache: false,           

                    async:false,

                    type: "POST",

                    url: url,

                    error: function(response) {

                        alert("发送请求失败！");

                        console.log("错误提示："+response.responseText);                       

                    },

                    success: function(response) {

                        //$(outStr,response).html();

                        Obj.html(response);    //将返回的结果显示到ajaxDiv中               

                        //console.log(response);

                        //alert("发送请求成功！");                   

                    }

                });           

            };   

 

            /**公共调用函数：ajax提交(简单字符型参数提交)*/

            function ajaxSubmitByParam(key,value,outStr, url){               

                var Obj=$(outStr);

                $.ajax({

                    cache: false,           

                    async:false,

                    type: "POST",

                    url: url,

                    data:key+"="+value, //+"&"+key1+"="+value1

                    error: function(response) {

                        alert("发送请求失败！");

                        console.log("错误提示："+response.responseText);                       

                    },

                    success: function(response) {

                        Obj.html(response);    //将返回的结果显示到ajaxDiv中

                    }

                });           

            };   

 

            /**公共调用函数：ajax普通post提交(无参无返回)*/

            function ajaxSubmitPost(url){               

                $.ajax({

                    cache: false,           

                    async:false,

                    type: "POST",

                    url: url,

                    error: function(response) {

                        alert("发送请求失败！");

                        console.log("错误提示："+response.responseText);                       

                    },

                    success: function(response) {

                    }

                });           

            };   

 

 

 

            /**调用函数：form的json序列化

             * 这种写法，是对jquery的$.fn.serializeArray函数的一种扩展

             * 后者等同于jQuery.prototype.serializeArray

             */

            //jQuery.prototype.serializeObject

            $.fn.serializeObject = function(){   

//               var o = {};   

//               var a = this.serializeArray();   

//               $.each(a, function() {   

//                   if (o[this.name]) {   

//                       if (!o[this.name].push) {   

//                           o[this.name] = [o[this.name]];   

//                       }   

//                       o[this.name].push(this.value || '');   

//                   } else {   

//                       o[this.name] = this.value || '';   

//                   }   

//               });   

//               return o;

 

                var obj=new Object(); 

                $.each(this.serializeArray(),function(index,param){ 

                    if(!(param.name in obj)){ 

                        obj[param.name]=param.value; 

                    } 

                }); 

                return obj;  //这里不再是return this 了；           

            };                                 

 

            //把创建的函数$注册到 'window.common'命名空间中[2]

            window['common']['ajaxSubmit']=ajaxSubmit;

            window['common']['ajaxSubmitByJson']=ajaxSubmitByJson;

            window['common']['ajaxSubmitNoParam']=ajaxSubmitNoParam;

            window['common']['ajaxSubmitByParam']=ajaxSubmitByParam;

            window['common']['ajaxSubmitPost']=ajaxSubmitPost;

            window['common']['ajaxSubmitByJsonObj']=ajaxSubmitByJsonObj;

 

})(window);

 

2、js/hydsmgr/statis.js  (分支模块下的匿名函数自执行，命名空间封装)

 

//命名空间规范：一个功能模块，放到一个匿名函数中；

//命名空间：statis

(function(window){   

            //注册命名空间 'statis' 到window对象上[1]   

            window['statis']={};

 

            /**模块调用函数：命名空间测试*/

            //这里如果没写参数的话，调用的时候，传递的参数会自动转成arguments数组；

            function testNameSpace(){           

                var str=arguments[0]+"你好";               

                return str;               

            }       

 

            /**单击表头字段时，添加排序参数，并重新提交表单*/

            function tableSort(thStr,tableStr){

                var thObj=$(thStr);

                thObj.each(function(index){

                    $(this).mousedown(function(){

                        $(this).css('background-color','#40A0F6');

                    }).mouseup(function(){   

                        $(this).css('background-color','#99CFFE');

                        if(index==0){

                            $.sortTable.sort(tableStr,index,1);   

                        }

                        else{

                            $.sortTable.sort(tableStr,index,0);   

                        }

 

                    })                           

                })

 

            }       

 

            //把创建的函数$注册到 'window.statis'命名空间中[2]

            window['statis']['testNameSpace']=testNameSpace;

            window['statis']['tableSort']=tableSort;

 

})(window);

 


3、js/plugin/code.js  (插件的命名空间封装)

(function($){ 

    //表格排序插件 

    $.extend($,{ 

        //命名空间 

        sortTable:{ 

            sort:function(tableId,Idx,isString){ 

                var table = document.getElementById(tableId); 

                var tbody = table.tBodies[0]; 

                var tr = tbody.rows;  

                var trValue = new Array(); 

                for (var i=0; i<tr.length; i++ ) { 

                    trValue[i] = tr[i];  //将表格中各行的信息存储在新建的数组中 

                } 

                if (tbody.sortCol == Idx) { 

                    trValue.reverse(); //如果该列已经进行排序过了，则直接对其反序排列 

                } else { 

                    //trValue.sort(compareTrs(Idx));  //进行排序 

                    trValue.sort(function(tr1, tr2){

                        var value1 = tr1.cells[Idx].innerHTML; 

                        var value2 = tr2.cells[Idx].innerHTML;

 

                        if(isString==1){

                            //unicode中文排序

                            return value1.localeCompare(value2); 

                        }                    

                        value1= parseFloat(value1);

                        value2= parseFloat(value2);

 

                        if(value1>value2){

                            return 1;                    

                        }else{

                            return -1;

 

                        }

 

                    }); 

                } 

 

                var fragment = document.createDocumentFragment();  //新建一个代码片段，用于保存排序后的结果 

                for (var i=0; i<trValue.length; i++ ) { 

                    fragment.appendChild(trValue[i]); 

                } 

 

                tbody.appendChild(fragment); //将排序的结果替换掉之前的值 

                tbody.sortCol = Idx; 

            } 

        } 

    });        

})(jQuery);  

 

4、js/plugin/prototype.js （插件的原型对象扩展）

/**json序列化插件*/

jQuery.prototype.serializeObject = function(){   

    var obj=new Object(); 

    $.each(this.serializeArray(),function(index,param){ 

        if(!(param.name in obj)){ 

            obj[param.name]=param.value; 

        } 

    }); 

    return obj; 

};

 

/**标签页面，单点退出插件*/

jQuery.prototype.exitTab = function(){

        var liObj = $('#tab li');           

        for(i=0;i<liObj.length;i++){

            //找出背景颜色为黄色的标签页面，并关闭

            if($(liObj[i]).css("background-color")=="rgb(255, 200, 95)"){

                //关闭当前标签页面

                $(liObj[i]).css("display","none");

                //找到下一个标签或上一个标签，将其以及其对应内容页面显示   

                var oli=null;

                var flag=false;

                //1.1 找到下一个标签

                for(j=i+1;j<liObj.length;j++){

                    var nextObj=$(liObj[j]);

                    //console.info(nextObj.css("display"));

                    if(nextObj.css("display")=="block"){

                        oli=nextObj;

                        flag=true;

                        break;

                    }       

                }

 

                if(flag==false){

                    //1.2 找到上一个标签

                    for(k=i-1;k>=0;k--){

                        var lastObj=$(liObj[k]);

                        if(lastObj.css("display")=="block"){

                            oli=lastObj;

                            break;

                        }

                    }

                }               

                //console.info(123);

                //2.显示该标签

                $('#tab li').removeClass('liStyle');

                oli.addClass('liStyle');

                //3.显示对应内容页面

                $('#content .hidenStyle').css("display","none");

                var li_id=oli.attr("id");

                var id=li_id.replace("_tab","");

                var tabName="#"+id;

                $(tabName).css("display","block");       

                //4.结束该循环（因为只需要执行第一次）

                return false;

            }

        }   

};

 

/**公用扩展插件:显示可视区域的中央窗口*/

$.fn.centerWin = function(){

    var browserWidth=$(window).width();

    var browserHeight=$(window).height();

    var scrollWidth=$(window).scrollLeft();

    var scrollHeight=$(window).scrollTop();           

    var centerWidth=this.width();

    var centerHeight=this.height();                                   

    var left=scrollWidth+(browserWidth-centerWidth)/2;

    //这里的-30，用来弥补除法造成的，top偏大的误差，以及人体视觉感官上，top偏大的误差；

    var top=scrollHeight+(browserHeight-centerHeight)/2-30;                               

    this.css("left",left).css("top",top);

    var currentWin=this;

    this.children('.title').children('img').click(function(){

        currentWin.hide();

    });

 

    return this;

};

 























































 