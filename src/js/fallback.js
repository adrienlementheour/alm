import snif from './Snif';

function Fallback(body, html) {
    if (snif.isIOS()) html.addClass('is-ios');

    if (snif.isSafari()) html.addClass('is-safari');

    if (snif.isFirefox()) html.addClass('is-ff');

    if (snif.isIE()) html.addClass('is-ie');
}

export default Fallback;
