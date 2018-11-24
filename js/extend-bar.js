var NABE_WORK = NABE_WORK || {};

NABE_WORK.extend_bar = {
	init: function(){
		this.setParams();
		this.setEvent();
	},
	setParams:function(){
        this.$litem = $('.litem-skill');
        this.array_target = [];
        this.setArray()
    },
    setArray: function(){
        var myself = this;
        this.$litem.each(function(){
            myself.array_target.push(new SetBarEvent($(this)));
        })
    },
    setEvent: function(){
        $(window).on('scroll load resize', $.proxy(this.check_bar, this));
    },
    check_bar: function(){
        var top_window = $(window).scrollTop();
        var bottom_window = top_window + $(window).height();
        for(i in this.array_target){
            this.array_target[i].extend_bar(top_window,bottom_window)
        }
    }
}

var SetBarEvent = function($target_litem){
    this.$target_litem = $target_litem;
    this.init();
};
SetBarEvent.prototype = {
    init: function(){
        this.setParams();
    },
    setParams: function(){
        this.$bar_inner = this.$target_litem.find('.inner-bar');
        this.top_bar =  this.$target_litem.offset().top;
        this.bottom_bar =  this.top_bar + this.$target_litem.height();
        this.rate_bar = this.$bar_inner.attr('data-num');
    },
    extend_bar: function(top_window,bottom_window){
        if(this.top_bar >= top_window && this.bottom_bar <= bottom_window || 
            this.top_bar <= top_window && this.bottom_bar >= bottom_window ){
            this.$bar_inner.css({width: this.rate_bar +"%"});
        }
    }
}

NABE_WORK.extend_bar.init();