/**
 * Created by zwy on 17-3-26.
 */
"use strict";
import io from 'socket.io-client';
const socket = io('http://localhost:9090/api');

socket.on('result', (d) => {
    console.log(d);
});

export function search(keyword){
    socket.emit('search', { keyword: keyword });
};