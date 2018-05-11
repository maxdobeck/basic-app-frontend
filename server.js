const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'dist')))

const port = process.env.PORT
app.listen(port, () => console.log('Example app listening on port', port))