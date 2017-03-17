/**
 * Created by zwy on 17-3-17.
 */
var url = 'http://cn.bing.com/';
var resultIndicator = 'search';
var selector = {
    txt: '#sb_form_q',
    btn: '#sb_form_go',
    lst: '#b_results',
    url: 'h2 > a'
};

module.exports = {
    url: url,
    selector: selector,
    resultIndicator: resultIndicator
};
