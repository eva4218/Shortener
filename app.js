const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const generateShortUrl = require('./generate_random')

const localhost = 'http://localhost:3000'

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
  console.log(shortURL)
  return res.render('shortener', { shortURL })
})


app.get('/:random',(req,res)=>{
  const random = req.params.random
  res.send('ok')
})

app.listen(3000, () => {
  console.log(`App is running on ${localhost}`)
})