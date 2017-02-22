// function draw(){
// 	var canvas=document.getElementById('draw-in-me');
// 	if(canvas.getContext){
// 		var ctx=canvas.getContext('2d');
// 		ctx.beginPath();
// 		ctx.moveTo(120.0,32.0);
// 		ctx.bezierCurveTo(120.0,36.4,116.4,40.0,112.0,40.0);
// 		ctx.lineTo(8.0,40.0);
// 		ctx.bezierCurveTo(3.6,40.0,0.0,36.4,0.0,32.0);
// 		ctx.lineTo(0.0,8.0);
// 		ctx.bezierCurveTo(0.0,3.6,3.6,0.0,8.0,0.0);
// 		ctx.lineTo(112.0,0.0);
// 		ctx.bezierCurveTo(116.4,0.0,120.0,3.6,120.0,8.0);
// 		ctx.lineTo(120.0,32.0);
// 		ctx.closePath();
// 		ctx.fill();
// 		ctx.lineWidth=2.0;
// 		ctx.strokeStyle="rgb(255,255,255)";
// 		ctx.stroke();
// 	}
// }
// function convertToGS(img){
// 	img.color=img.src;
// 	img.grayscale=createGSCanvas(img);
// 	img.onmouseover=function(){
// 		this.src=this.color;
// 	}
// 	img.onmouseout=function(){
// 		this.src=this.grayscale;
// 	}
// 	img.onmouseout();
// }
// function createGSCanvas(img){
// 	var canvas=document.createElement("canvas");
// 	canvas.width=img.width;
// 	canvas.height=img.height;
// 	var ctx=canvas.getContext("2d");
// 	ctx.drawImage(img,0,0);
// 	var c=ctx.getImageData(0,0,img.width,img.height);
// 	for(i=0;i<c.height;i++){
// 		for(j=0;j<c.width;j++){
// 			var x=(i*4)*c.height+(j*4);
// 			var r=c.data[x];
// 			var g=c.data[x+1];
// 			var b=c.data[x+2];
// 			c.data[x]=c.data[x+1]=c.data[x+2]=(r+g+b)/3;
// 		}
// 	}
// 	ctx.putImageData(c,0,0,0,0,c.width,c.height);
// 	return canvas.toDataURL();
// }
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
window.onload=placeholderSolution;
