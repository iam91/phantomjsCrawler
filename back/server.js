/**
 * Created by zwy on 17-3-17.
 */
"use strict";
//import dependencies
const socketio = require('socket.io');
const express = require('express');
const http = require('http');
const path = require('path');
const child_process = require('child_process');

//instantiate server and io
const port = 9090;
const app = express();
const server = http.Server(app);
const io = socketio(server);

//constants
const FRONT_END_DIR = path.join(__dirname, '../front');
const CRAWLER_DIR = path.join(__dirname, './crawler/crawler.js');
const SITES = ['bing', 'baidu'];
const PHANTOM_OPTION = [
    '--ssl-protocol=any',
    '--ignore-ssl-errors=true'
];

//launch server
app.use(express.static(FRONT_END_DIR));
server.listen(port, () => console.log(`Server listening on port: ${port}.`));

let api = io.of('/api');
api.on('connection', (socket) => {
    console.log('A client connected to /api.');

    socket.on('disconnect', () => console.log('A client disconnected.'));

    socket.on('search', (data) => {
        const keyword = data.keyword;
        console.log(`Search request with keyword: ${keyword}`);
        search(keyword);
    });
});

//biz
function parse(d){
    var cap = /<<<<<(\d*)>>>>>/.exec(d);
    if(!cap) return null;
    var wrapper = '<<<<<' + cap[1] + '>>>>>';
    cap = new RegExp(wrapper + '(.*)' + wrapper).exec(d);
    var data = JSON.parse(cap[1]);
    return data;
}

function search(keyword){
    SITES.forEach((site) => {
        let ph = child_process.spawn('phantomjs', PHANTOM_OPTION.concat([CRAWLER_DIR, keyword, site]));

        ph.stdout.on('data', (data) => {
            data = parse(data.toString());
            if(data){
                api.emit('result', {
                    status: true,
                    result: data
                });
            }
        });

        ph.stderr.on('data', (err) => {
            err = err.toString();
            console.log(err);
            api.emit('result', {
                status: false,
                result: err
            });
        });

        ph.on('close', (code) => console.log(`child process exited with code ${code}`));
    });
}