var NABE_WORK = NABE_WORK || {};

NABE_WORK.menu_drawer = {
	init: function(){
        this.setparams();
        this.setevent();
	},
	setparams: function(){
        this.$wrap_all = $("main");
        this.$wrap_menu = $("wrap-menu");
        this.$btn_menu = $(".btn-menu");
        this.$ltem_nav = $(".litem-nav");
        
        this.$wrap_contents = $(".wrap-contents");

        this.judge_menu = false;
    },
    setevent: function(){
        this.$btn_menu.on('click',$.proxy(this.reveal_menu, this));
        this.$ltem_nav.on('click',$.proxy(this.reveal_menu, this));
    },
    reveal_menu: function(){
        this.judge_menu = !this.judge_menu;
        if(this.judge_menu){
            this.posi_scroll = window.pageYOffset;
            this.$wrap_all.addClass('is_open');
            $('body').css({overflow:'hidden'});
        }else {
            this.$wrap_all.removeClass('is_open');
            $('body').css({overflow:'scroll'});
        }
    }
}

NABE_WORK.menu_drawer.init();