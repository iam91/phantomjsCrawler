/**
 * Created by zwy on 17-3-17.
 */
const express = require('express');
const child_process = require('child_process');
const path = require('path');

const port = 9090;
const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.get('/api', (req, res) => {
    let re = child_process.execFileSync(path.join(__dirname, '../run.sh'));
    console.log(re.toString());
    res.status(200).json(re.toString());
});

app.listen(port, function(){
    console.log('Server listening on port: ' + port);
});