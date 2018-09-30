import requestAnimFrame from './requestAnimFrame';
import throttle from './throttle';
import io from './io';

const Window = function Window() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.noTransitionElts = null;
    this.resizeFunctions = [];
    this.breakpoints = {
        desktop: 1100,
        desktopSmall: 960,
        tablet: 780,
        phone: 580,
        phoneSmall: 400,
    };

    let rtime;
    let timeout = false;
    const delta = 200;

    this.resizeend = () => {
        if (new Date() - rtime < delta) {
            setTimeout(this.resizeend, delta);
        } else {
            timeout = false;
            if (this.noTransitionElts) {
                this.noTransitionElts.classList.remove('no-transition');
            }
        }
    };

    this.noTransition = () => {
        if (this.noTransitionElts) {
            this.noTransitionElts.classList.add('no-transition');
        }
        rtime = new Date();

        if (timeout === false) {
            timeout = true;
            setTimeout(this.resizeend, delta);
        }
    };

    this.ioResize = () => {
        if (!io.resized) io.resized = true;
    };

    this.resizeHandler = () => {
        this.w = window.innerWidth;
        this.h = window.innerHeight;

        this.resizeFunctions.forEach(f => {
            f();
        });
    };

    this.addResizeFunction = f => {
        this.resizeFunctions.push(f);
    };

    this.init = () => {
        this.resizeFunctions = [this.noTransition, this.ioResize];
        window.addEventListener(
            'resize',
            throttle(() => {
                requestAnimFrame(this.resizeHandler);
            }, 60),
            false
        );
    };

    this.init();
};

export default new Window();
