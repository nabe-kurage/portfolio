var NABE_WORK = NABE_WORK || {};

NABE_WORK.smooth_scroll = {
	init: function(){
        this.setparams();
        this.setevent();
	},
	setparams:function(){
        this.array_litem = [];
        this.$litem_nav = $('.litem-nav');
        this.width_window = $(window).width();
        this.height_window = $(window).height();
        this.eachlink();
    },
    eachlink: function(){
        var myself = this;
        this.$litem_nav.each(function(){
            myself.array_litem.push(new SetNavEvent($(this)));
        })
    },
    setevent: function(){
        $(window).on('resize', $.proxy(this.check_resize, this));
    },
    check_resize: function(){
        clearTimeout(this.timer_sizecheck);
        this.width_window = $(window).width();
        this.height_window = $(window).height();
        this.timer_sizecheck = setTimeout($.proxy(this.set_position, this), 100);
    },
    set_position: function(){
        if(this.width_window == $(window).width() && this.height_window == $(window).height()){
            for(i in this.array_litem){
                this.array_litem[i].reset_position();
            }
        }    
    }
}

SetNavEvent = function($target_litem){
    this.$target_litem = $target_litem;
    this.init();
}

SetNavEvent.prototype = {
    init: function(){
        this.setparams();
        this.setevnt();
    },
    setparams: function(){
        this.$link_nav = this.$target_litem.find('a');
        this.href_link = this.$link_nav.attr('href');
        this.href_link = this.href_link.substring(1,this.href_link.length);
        this.top_section = $('[name="'+ this.href_link +'"]').offset().top;
    },
    setevnt: function(){
        this.$link_nav.on('click',$.proxy(this.move_page, this))
    },
    move_page: function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop: this.top_section}, 700);
    },
    reset_position: function(){
        var myself = this;
        $('body').on('transitionend',function(){
            myself.top_section = $('[name="'+ myself.href_link +'"]').offset().top;
        })
    }
}

NABE_WORK.smooth_scroll.init();