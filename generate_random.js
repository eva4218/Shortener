function sample(collection) {
  let randomIndex = Math.floor(Math.random() * collection.length)
  return collection[randomIndex]
}

function generatePassword() {

  //define things user might want
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = "1234567890"

  //create a collection to store things user picked up
  let collection = lowerCaseLetters + upperCaseLetters + numbers

  collection = collection.split('')

  //start generating password
  let password = ''
  for (let i = 1; i <= 5; i++) {
    password += sample(collection)
  }

  //return password
  return password
}

module.exports = generatePassword