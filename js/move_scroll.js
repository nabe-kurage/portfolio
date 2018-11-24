var NABE_WORK = NABE_WORK || {};

NABE_WORK.move_scroll = {
	init: function(){
        this.setparams();
        this.setevent();
	},
	setparams: function(){
        this.$img_target = $('.img_falling');
        this.$section = $('.sec-skill');
        this.top_section = this.$section.offset().top;
        this.bottom_section = this.top_section + this.$section.innerHeight();
        this.width_window = $(window).width();
        this.height_window = $(window).height();
        this.judge = false;

    },
    setevent: function(){
        $(window).on('scroll', $.proxy(this.check_position, this));
    },
    check_position: function(){
        var top_window = $(window).scrollTop(); 
        var bottom_window = $(window).scrollTop() + this.height_window; 
        if( this.top_section > top_window &&  this.bottom_section< bottom_window　) {
            this.$img_target.addClass('is_active');
        }else {
            this.$img_target.removeClass('is_active');
        }
    }
}

NABE_WORK.move_scroll.init();
