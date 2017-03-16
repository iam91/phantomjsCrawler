/**
 * Created by zwy on 17-3-16.
 */
var page = require('webpage').create();

// var urlBaidu = 'https://www.baidu.com';
var urlBing = 'http://cn.bing.com/';

var keyWord = 'zwy';

page.onUrlChanged = function(target){ console.log(target); };

page.onLoadFinished = function(status){
    console.log('Status: ' + status);

    if(status === 'success'){
        page.evaluate(function(keyWord){
            var url = document.location.href;
            if(url.indexOf('search') < 0){
                var txt = document.querySelector('#sb_form_q');
                var btn = document.querySelector('#sb_form_go');
                txt.value = keyWord;
                btn.click();
            }else{
                var list = document.querySelector('#b_results');
                console.log(list.children.length);
            }
        }, keyWord);
    }else{
        console.log('Unable to access network!');
    }
    // phantom.exit();
}

page.onConsoleMessage = function(msg){
    console.log(msg);
};

page.open(urlBing);