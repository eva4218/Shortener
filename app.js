const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

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

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/shortURL',(req, res)=>{
  return res.render('shortener')
})

app.post('/shortener', (req,res)=>{
  const inputURL=req.body.inputURL

  return res.render('shortener')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})