 // make a server and file handle module

 const http = require('http');
 const fs = require('fs');

 const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.end('Hello World');
    }
    if(req.url === '/home'){
        fs.readFile('Home.html', (err, data) => {
            res.end(data);
        });
    }
    if(req.url === '/about'){
        fs.readFile('About.html', (err, data) => {  
            res.end(data);
        });
    }
    if(req.url === '/index'){
        fs.readFile('Index.html', (err, data) => {
            res.end(data);
        });
    }
 });

 server.listen(3000, () => {
    console.log('Server is running on port 3000');
 });