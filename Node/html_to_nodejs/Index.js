const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({ extended: true }));

const PORT = 8990;

app.get(['/', '/home', '/about'], (req, res) => {
  let filename = '';
  switch (req.path) {
    case '/':
      filename = './Pages/Index.html';
      break;
    case '/home':
      filename = './Pages/Home.html';
      break;
    case '/about':
      filename = './Pages/About.html';
      break;
    default:
      res.status(404).send('Page not found');
      return;
  }
  fs.readFile(filename, (err, data) => {
    if (err) {
      res.status(500).send('Error loading page');
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`App will start on port ${PORT}..!!`);
});