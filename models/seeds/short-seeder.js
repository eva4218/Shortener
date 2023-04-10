const mongoose = require('mongoose')
const short = require('../short-URL')
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

  for (let i = 0; i < 10; i++) {
    short.create({ InputURL: `InputURL-${i}`, finalURL: `finalURL-${i}` })
  }

  console.log('done.')
})
