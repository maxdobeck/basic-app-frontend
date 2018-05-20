const express = require('express')
const app = express()
const path = require('path')
const {check, validationResult} = require('express-validator/check')
const port = process.env.PORT

app.use(express.static(path.join(__dirname, 'dist')))

app.post("/validate/signup", [
  check('name').isAlphanumeric(),
  check('email').isEmail(),
  check('password').isLength({ min: 15 }),
  ], function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else {
      return res.status(200)
    }
})

app.listen(port, () => console.log('Listening on port', port))