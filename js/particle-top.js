var NABE_WORK = NABE_WORK || {};

NABE_WORK.MAKE_PARCTICLE = {
    NUM_PARCICLE   : 100,
    SIZE_PARTICLE  : 2,
    SIZE_CHECK_DISTANCE: 100,
    SIZE_WINDOWMARGIN: 20,
    TIME_RENDER : 17,
    MAXSPEED_PARTICLE: 1,
    COLOR_PARCICLE : "hsl(210,70%,0%)",
    COLOR_BACKGROUND : "hsl(210,70%, 100%)",

    init: function(){
        this.setParams();
        this.setEnvironment();
        this.setEvent();
    },
    setParams: function(){
        this.canvas = document.getElementsByTagName("canvas")[0];
        this.context = this.canvas.getContext("2d");
        this.container = document.getElementById('jsi-wrap');
        this.width_window = this.container.offsetWidth;
        this.height_window = this.container.offsetHeight;
        this.arr_posiX = [];
        this.arr_posiY = [];
        this.arr_speedX = [];
        this.arr_speedY = [];
    },
    setEnvironment: function(){
        this.setParticle();
        setInterval($.proxy(this.timerEvent, this), this.TIME_RENDER);
    },
    setEvent: function(){
        window.addEventListener('resize',$.proxy(this.check_resize, this));
    },
    setParticle: function(){
        this.canvas.width = this.width_window;
        this.canvas.height = this.height_window;
        this.context.fillStyle = this.COLOR_BACKGROUND;
        this.context.fillRect(0,0,this.width_window, this.height_window);
        this.context.fillStyle = this.COLOR_PARCICLE;
        
        for(var i = 0; i<this.NUM_PARCICLE; i++){
            this.arr_posiX[i]= Math.floor(Math.random()*this.width_window);
            this.arr_posiY[i]= Math.floor(Math.random()*this.height_window);
            this.arr_speedX[i]= Math.random()*(this.MAXSPEED_PARTICLE + 1 - -this.MAXSPEED_PARTICLE) -this.MAXSPEED_PARTICLE;
            this.arr_speedY[i]= Math.random()*(this.MAXSPEED_PARTICLE + 1 - -this.MAXSPEED_PARTICLE) -this.MAXSPEED_PARTICLE;
        };
    },
    timerEvent: function(){
        this.context.fillStyle = this.COLOR_BACKGROUND;
        this.context.fillRect(0,0,this.width_window, this.height_window);

        for(var i = 0; i<this.NUM_PARCICLE; i++){
            this.arr_posiX[i] = this.arr_posiX[i]+ this.arr_speedX[i];
            this.arr_posiY[i] = this.arr_posiY[i]+ this.arr_speedY[i];
            this.context.fillStyle = this.COLOR_PARCICLE ;

            this.context.beginPath();
            if(this.arr_posiX[i] > this.width_window + this.SIZE_WINDOWMARGIN){
                this.arr_speedX[i] = -this.arr_speedX[i];
            }else if(this.arr_posiX[i] < 0 - this.SIZE_WINDOWMARGIN){
                this.arr_speedX[i] = -this.arr_speedX[i];
            }
            if(this.arr_posiY[i] > this.height_window + this.SIZE_WINDOWMARGIN){
                this.arr_speedY[i] = -this.arr_speedY[i];
            }else if(this.arr_posiY[i] < 0 - this.SIZE_WINDOWMARGIN){
                this.arr_speedY[i] = -this.arr_speedY[i];
            }
            this.context.arc(this.arr_posiX[i],this.arr_posiY[i],this.SIZE_PARTICLE,0,Math.PI*2);
            this.context.closePath();
            this.context.fill();

            for(var j = 0; j< i; j++){
                var distance = (this.arr_posiX[i] - this.arr_posiX[j]) **2 + (this.arr_posiY[i] - this.arr_posiY[j]) **2;
                if(distance < this.SIZE_CHECK_DISTANCE**2){
                    this.context.beginPath();
                    this.context.strokeStyle = "hsla(210,70%,30%,"+(0.5-distance/10000) +")";
                    this.context.lineWidth = 1;
                    this.context.moveTo(this.arr_posiX[i],this.arr_posiY[i]);
                    this.context.lineTo(this.arr_posiX[j],this.arr_posiY[j]);
                    this.context.closePath();
                    this.context.stroke();
                }
            }
        }
    },
    check_resize: function(){
        clearTimeout(this.timer_sizecheck);
            this.width_window = this.container.offsetWidth;
            this.height_window = this.container.offsetHeight;
        this.timer_sizecheck = setTimeout($.proxy(this.redrowCanvas, this), 100);
    },
    redrowCanvas: function(){
        if(this.width_window == this.container.offsetWidth && this.height_window == this.container.offsetHeight){
            this.setParticle();
        }
    }
}       
NABE_WORK.MAKE_PARCTICLE.init();
