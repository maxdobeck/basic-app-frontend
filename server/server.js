const express = require('express')
const app = express()
const path = require('path')
const {check, validationResult} = require('express-validator/check')
const history = require('connect-history-api-fallback')
const cors = require('cors')
const port = process.env.PORT

var corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions))

app.use(history({
  disableDotRule: true
}))

console.log(__dirname)
app.use(express.static(path.join(__dirname, '../dist')))

app.post('/validate/signup', [
  check('name').isAlphanumeric(),
  check('email').isEmail(),
  check('password').isLength({ min: 10 })
], function (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    console.log('response sent!', req.query)
    return res.status(200).json({ errors: errors.array() })
  }
})

app.listen(port, () => console.log('Listening on port', port))
