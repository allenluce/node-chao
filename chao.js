'use strict'
class Alphabet {
  constructor (characters) {
    this.data = characters
    this.nadirIndex = Math.floor(characters.length / 2)
  }

  charAt (i) {
    return this.data.charAt(i)
  }

  indexOf (c) {
    return this.data.indexOf(c)
  }

  rotate (str, n) {
    const rotateAmount = n % str.length
    if (rotateAmount < 1) return str
    return str.slice(rotateAmount) + str.slice(0, rotateAmount)
  }

  permute (newZenith, skipAmount) {
    let permutedCharacters = this.rotate(this.data, this.data.indexOf(newZenith))
    if (skipAmount === 2) { permutedCharacters = this.rotate(permutedCharacters, 1) }
    this.data = permutedCharacters.slice(0, skipAmount) +
          this.rotate(permutedCharacters.slice(skipAmount, this.nadirIndex + 1), 1) +
          permutedCharacters.slice(this.nadirIndex + 1)
  }
}

module.exports = class Chao {
  constructor (ciphertextAlphabet, plaintextAlphabet) {
    this.reinitialize = function () {
      this.ciphertextAlphabet = new Alphabet(ciphertextAlphabet)
      this.plaintextAlphabet = new Alphabet(plaintextAlphabet)
    }
  }

  ciphertextLetterFor (plaintextLetter) {
    return this.ciphertextAlphabet.charAt(this.plaintextAlphabet.indexOf(plaintextLetter))
  }

  plaintextLetterFor (ciphertextLetter) {
    return this.plaintextAlphabet.charAt(this.ciphertextAlphabet.indexOf(ciphertextLetter))
  }

  process (text, select) {
    this.reinitialize()
    return text.split('').map(c => {
      const lastConvertedLetter = [this.ciphertextLetterFor, this.plaintextLetterFor][select].call(this, c)
      // Only convert characters in the alphabet.
      if (lastConvertedLetter === '') return c
      this.ciphertextAlphabet.permute([lastConvertedLetter, c][select], 1)
      this.plaintextAlphabet.permute([c, lastConvertedLetter][select], 2)
      return lastConvertedLetter
    }).join('')
  }

  encode (text) {
    return this.process(text, 0)
  }

  decode (text) {
    return this.process(text, 1)
  }
}
