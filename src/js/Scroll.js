import $ from 'jquery-slim';
import requestAnimFrame from './requestAnimFrame';
import throttle from './throttle';

const scroll = function() {
    this.scrollTop = $(window).scrollTop() || window.scrollY;
    this.event = null;
    this.scrollFunctions = [];

    this.scrollHandler = () => {
        this.scrollTop = $(window).scrollTop() || window.scrollY;

        this.scrollFunctions.forEach((f) => {
            f();
        });
    };

    this.addScrollFunction = (f) => {
        this.scrollFunctions.push(f);
    };


    this.init = () => {
        this.scrollHandler();
        $(window).on( 'scroll', throttle((e) => {
            this.event = e;
            requestAnimFrame(this.scrollHandler);
        }, 60));
    };
};

export default new scroll();
