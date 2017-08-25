/*!
 * @author ZhuKaiFeng
 * @param  {scrollId} String,Element id
 * @version 1.1
 * @example var test = new stopIosPage({ scrollId:"test"})
 */   
    ; (function (window, document) {
        var stopIosPage = function (options) {
            
            if (!(this instanceof stopIosPage)) {
                return new stopIosPage;
            }

            //参数合并
            this.options = {
                scrollId: options.scrollId || null,
            }
            this.startX = 0;
            this.startY = 0;
            this._ss = document.getElementById(this.options.scrollId); //滚动元素
            try {
                this.borderHeight = parseFloat(getComputedStyle(this._ss).borderTopWidth) + 
                                parseFloat(getComputedStyle(this._ss).borderBottomWidth); //滚动元素上下border和  Number
                this.init();
            }catch(e){
                console.error("warning:maybe your use an error element id parameter scrollId must be String")
            }           
        };

        stopIosPage.prototype = {
            init: function () {
                document.addEventListener('touchstart', function(evt){                   
                    this.touchStartFunc(evt);
                }.bind(this), false);
                this._ss.addEventListener('touchmove',function(ev){                
                    this.areaTouchmove(ev)
                }.bind(this),false);
            },
            //touchstart事件  
            touchStartFunc: function (evt) {
                try {
                    //evt.preventDefault();     //阻止触摸时浏览器的缩放、滚动条滚动等  
                    var touch = evt.touches[0]; //获取第一个触点  
                    var x = Number(touch.pageX); //页面触点X坐标  
                    var y = Number(touch.pageY); //页面触点Y坐标  
                    //记录触点初始位置  
                    this.startX = x;
                    this.startY = y;
                } catch (e) {
                    console.error('touchSatrtFunc：' + e.message);
                }
            },
            //触摸事件
            areaTouchmove: function (ev) {
                var me = this._ss;
                var borderHeight = this.borderHeight;
                var _point = ev.touches[0],              
                    _top = me.scrollTop;
                // 什么时候到底部
                var _bottomFaVal = me.scrollHeight + borderHeight - me.offsetHeight;
                // 到达顶端
                if (_top === 0) {
                    // 阻止向下滑动
                    if (_point.clientY > this.startY) {
                        ev.preventDefault();
                    } else {
                        // 阻止冒泡
                        // 正常执行
                        ev.stopPropagation();
                    }
                } else if (_top === _bottomFaVal) {
                    // 到达底部
                    // 阻止向上滑动
                    if (_point.clientY < this.startY) {
                        ev.preventDefault();
                    } else {
                        // 阻止冒泡
                        // 正常执行
                        ev.stopPropagation();
                    }
                } else if (_top > 0 && _top < _bottomFaVal) {
                    ev.stopPropagation();
                } else {           
                    ev.preventDefault();
                }
            }

        }
        window.stopIosPage = stopIosPage;
    }(window, document));