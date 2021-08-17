const bodyParser = require('body-parser')
const app = require('express')()
const session = require('express-session')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
require('dotenv').config({ path: '~/.env' })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
  secret: 'SOMErand0mS3Cret!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, // set expire date for 1 month
}))


// database connection
const pool = mysql.createPool({
  connectionLimit : 10,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  insecureAuth: true
})

app.all('/api/getJSON', (req, res) => {
  res.json({ data: 'data' })
})

app.post('/api/login', (req, res) => {
  try {
    // make db call and verify auth and return user data object
    // req.session.user = {
    //   email: 'derekshull@gmail.com'
    // }
    // res.json(req.session.user)
    const body = req.body;
    if (!(body.email && body.password)) {
      return res.status(400).send({ error: "Missing data." });
    }

    pool.query('SELECT * FROM users WHERE email=?', [body.email], function (passwordError, passwordResults) {
      if (passwordError) throw passwordError;

      const userResults = passwordResults[0]
      const hash = userResults.password
      bcrypt.compare(body.password, hash, function(bcryptError, bcryptResults) {
        if (bcryptError) throw bcryptError;
        if (bcryptResults === true) {
          req.session.user = {
            email: userResults.email,
            id: userResults.ID
          }
          res.json({ message: 'success' })
        } else {
          res.status(401).json({ error: 'Bad credentials' })
        }
        // else wrong password
      });
    });
  } catch (e) {
    res.status(401).json({ error: 'Bad credentials' })
  }
})

app.post('/api/signup', (req, res) => {
  try {
    const body = req.body;
    if (!(body.email && body.password && body.firstName && body.lastName)) {
      return res.status(400).send({ error: "Missing data." });
    }

    bcrypt.genSalt(10, (saltErr, salt) => {
      if (saltErr) throw saltErr;
      bcrypt.hash(body.password, salt, (hashErr, saltedPassword) => {
        if (hashErr) throw hashErr;
        pool.query('INSERT INTO users (FirstName, LastName, email, password, IsAdmin) VALUES (?, ?, ?, ?, ?)', [body.firstName, body.lastName, body.email, saltedPassword, 1], function (error, results) {
          if (error) throw error;
          res.json({ message: 'insterted row into '+results.insertId })
        });
      });
    });
  } catch (e) {
    console.log('error: ', e)
    res.status(500).json({ error: 'Couldnt create user' })
  }
})

app.get('/api/logout', (req, res) => {
  try {
    delete req.session.user
    res.json({ message: 'it worked!' })
  } catch (e) {
    res.status(401).json({ error: 'Bad logout' })
  }
})

module.exports = app