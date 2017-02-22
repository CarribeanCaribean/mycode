<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<%

String path = request.getContextPath();

String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="importTypeJson" value="${importTypeJson}"/>

 

 

<!DOCTYPE HTML>

<html>

<head>

<base href="<%=basePath%>">

 

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE10" />

<!-- <meta http-equiv="X-UA-Compatible" content="IE=Edge"> -->

<title>入库类型统计</title>

 

<script type="text/javascript" src="js/jquery.min.js"></script>

<script type="text/javascript" src="js/common.js"></script>

<script type="text/javascript" src="js/plugin/prototype.js"></script>

 

<!-- EasyUI的配置  Begin-->

<script type="text/javascript" src="js/jquery-easyui-1.4.4/jquery.easyui.min.js"></script>

<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.4/themes/default/easyui.css">

<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.4/themes/icon.css">

<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.4/demo.css">

<!-- EasyUI的配置 End-->

 

<link type="text/css" rel="stylesheet" href="css/iconfont.css" />

 

<style type="text/css">

*{ margin:0; padding:0; /*font-family:"microsoft yahei"*/;font-size: 12px;}

li{list-style:none; }

img{ border:none; }

a{ text-decoration:none; color:black;}

#main_div{width:1666px;height:792px;background-color:#E2EBF2;}

 

/*--------top start--------*/ 

#top{height: 62px; }

#top_ul li{float: left;margin-top: 5px;margin-left: 4px;}

#top_ul a{display: block;width: 68px;height: 52px;}

#top_ul li:hover{background: cadetblue;}

#top_ul i{display: block;width:25px; height: 22px;margin:auto;margin-top: 4px;background-color: #40A0F6;text-align: center;line-height: 22px;}

#top_ul span{display: block;text-align: center;margin-top:2px;color:#551A8B}

#top_ul .iconfont{color: #232B0C;font-size: 19px;}/*如果前面不加#top_ul，则会与原来的样式冲突*/

#top_ul .spanStyle{color:red;}

#top_ul .iconStyle{font-size:22px;/*color:#660099*/}

/*#top_ul li:active{background-color:#E2EBF2;}点击图标后背景消失*/

/*--------top end--------*/ 

 

/*--------condition start--------*/ 

#condition{height: 62px; }

#form1 td{width: 386px;height: 30px;padding-left: 20px;}

.importType{width: 268px;}

.drugType{width: 126px;}

.dateStyle{width: 130px;}

#errorMsg1{font-size:12px;color:red;font-weight:bold;}

/*--------condition end--------*/ 

 

/*--------datatable start--------*/ 

#datatable1{width:1642px;height: 648px; border:1px solid darkgoldenrod;margin-left:10px;background:white;}

 #table1 th{height:18px;border-right:1px solid #F0F0F0;background:#99CFFE;font-weight: normal;}/*这里也可以用margin-right: 3px;display: block;float: left来实现间隔，但并不是很好*/

#table1 th a{display:block;color:#000080}

#table1 td{height:18px;border-right:1px solid #F0F0F0;text-align: right;}

#table1 #field_header{text-align: left;}

#table1 .field_01{width:250px;}

#table1 .field_02{width:74px;}

#table1 .field_03{width:74px;}

#table1 .field_04{width:80px;}

#table1 .field_05{width:92px;}

#table1 .field_06{width:92px;}

#table1 .field_end{width: 1200px;}

#table1 .fontStyle{color:white};

/*--------datatable end--------*/ 

 

</style>

</head>

<body>

<div id="main_div">


<!--top start-->

<div id="top">

<ul id="top_ul">

<li id="submit1"><a href="javascript:void(0)"><i class="iconfont">&#xe65c</i><span>提取</span></a></li>

<li id="clearScreen1"><a href="javascript:void(0)"><i class="iconfont">&#xe8f2</i><span>清屏</span></a></li>

<li><a href="javascript:void(0)"><i class="iconfont">&#xe634</i><span>打印</span></a></li>

<li id="exit1"><a href="javascript:void(0)"><i class="iconfont">&#xe66d</i><span>退出</span></a></li>

<li id="excelExport"><a href="javascript:void(0)"><i class="iconfont">&#xe94a</i><span>导出</span></a></li>

</ul>

</div>

<!--top end-->


<!--condition start-->

<div id="condition">

<form id="form1"  method="post"  >

<table border="0" cellspacing="0" cellpadding="0">

<tr>

<td>

类型：             

<select class="importType" name="importType" >

<option value="采购入库">采购入库</option>

</select>

</td>

<td>

<input type="checkbox"  name="cbox_drugType" value="yes" checked />

<!-- <input type="checkbox"  name="cbox_drugType" value="yes1" checked />-->

 药品类别：

<select class="drugType" name="drugType" >

<option value="0">全部</option>

<option value="1">西药[1]</option>

<option value="2">中草药[2]</option>

<option value="3">中成药[3]</option>

</select>

<span id="errorMsg1" ></span>

</td>

</tr>


<tr>

<td>

<input type="radio"  name="rdio_dateType" value="isStatis"   id="isStatis1" checked/>

 统计日期：

<!--20160504 Thomas 【兼容性问题：目前只有360极速浏览器（Chrome内核）支持该html5属性 】BEGIN-->

<input type="date"  id="statisDateBegin1"  name ="statisDateBegin" class="dateStyle1" />

<!--END-->

到

<input type="date"  id="statisDateEnd1" name ="statisDateEnd" class="dateStyle1" />

</td>

<td>

<input type="radio"  name="rdio_dateType" value="isAcct"  id="isAcct1" />

 记账日期：

<input type="date"  id="acctDateBegin1"  name ="acctDateBegin" class="dateStyle1" />

到

<input type="date"  id="acctDateEnd1" name="acctDateEnd" class="dateStyle1" />

<!-- 隐藏的排序参数 ，已通过前端解决，故已不用

<input type="hidden" name="orderTail" id="orderTail" value="default" />-->

</td>

</tr>


</table>

</form>

 

</div>

<!--condition end-->


<!--datatable start-->

<div id="datatable1">

<table id="table1" border="0" cellspacing="0" cellpadding="0">

<thead>

<tr>

<th class="field_01"><a href="javascript:void(0)">入库来源</a></th>

<th class="field_02"><a href="javascript:void(0)">品次</a></th>

<th class="field_03"><a href="javascript:void(0)">品种</a></th>

<th class="field_04"><a href="javascript:void(0)">进价金额</a></th>

<th class="field_05"><a href="javascript:void(0)">零售价金额</a></th>

<th class="field_06"><a href="javascript:void(0)">进销差额</a></th>

<th class="field_end"></th>

</tr>

</thead>

</table>

</div>

<!--datatable end-->


</div>



<script type="text/javascript">

$(function(){


//获取当前日期

getCurrentDate();


//初始化中间excel窗口（main.jsp中）

//var excelWindow=$('#excelWindow').centerWin();


//获取入库类型的下拉框内容

getImportType();


//表单提交

$('#submit1').click(function(){


//清空错误提示

$('#errorMsg1').text("");

//验证日期

if(dateValidate()){

//注意，这里千万不能直接传递formObj对象，因为jquery对象型的参数，不能被js识别（进入调用方法中后，会变成context对象）

//formObj=$('#form1');

var inStr="#form1";

var outStr="#datatable1";

url="statisByImportType/extract.do";

common.ajaxSubmit(inStr,outStr,url);

//console.info(123);

//console.info($('#table1 #tbody1').html());//首次点击，还未加载，不能显示，第二次点击，则可以；


//以json格式提交

//url="statisByImportType/extract_1.do";

    //common.ajaxSubmitByJson(inStr,outStr,url);

};

 

});


//获取原始的table

var protoObj=$('#table1');


//清屏功能

$('#clearScreen1').click(function(){

$('#datatable1').html(protoObj);

});


//点击#top_ul li，字体变红色，矢量图标变大

$('#top_ul li').mousedown(function(){

$(this).find('span').addClass('spanStyle');

$(this).find('i').addClass('iconStyle');

}).mouseup(function(){

$(this).find('span').removeClass('spanStyle');

$(this).find('i').removeClass('iconStyle');

});



//excel导出功能

$('#excelExport').click(function(){

//获取excel_Json

//在byImportType_extract.jsp中获取后台传过来的json数据，然后再次上传；

var excel_json=$('#statis_importType_excel_json').text();

//此时得到json是字符串形式，所以不能直接用excel_json.code来取

var code=excel_json.indexOf('"code":"0"');;

//console.info(excel_json);

if(code < 0){

$('#errorMsg1').text("对不起，没有数据可供导出");

}else{

var url="statisByImportType/exportExcel.do"

var outStr="#excelDiv"

common.ajaxSubmitByJsonObj(excel_json,outStr,url);

//excelWindow.show("slow");


//ajax div窗口测试

//var url="index.jsp"

//var outStr="#excelDiv"

//common.ajaxSubmitNoParam(outStr,url);

//excelWindow.show("slow");


//弹出新窗口测试

    //var path ="index.jsp";

  //openWindow(path,'700','400');

}


});


//退出功能

$('#exit1').click(function(){

$(this).exitTab();

});




});


 

/**调用函数：获取当前日期*/

function getCurrentDate(){

//document.getElementById('statisDateBegin1').valueAsDate = new Date();

var nodeList=$('.dateStyle1');

for(var i=0;i<nodeList.length;i++){

nodeList[i].valueAsDate=new Date();

}

};


/**调用函数：获取入库类型下拉框内容*/

function  getImportType(){

var mainObj=$('.importType');

//这一步，根据不同的后台语言，有所不同；

var importTypeJson=${importTypeJson};

var importType ="";


for(var i=0;i<importTypeJson.length;i++){

importType=importTypeJson[i].importType;

if(importType!="采购入库"){

var inputObj=$('<option value="'+importType+'">'+importType+'</option>');

inputObj.appendTo(mainObj);

}

}

var lastObj=$('<option value="全部">全部</option>');

lastObj.appendTo(mainObj);

};



/**调用函数：日期格式判断*/

function dateValidate(){


var statisDateBegin1=$('#statisDateBegin1').val();

var statisDateEnd1=$('#statisDateEnd1').val();

var acctDateBegin1=$('#acctDateBegin1').val();

var acctDateEnd1=$('#acctDateEnd1').val();


var isStatis1=$('#isStatis1:checked').val();

var isAcct1=$('#isAcct1:checked').val();


//var abc=$('input:radio[name="rdio_dateType"]:checked').val();


if(isStatis1=="isStatis"&&isAcct1==undefined){

if(statisDateBegin1==""||statisDateEnd1==""){

$('#errorMsg1').text("错误提示：日期格式有误");

return false;

}

if(statisDateBegin1 > statisDateEnd1){

$('#errorMsg1').text("开始日期必须小于结束日期");

return false;

}

}

if(isAcct1=="isAcct"&&isStatis1==undefined){

if(acctDateBegin1==""||acctDateEnd1==""){

$('#errorMsg1').text("错误提示：日期格式有误");

return false;

}

if(acctDateBegin1 > acctDateEnd1){

$('#errorMsg1').text("开始日期必须小于结束日期");

return false;

}

}

return true;

};


/**调用函数：弹出excel新窗口*/

function openWindow(sHref,strWidth,strHeight) {

  var strLeft=(screen.availWidth-strWidth)/2;

  var strTop=(screen.availHeight-strHeight)/2;

  var strRef="";

  strRef=strRef+"width="+strWidth+"px,height="+strHeight+"px,";

  strRef=strRef+"left="+strLeft+"px,top="+strTop+"px,";

  strRef=strRef+"resizable=yes,scrollbars=yes,status=yes,toolbar=no,systemmenu=no,location=no,borderSize=thin";//channelmode,fullscreen

  var openerobj= window.open(sHref,'newwin',strRef,false);

  openerobj.focus();

}


 


 


</script>






</body>

 

 

 

</html>

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 