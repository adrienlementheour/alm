import $ from 'jquery';

import { TweenLite, ScrollToPlugin } from 'gsap/all';

import '../scss/main.scss';

import io from './io';
import scroll from './Scroll';
import resize from './Resize';
import fallback from './fallback';

const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
};

const parseJSON = response => response.json();

const loadHandler = () => {
    const html = $('html');
    const body = $('body');

    io.init();
    scroll.init();
    resize.init();
    fallback(body, html);
};

if (document.readyState === 'complete') {
    loadHandler();
} else {
    window.onload = loadHandler;
}
