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
setScreenAnimate(".screen-1");
setScreenAnimate(".screen-2");
setScreenAnimate(".screen-3");
setScreenAnimate(".screen-4");
setScreenAnimate(".screen-5");
// setScreenAnimate(".screen-4");
// setScreenAnimate(".screen-5");
function setScreenAnimate(screenCls){
	var screen=document.querySelector(screenCls);
	var animateElements = screenAnimateElements[screenCls];//方括号访问属性，获取到的屏幕元素
	var isSetAnimateClass = false;//是否初始化样式
	var isAnimateDone = false;//当前屏幕下所有子元素的状态是done吗？

	screen.onclick = function(){
		//是否初始化样式
		if (isSetAnimateClass === false) {
			for(var i=0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var basecls = element.getAttribute("class");
                //设置类名属性后缀
                element.setAttribute("class",basecls+" "+animateElements[i].substr(1)+"_animate_init");
			}
			isSetAnimateClass = true;
			return;
		}
		//当前屏幕下所有子元素的状态是done吗？init->done
		if (isAnimateDone === false) {
			for(var i=0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var basecls = element.getAttribute("class");
                //设置类名属性后缀
                element.setAttribute("class",basecls.replace("_animate_init","_animate_done"));
			}
			isAnimateDone = true;
			return;
		}else{
            for(var i=0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var basecls = element.getAttribute("class");
                //设置类名属性后缀
                element.setAttribute("class",basecls.replace("_animate_done","_animate_init"));
			}
			isAnimateDone = false;
			return;
		}
	}
}
