const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'dist')))
app.get('/', (req, res) => res.send('index.html'))

const config = require('./config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
app.listen(port, () => console.log('Example app listening on port', port))