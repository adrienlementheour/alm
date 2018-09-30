import $ from 'jquery-slim';
import { TweenLite, CSSPlugin } from 'gsap/all';
import DrawSVGPlugin from './gsap-bonus/DrawSVGPlugin';
import 'intersection-observer';

import requestAnimFrame from './requestAnimFrame';
import throttle from './throttle';
import win from './Window';

const io = function io() {
    this.resized = true;
    const animTiming = 0.3;

    this.init = () => {
        const objectsToIO = [].slice.call(
            document.querySelectorAll('[data-io]')
        );

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio > 0.15) {
                        this[`${entry.target.dataset.io}In`](entry);
                        if (entry.target.hasAttribute('data-io-single'))
                            observer.unobserve(entry.target);
                    } else if (entry.intersectionRatio < 0.15) {
                        this[`${entry.target.dataset.io}Out`](entry);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '-100px 0px',
            }
        );

        objectsToIO.forEach(obj => {
            if (!obj.hasAttribute('data-io-observed')) {
                observer.observe(obj);
                $(obj).attr('data-io-observed', '');
            }
        });
    };

    this.slideImageIn = entry => {
        let el = $(entry.target);
        if ($(entry.target).find('.wrapper-img').length) {
            el = $(entry.target).find('.wrapper-img');
        }
        if ($(entry.target).find('.financiere-company-item').length) {
            el = $(entry.target).find('.financiere-company-item');
        }
        TweenLite.to(el, animTiming, {
            y: 0,
            opacity: 1,
        });
    };

    this.slideImageOut = entry => {
        let el = $(entry.target);
        if ($(entry.target).find('.wrapper-img').length) {
            el = $(entry.target).find('.wrapper-img');
        }
        if ($(entry.target).find('.financiere-company-item').length) {
            el = $(entry.target).find('.financiere-company-item');
        }
        TweenLite.to(el, animTiming, {
            y: -20,
            opacity: 0,
        });
    };

    this.slideTextIn = entry => {
        TweenLite.to(entry.target, animTiming, {
            y: 0,
            opacity: 1,
        });
    };

    this.slideTextOut = entry => {
        TweenLite.to(entry.target, animTiming, {
            y: 20,
            opacity: 0,
        });
    };
};

export default new io();
