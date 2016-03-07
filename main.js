! function() {

    function Lunbo() {
        if(!(this instanceof Lunbo)) return new Lunbo();
        this.indicators = document.querySelectorAll(".lunbo-indicators li");
        this.items = document.querySelectorAll(".lunbo-item");
        this.controls = document.querySelectorAll(".lunbo-control");
    }

    Lunbo.prototype = {
        constructor: Lunbo,

    	timerId: undefined,

        displayItem: function(idx) {
            this.items[idx].style.display = "block";
            this.indicators[idx].className = "active";
        },

        hideItem: function(idx) {
            this.items[idx].style.display = "none";
            this.indicators[idx].className = "none";
        },

        getDisplayItemIdx: function() {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].style.display == "block") {
                    return i;
                }
            }
        },

        initTimer: function(self) {
            self.timerId = setInterval(function() {
                var preIdx = self.getDisplayItemIdx();
                
                self.hideItem(preIdx);
                if(preIdx >= (self.items.length - 1)){
                	self.displayItem(0);
                }else{
                	self.displayItem(preIdx + 1);
                }
            }, 3000);
        },

        controlsBind: function(self) {
            var itemsLen = self.items.length;
            if (self.controls.length) {
                //上一页
                self.controls[0].onclick = function(e) {
                    var preIdx = self.getDisplayItemIdx();

                    self.hideItem(preIdx);
                    if (preIdx <= 0) {
                        self.displayItem(itemsLen - 1);
                    } else {
                        self.displayItem(preIdx - 1);
                    }


                };
                //下一页
                self.controls[1].onclick = function(e) {
                    var preIdx = self.getDisplayItemIdx();

                    self.hideItem(preIdx);
                    if (preIdx >= (itemsLen - 1)) {
                        self.displayItem(0);
                    } else {
                        self.displayItem(preIdx + 1);
                    }

                };
            }
        },

        indicatorsBind: function(self) {
            var indLen = self.indicators.length;
            if (indLen) {
                for (var i = 0; i < indLen; i++) {
                    ! function(idx) {
                        self.indicators[idx].onclick = function(e) {
                            var preIdx = self.getDisplayItemIdx();

                            self.hideItem(preIdx);
                            self.displayItem(idx);

                        };
                    }(i);
                }
            }

        },

        mouseBind: function(self){
        	var inner = document.querySelector(".lunbo-inner");

        	if(inner){
        		inner.onmouseover = function(e){
        			var timerId = self.timerId;
        			if(timerId){
        				clearInterval(timerId);
        			}
        		};

        		inner.onmouseout = function(e){
        			self.initTimer(self);
        		};
        	}
        },

        bindEvent: function() {
        	this.initTimer(this);
            this.controlsBind(this);
            this.indicatorsBind(this);
            this.mouseBind(this);
        }
    };

    (new Lunbo()).bindEvent();

}();
