const express = require('express')
const app = express()
const path = require('path')
const {check, validationResult} = require('express-validator/check')
const cors = require('cors')
const port = 3131// process.env.PORT

app.use(cors())

app.use(express.static(path.join(__dirname, 'dist')))

/* app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
  next()
}) */

app.post('/validate/signup', [
  check('name').isAlphanumeric(),
  check('email').isEmail(),
  check('password').isLength({ min: 10 })
],
function (err, req, res) {
  if (err) {
    console.error(err.stack)
    res.status(500).json({errors: 'Internal Server error while validating signup.'})
  }
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    console.log('response sent!', req.query)
    return res.status(200).json({ errors: errors.array() })
  }
})

app.listen(port, () => console.log('Listening on port', port))
