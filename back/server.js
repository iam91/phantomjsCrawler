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
const SITES = ['bing'];
const PHANTOM_OPTION = [
    '--ssl-protocol=any',
    '--ignore-ssl-errors=true'];

//launch server
app.use(express.static(FRONT_END_DIR));
server.listen(port, function(){
    console.log('Server listening on port: ' + port);
});

let api = io.of('/api');
api.on('connection', function(socket){
    console.log('A client connected to /api');
    socket.emit('ack', 'ack');
    socket.on('search', function(e){
        console.log(e);
        socket.emit('result', 'hahahha');
    });
});

app.get('/api', (req, res) => {
    let keyword = 'zwy';
    let phs = [];

    let resData = {};
    let cnt = 0;
    let send = function(){
        if( ++ cnt == SITES.length){ res.status(200).json(resData); }
    };

    let parse = function(d){
        var cap = /<<<<<(\d*)>>>>>/.exec(d);
        if(!cap) return null;
        var wrserverer = '<<<<<' + cap[1] + '>>>>>';
        cap = new RegExp(wrserverer + '(.*)' + wrserverer).exec(d);
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