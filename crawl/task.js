/**
 * Created by zwy on 17-3-16.
 */
var keyWord = 'zwy';
var site = 'bing';

var page = require('webpage').create();
var info = require('./' + site);

page.onUrlChanged = function(target){ console.log('ON_URL_CHANGE: ' + target); };

page.onLoadFinished = function(status){
    console.log('ON_LOAD_FINISHED: ' + status);
    if(status === 'success'){

        page.evaluate(function(keyWord, info){
            /*
             * params should be able to be serialized via JSON
             * thus functions are not allowed
             */

            var url = document.location.href;

            //helpers
            var search = function(keyWord){
                document.querySelector(info.selector.txt).value = keyWord;
                document.querySelector(info.selector.btn).click();
            };

            var getUrls = function(){
                var list = document.querySelector(info.selector.lst);
                var anchor = list.querySelectorAll(info.selector.url);
                var urls = Array.prototype.map.call(anchor, function(ele){
                    return ele.href;
                });
                return urls;
            };

            var isResult = function(url, indicator){
                return url.indexOf(indicator) >= 0;
            };

            //do
            if(isResult(url, info.resultIndicator)){
                var urls = getUrls();
                console.log(urls.length);
            }else{
                search(keyWord);
            }
        }, keyWord, info);
    }else{
        console.log('Unable to access network!');
    }
    // phantom.exit();
}

page.onConsoleMessage = function(msg){
    console.log(msg);
};

page.open(info.url);