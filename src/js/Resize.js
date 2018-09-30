import $ from 'jquery-slim';
import requestAnimFrame from './requestAnimFrame';
import throttle from './throttle';

const resize = function() {
    this.windowWidth = $(window).outerWidth();
    this.event = null;
    this.resizeFunctions = [];

    this.resizeHandler = () => {
        this.windowWidth = $(window).outerWidth();

        this.resizeFunctions.forEach((f) => {
            f();
        });
    };

    this.addResizeFunction = (f) => {
        this.resizeFunctions.push(f);
    };


    this.init = () => {
        this.resizeHandler();
        $(window).on( 'resize', throttle((e) => {
            this.event = e;
            requestAnimFrame(this.resizeHandler);
        }, 60));
    };
};

export default new resize();