/**
 * Created by zwy on 17-3-22.
 */
var bing = {
    url: 'http://cn.bing.com/search?q=',
    selector: {
        txt: '#sb_form_q',
        btn: '#sb_form_go',
        url: '#b_results h2 > a'
    }
};

var baidu = {
    url: 'https://www.baidu.com/s?wd=',
    selector: {
        txt: '#kw',
        btn: '#su',
        url: '.c-container h3 a'
    }
};

var googlehk = {
    url: 'https://www.google.com.hk/#safe=strict&q=',
    selector: {
        url: '#ires h3 a'
    }
};

var yahoo = {
    url: 'https://search.yahoo.com/search?p=',
    selector: {
        url: '#results h3 a'
    }
};

module.exports = {
    bing: bing,
    baidu: baidu,
    yahoo: yahoo,
    googlehk: googlehk
};