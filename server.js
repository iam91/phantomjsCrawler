/**
 * Created by zwy on 17-3-17.
 */
const http = require('http');
const chdProc = require('child_process');

const server = http.createServer();

server.on('request', (req, res) => {
    let re = chdProc.execFileSync('./run.sh');
    res.write(re);
    res.end();
});

server.listen(9090);