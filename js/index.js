//获取元素
var getElem = function (selector) {
	return document.querySelector(selector);
}

var getAllElem = function (selector){
	return document.querySelectorAll(selector);
}


//获取元素样式
var getCls = function (element){
	return element.getAttribute("class");
}
//设置元素样式
var setCls = function (element,cls){
	return element.setAttribute("class" ,cls);
}

//为元素添加样式
var addCls = function(element,cls){
    var baseCls = getCls(element);
    if( baseCls.indexOf(cls) ===-1){
    	setCls( element,baseCls+" "+cls);
    }
}
//为元素删除样式
var delCls = function(element,cls){
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls) !=-1) {
		setCls( element,baseCls.split(cls).join(" ").replace(/\s+/g," "));
	}
}

var screenAnimateElements = {//创建一个对象，含有屏幕中的元素
	'.screen-1':[
	    '.screen-1__heading',
		'.screen-1__phone',
		'.screen-1__shadow'//最后不能逗号，IE8之前浏览器兼容问题
		],
	".screen-2":[
	   ".screen-2__point_i_1",
	   ".screen-2__point_i_2",
	   ".screen-2__point_i_3",
       ".screen-2__subheading",
       ".screen-2__phone",
       ".screen-2__heading"
		],		
	".screen-3":[
       ".screen-3__subheading",
       ".screen-3__phone",
       ".screen-3__heading",
       ".screen-3__features"
		],
	".screen-4":[
       ".screen-4__subheading",
       ".screen-4__heading",
       ".screen-4__type__item_i_1",
       ".screen-4__type__item_i_2",
       ".screen-4__type__item_i_3",
       ".screen-4__type__item_i_4"
       ],
       ".screen-5":[
       ".screen-5__subheading",
       ".screen-5__heading",
       ".screen-5__bg"
       ]

		//screenAnimateElements:屏幕元素对象；
		//animateElements:选择某个屏幕的元素组成的数组；
	    //element：选择数组元素；
	    //basecls: 获取到的类名；
}
//初始化屏幕
var setScreenAnimateInit=function(screenCls){
	var screen=document.querySelector(screenCls);//获取当前屏幕
	var animateElements = screenAnimateElements[screenCls];//获取当前屏幕元素,数组
	for(var i=0;i<animateElements.length;i++){
		var element = document.querySelector(animateElements[i]);
		var basecls = element.getAttribute("class");
		element.setAttribute("class",basecls+" "+animateElements[i].substr(1)+"_animate_init");
	}
}
//进行屏幕动画
var playScreenAnimatedone=function(screenCls){
	var screen=document.querySelector(screenCls);//获取当前屏幕
	var animateElements = screenAnimateElements[screenCls];//获取当前屏幕元素,数组
	for(var i=0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var basecls = element.getAttribute("class");
                //设置类名属性后缀
                element.setAttribute("class",basecls.replace("_animate_init","_animate_done"));
			}
			isAnimateDone = true;
			return;
}
//顶部导航
var navItems=getAllElem(".header__nav-item");
//侧边导航
var outLineItems=getAllElem(".outline__item");
//顶部导航下划线
var navTip=getElem(".header__nav-item__tip");
//顶部导航改变样式
var switchNavItemsActive =function( idx ){
	for (var i=0;i<navItems.length;i++){
		delCls(navItems[i],"header__nav-item_status_active");
	}
	addCls(navItems[idx],"header__nav-item_status_active");
}

//侧边导航改变样式
var switchoutLineItemsActive =function(idx){
	for (var i=0;i<outLineItems.length;i++){
		delCls(outLineItems[i],"outline__item_status_active");
	}
	addCls(outLineItems[idx],"outline__item_status_active");
}


//当屏幕载入的时候，不初始化第一屏动画
window.onload =function(){
	for (k in screenAnimateElements){
		if(k===".screen-1"){
           continue;
		}
		setScreenAnimateInit(k);
	}
}


//屏幕滚动
window.onscroll =function(){
     var top=document.body.scrollTop;
     // 设置导航条
     if (top>80) {
     	addCls(getElem(".header"),"header_status_black");
     	addCls(getElem(".outline"),"outline_status_in");
     }else {
     	delCls(getElem(".header"),"header_status_black");
     	delCls(getElem(".outline"),"outline_status_in");
     	switchNavItemsActive(0);
     	switchoutLineItemsActive(0);
     }
     //分屏触动动画
     if (top>1) {
     	playScreenAnimatedone(".screen-1");
     	navTip.style.left=0*70+"px";
     }

     if (top>650) {
     	playScreenAnimatedone(".screen-2");
     	switchNavItemsActive(1);
     	switchoutLineItemsActive(1);
     	navTip.style.left=1*70+"px";
     }

     if (top>1300) {
     	playScreenAnimatedone(".screen-3");
     	switchNavItemsActive(2);
     	switchoutLineItemsActive(2);
     	navTip.style.left=2*70+"px";
     }

     if (top>1900) {
     	playScreenAnimatedone(".screen-4");
     	switchNavItemsActive(3);
     	switchoutLineItemsActive(3);
     	navTip.style.left=3*70+"px";
     }

     if (top>2550) {
     	playScreenAnimatedone(".screen-5");
     	switchNavItemsActive(4);
     	switchoutLineItemsActive(4);
     	navTip.style.left=4*70+"px";
     }
}

//楼层跳跃
var navItemsJump=function(i){
	var item=navItems[i];
	item.onclick=function(){
		document.body.scrollTop=800*i;
	}
}
var outLineJump=function(i){
	var item=outLineItems[i];
	item.onclick=function(){
		document.body.scrollTop=800*i;
	}
}
for (var i =0; i<navItems.length;i++ ) {
	navItemsJump(i);
}
for (var i =0; i<outLineItems.length;i++ ) {
	outLineJump(i);
}

setTimeout(function(){
	playScreenAnimatedone(".screen-1");
},500);

// 滑动门

var setTip=function(i){
    navItems[i].onmouseover = function(){
       navTip.style.left=i*70+"px";
    }
    var activeIdx=0;
    navItems[i].onmouseout = function(){
    	for (var i=0;i<navItems.length;i++){
       	if(getCls(navItems[i]).indexOf("header__nav-item_status_active")>-1){
       		activeIdx=i;
       		break;
       	}
      }
      navTip.style.left=activeIdx*70+"px";
    }
 }
for (var i=0;i<navItems.length;i++){
    setTip(i);
}