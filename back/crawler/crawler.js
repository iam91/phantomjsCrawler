/**
 * Created by zwy on 17-3-16.
 */
var sys = require('system');
var page = require('webpage').create();
var sites = require('./sites');

var keyWord = sys.args[1];
var site = sys.args[2];
var info = sites[site];

function evalPage(status){
    if(status === 'success'){

        page.evaluate(function(keyWord, info){

            /*
             * parameters should be able to be serialized via JSON,
             * thus functions are not allowed
             */

            //helpers
            var getUrls = function(){
                var anchor = document.querySelectorAll(info.selector.url);
                var urls = Array.prototype.map.call(anchor, function(ele){
                    return ele.href;
                });
                return urls;
            };

            var wrap = function(str){
                "use strict";
                var rdn = '<<<<<' + Math.random().toString(10).slice(2) + '>>>>>';
                console.log(rdn + str + rdn);
            };

            var chck = function(){
                "use strict";
                var urls = getUrls();

                if(urls.length){
                    wrap(JSON.stringify(urls));
                }
                window.close();
            }
            chck();

        }, keyWord, info);
    }else{
        console.log('Unable to access network!');
        phantom.exit(1);
    }
};

page.onConsoleMessage = function(msg){
    console.log(msg);
};

page.onClosing = function(page){
    phantom.exit(0);
};

page.open(info.url + keyWord, evalPage);