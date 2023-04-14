const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const generateShortUrl = require('./generate_random')

const modelURL = require('./models/short-URL')

const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/shortener', (req, res) => {
  const inputURL = req.body.inputURL
  const shortURL = generateShortUrl()

  //在資料庫搜尋是否原始網址已在資料庫內,
  modelURL.findOne({ InputURL: inputURL })
    .lean()
    .then(result => {
      //沒有資料則新做短網址
      if (result === null) {
        modelURL.create({ InputURL: inputURL, finalURL: shortURL })
          .then(() =>
            res.render('shortener', { shortURL })
          )
          .catch(error => {
            console.log(error)
            res.render('errorPage', { error: error.message })
          })
        //若有資料則將對應的短網址送出來
      } else { res.render('shortener', { shortURL: result.finalURL }) }
    })
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })

})

app.get('/:random', (req, res) => {
  const random = req.params.random
  modelURL.findOne({ finalURL: `http://localhost:3000/${random}` })
    .then(result => {
      res.redirect(result.InputURL)
    })
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })
})

app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})