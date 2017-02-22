addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(getNewContent);
addLoadEvent(displayAbbreviations);
addLoadEvent(displayAccesskeys);
addLoadEvent(function(){styleHeaderSiblings("h1","intro");});
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(positionMessage);
addLoadEvent(prepareSlideshow);
addLoadEvent(placeholderSolution);
//=======通用型函数=======
//检查浏览器是否支持某种类型的输入控件,传入输入控件的某种类型就可以了inputSupportsType('date')
function inputSupportsType(type){
	if(!document.createElement)return false;
	var input=document.createElement('input');
	input.setAttribute('type',type);
	if(input.type=='text'&&type!='text'){
		return false;
	}else{
		return true;
	}
}
//只接受form对象的函数检验placeholder
function resetFields(whichform){
	if(elementSupportsAttribute('input','placeholder'))return;
	for(var i=0;i<whichform.elements.length;i++){
		var element=whichform.element[i];
		if(element.type=="submit")continue;
		var check=element.placeholder||element.getAttribute('placeholder');
		if(!check)continue;
		element.onfocus=function(){
			var text=this.placeholder||this.getAttribute(placeholder);
			if(this.value==text){
				this.className='';
				this.value="";
			}
		}
		element.onblur=function(){
			if(this.value==""){
				this.className='placeholder';
				this.value=this.placeholder||this.getAttribute('placeholder');
			}
		}
		element.onblur();
	}
}
//循环遍历所有form对象,1、验证失败返回false，2、ajax成果发送返回false阻止第二次发送，3、ajax通过但是没有发送成功，返回true提交表单
function prepareForms(){
	for(var i=0;i<document.forms.length;i++){
		var thisform=document.forms[i];
		resetFields(thisform);
		thisForm.onsubmit=function(){
			if(!validateForm(this))return false;
			var article=document.getElementsByTagName('article')[0];
			if(submitFormWithAjax(this,article)){return false};
			return true;
		}
	}
}
//检查特定的属性是否支持,需要传入元素名和要检查的属性名elementSupportsAttribute('input','placeholder')
function elementSupportsAttribute(elementName,attribute){
	if(!document.createElement)return false;
	var temp=document.createElement(elementName);
	return (attribute in temp);
}
//解决不支持placeholder的浏览器的函数
function placeholderSolution(){
	if(!elementSupportsAttribute('input','placeholder')){
		var input=document.getElementsByTagName('input');
		var i;
		for(i=0;i<input.length;i++){
			input[i].onfocus=function(){
				//不同浏览器对未知属性的实现方式不同，使用两种获取方法
				var text=this.placeholder||this.getAttribute('placeholder');
				if(this.value==text){
					this.value='';
				}
			}
			input[i].onblur=function(){
				if(this.value==''){
					this.value=this.placeholder||this.getAttribute('placeholder');
				}
			}
			input[i].onblur();
		}
	}
}
//可用于设置加载完页面之后再执行多个函数，例如：addLoadEvent（firstFunction）；addLoadEvent（secondFunction）；
function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload!='function'){
		window.onload=func;
	}else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}
//insertAfter函数实现将元素添加到目标元素后面
function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
//为了兼容所有浏览器的xmlhttp对象
function getHTTPObject(){
	if(typeof XMLHttpRequest=="undefined"){
		XMLHttpRequest=function(){
			try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
			catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
			catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP");}
			catch(e){}
			return false;
		}
	}
	return new XMLHttpRequest();
}
//获取下一个元素节点
function getNextElement(node){
	if(node.nodeType==1){
		return node;
	}
	if(node.nextSibling){
		return getNextElement(node.nextSibling);
	}
	return null;
}
//=====================
//根据元素在节点树里的位置来设置样式原本具体为h1和类intro，现在抽象为较为通用的函数
function styleHeaderSiblings(tag,theclass){
	if(!document.getElementsByTagName)return false;
	var elems=document.getElementsByTagName(tag);//document.getElementsByTagName(h1);
	var elem;
	for(var i=0;i<elems.length;i++){
		elem=getNextElement(elems[i].nextSibling);
		addClass(elem,theclass);//addClass(elem,"intro");
		/*className属性是替换类，元素原有的类会被替换成新的类
		elem.className="intro";
		elem.style.fontWeight="bold";
		elem.style.fontSize="1.2em";
		elem.style.color="#69c";*/
	}
}
//函数用于元素在原有类的基础上再加一个类
function addClass(element,value){
	if(!element.className){
		element.className=value;
	}else{
		newClassName=element.className;
		newClassName+="";
		newClassName+=value;
		element.className=newClassName;
	}
}
// addLoadEvent(displayCitations);
//javascript手动添加图片和介绍性文字
function preparePlaceholder(){
	if(!document.createElement)return false;
	if(!document.createTextNode)return false;
	if(!document.getElementById)return false;
	if(!document.getElementById("imagegallery"))return false;
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","../images/01.jpg");
	placeholder.setAttribute("alt","choose one");
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var desctext=document.createTextNode("choose an image");
	description.appendChild(desctext);
	var gallery=document.getElementById("imagegallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);
	
}
//检测浏览器是否支持getElementsByTagName，getElementsById以及是否存在id“imagegallery”
function prepareGallery(){
	if(!document.getElementsByTagName)return false;
	if(!document.getElementById)return false;
	if(!document.getElementById("imagegallery"))return false;
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			return showPic(this)?false:true;
		}
		// links[i].onkeypress=links[i].onclick;最好不要使用onkeypress，onclick对键盘访问的支持相当完美
	}
}
//检测是否存在两个id的元素，检测元素是否是文本元素是否是图片，各种检测根据实际需要来操作
function showPic(whichpic){
	if(!document.getElementById("placeholder"))return false;
	var source=whichpic.getAttribute("href");
	var placeholder=document.getElementById("placeholder");
	if(placeholder.nodeName!="IMG")return false;
	placeholder.setAttribute("src",source);
	if(!document.getElementById("description")){
		var text=whichpic.getAttribute("title")?whichpic.getAttribute("title"):"";
		var description=document.getElementById("description");
		if(description.firstChild.nodeType==3){
			description.firstChild.nodeValue=text;
		}
	}
	return true;
}
//ajax请求
function getNewContent(){
	var request=getHTTPObject();
	if(request){
		request.open("GET","example.txt",true);
		request.onreadystatechange=function(){
			if(request.readyState==4){
				var para=document.createElement("p");
				var txt=document.createTextNode(request.responseText);
				para.appendChild(txt);
				document.getElementById('new').appendChild(para);
			}
		};
		request.send(null);
	}else{
		alert('sorry,your browser doesn\'t support XMLHttpRequest');
	}
}
//显示缩略语列表
function displayAbbreviations(){
	if(!document.getElementsByTagName||!document.createElement||!document.createTextNode)return false;
	//取得所有缩略词
	var abbreviations=document.getElementsByTagName("abbr");
	if(abbreviations.length<1){return false;}
	var defs=new Array();
	//遍历缩略词
	for(var i=0;i<abbreviations.length;i++){
		var current_abbr=abbreviations[i];
		if(current_abbr.childNodes.length<1){continue;}//如果当前元素没有子节点就立刻开始下一次子循环
		var definition=current_abbr.getAttribute("title");
		var key=current_abbr.lastChild.nodeValue;
		defs[key]=definition;
	}
	//创建定义列表
	var dlist=document.createElement("dl");
	//遍历定义
	for(key in defs){
		var definition=defs[key];
		//创建定义标题
		var dtitle=document.createElement("dt");
		var dtitle_text=document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		//创建定义描述
		var ddesc=document.createElement("dd");
		var ddesc_text=document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		//把它们添加定义列表
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if(dlist.childNodes.length<1)return false;
	//创建标题
	var header=document.createElement("h2");
	var header_text=document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	//把标题添加到页面主体
	document.body.appendChild(header);
	//把定义列表添加到页面主体
	document.body.appendChild(dlist);
}
//显示“文献来源链接表”
function displayCitations(){
	if(!document.getElementsByTagName||!document.createElement||!document.createTextNode)return false;
	var quotes=document.getElementsByTagName("blockquote");
	for(var i=0;i<quotes.length;i++){
		if(!quotes[i].getAttribute("cite"))continue;
		var url=quotes[i].getAttribute("cite");
		var quoteChildren=quotes[i].getElementsByTagName('*');
		if(quoteChildren.length<1)continue;
		var elem=quoteChildren[quoteChildren.length-1];
		var link=document.createElement("a");
		var link_text=document.createTextNode("source");
		link.appendChild(link_text);
		link.setAttribute("href",url);
		var superscript=document.createElement("sup");
		superscript.appendChild(link);
		elem.appendChild(superscript);
	}
}
//显示“快捷键清单”
function displayAccesskeys(){
	if(!document.getElementsByTagName||!document.createElement||!document.createTextNode)return false;
	var links=document.getElementsByTagName("a");
	var akeys=new Array();
	for(var i=0;i<links.length;i++){
		var current_link=links[i];
		if(!current_link.getAttribute("accesskey"))continue;
		var key=current_link.getAttribute("accesskey");
		var text=current_link.lastChild.nodeValue;
		akeys[key]=text;
	}
	var list=document.createElement("ul");
	for(key in akeys){
		var text=akeys[key];
		var str=key+":"+text;
		var item=document.createElement("li");
		var item_text=document.createTextNode(str);
		item.appendChild(item_text);
		list.appendChild(item);
	}
	var header=document.createElement("h3");
	var header_text=document.createTextNode("Accesskeys");
	header.appendChild(header_text);
	document.body.appendChild(header);
	document.body.appendChild(list);
}
//设置表格单双行不同背景颜色
function stripeTables(){
	if(!document.getElementsByTagName)return false;
	var tables=document.getElementsByTagName("table");
	var odd,rows;
	for(var i=0;i<tables.length;i++){
		odd=false;
		rows=tables[i].getElementsByTagName("tr");
		for(var j=0;j<rows.length;j++){
			if(odd==true){
				rows[j].style.backgroundColor="#ffc";
				odd=false;
			}else{
				rows[j].style.backgroundColor="#fff";
				odd=true;
			}
		}
		
	}
}
//鼠标悬停表格当前行字体加粗
function highlightRows(){
	if(!document.getElementsByTagName)return false;
	var rows=document.getElementsByTagName("tr");
	for(var i=0;i<rows.length;i++){
		rows[i].onmouseover=function(){
			this.style.fontWeight="bold";
		}
		rows[i].onmouseout=function(){
			this.style.fontWeight="normal";
		}
	}
}
//设置元素初始位置的函数
function positionMessage(){
	if(!document.getElementById)return false;
	if(!document.getElementById("message"))return false;
	var elem=document.getElementById("message");
	elem.style.position="absolute";
	elem.style.left="50px";
	elem.style.top="50px";
	moveElement("message",200,200,10);
}
//移动元素的函数
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById)return false;
	if(!document.getElementById(elementID))return false;
	var elem=document.getElementById(elementID);
	if(elem.movement){
		//elem既不能使用全局变量，也不能使用局部变量，使用只与某个特定元素有关的变量————属性如element.foo="bar"
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left="0px";
	}
	if(!elem.style.top){
		elem.style.top="0px";
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	var dist=0;
	if(xpos==final_x&&ypos==final_y){
		return true;
	}
	if(xpos<final_x){
		//加快移动速度，如果除下来的数小于1，用ceil方法向上取整
		dist=Math.ceil((final_x-xpos)/10);
		xpos=xpos+dist;
	}
	if(xpos>final_x){
		dist=Math.ceil((xpos-final_x)/10);
		xpos=xpos-dist;
	}
	if(ypos<final_y){
		dist=Math.ceil((final_y-ypos)/10);
		ypos=ypos+dist;
	}
	if(ypos>final_y){
		dist=Math.ceil((ypos-final_y)/10);
		ypos=ypos-dist;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);
}
//根据用户鼠标移动到哪个链接上图片向左向右移动
function prepareSlideshow(){
	if(!document.getElementsByTagName)return false;
	if(!document.getElementById)return false;
	if(!document.getElementById("linklist"))return false;
	var slideshow=document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var preview=document.createElement("img");
	preview.setAttribute("src","../images/02.jpg");
	preview.setAttribute("alt","flower");
	preview.setAttribute("id","preview");
	preview.setAttribute("width","550px");
	preview.setAttribute("height","auto");
	slideshow.appendChild(preview);
	var list=document.getElementById("linklist");
	insertAfter(slideshow,list);
	// if(!document.getElementById("preview"))return false;
	// var preview=document.getElementById("preview");
	// preview.style.position="absolute";
	// preview.style.left="0px";moveElement函数增加判断left和top的值是否存在的判断，此处可删除
	// preview.style.top="0px";
	// var list=document.getElementById("linklist");
	var links=list.getElementsByTagName("a");
	links[0].onmouseover=function(){
		moveElement("preview",-100,0,10);
	}
	links[1].onmouseover=function(){
		moveElement("preview",-200,0,10);
	}
	links[2].onmouseover=function(){
		moveElement("preview",-300,0,10);
	}
}
//该函数接受一个dom元素作为参数把它所有的子元素都删除掉，再把图像加进去
function displayAjaxLoading(element){
	while(element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content=document.createElement("img");
	content.setAttribute("src","../images/01.jpg");
	content.setAttribute("alt","Loading。。。。。。");
	element.appendChild(content);
}
//提交表单使用ajax执行表单拦截提交任务
function submitFormWithAjax(whichform,thetarget){
	var request=getHTTPObject();
	if(!request){return false;}
	displayAjaxLoading(thetarget);
	var dataParts=[];
	var element;
	for(var i=0;i<whichform.element.length;i++){
		element=whichform.elements[i];
		dataParts[i]=element.name+'='+encodeURIComponent(element.value);
	}
	var data=dataParts.join('&');
	request.open('POST',whichform.getAttribute("action"),true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.onreadystatechange=function(){
		if(request.readyState==4){
			if(request.status==200||request.status==0){
				var matches=request.reponseText.match(/<article>([\s\S]+)<\/article>/);
				if(matches.length>0){
					thetarget.innerHTML=matches[1];
				}else{
					thetarget.innerHTML='<p>Oops,there was an error.Sorry.</p>';
				}
			}else{
				thetarget.innerHTML='<p>'+request.statusText+'</p>';
			}
		}
	};
	request.send(data);
	return true;
}
/*笔记：
1、注意：getElementById，getElementsByTagName，getElementsByClassName中的Element后面有没有s！！
2、nodeType属性总共有12种可取值，元素节点为1，属性节点为2，文本节点为3.
3、readyState属性的值有五种：0表示未初始化，1表示正在加载，2表示加载完毕，3表示正在交互，4表示完成
4、IE6以下或旧版本的window系统的浏览器不支持abbr,源于浏览器大战--微软和网景
5、Math.ceil向上取整，Math.floor向下取整，Math.round四舍五入取整
*/
