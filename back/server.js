/**
 * Created by zwy on 17-3-17.
 */
"use strict";

const express = require('express');
const child_process = require('child_process');
const path = require('path');

const port = 9090;
const app = express();

const FRONT_END_DIR = path.join(__dirname, '../front');
const CRAWLER_DIR = path.join(__dirname, './crawler/crawler.js');
const SITES = ['baidu', 'bing'];
const PHANTOM_OPTION = [
    '--ssl-protocol=any',
    '--ignore-ssl-errors=true'];

app.use(express.static(FRONT_END_DIR));
app.get('/api', (req, res) => {
    let keyword = 'zwy';
    let phs = [];

    let resData = {};
    let cnt = 0;
    let send = function(){
        if( ++cnt == SITES.length){ res.status(200).json(resData); }
    };

    let parse = function(d){
        var cap = /<<<<<(\d*)>>>>>/.exec(d);
        if(!cap) return null;
        var wrapper = '<<<<<' + cap[1] + '>>>>>';
        cap = new RegExp(wrapper + '(.*)' + wrapper).exec(d);
        var data = JSON.parse(cap[1]);
        return data;
    };

    SITES.forEach((site, id) => {
        let ph = phs[id] = child_process.spawn('phantomjs', PHANTOM_OPTION.concat([CRAWLER_DIR, keyword, site]));
        let st = site;

        ph.stdout.on('data', (data) => {

            data = parse(data.toString());
            if(data){
                resData[st] = { data: data, status: true };
                send();
            }
        });

        ph.stderr.on('data', (err) => {
            err = err.toString();
            console.log(err);
            resData[st] = { data: err, status: false };
            send();
        });

        ph.on('close', (code) => console.log(`child process exited with code ${code}`));
    });
});

app.listen(port, function(){
    console.log('Server listening on port: ' + port);
});