function sample(collection) {
  let randomIndex = Math.floor(Math.random() * collection.length)
  return collection[randomIndex]
}

function generateRandom() {

  //define things user might want
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = "1234567890"

  //create a collection to store things user picked up
  let collection = lowerCaseLetters + upperCaseLetters + numbers

  //start generating random
  let random = ''
  for (let i = 1; i <= 5; i++) {
    random += sample(collection)
  }

  //return random
  return random
}


function generateShortUrl() {
  let shortURL = `http://localhost:3000/${generateRandom()}`
  return shortURL
}
generateShortUrl()

module.exports = generateShortUrl