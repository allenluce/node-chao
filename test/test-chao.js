'use strict'
/* global describe it before */
const expect = require('chai').expect
const Chao = require('../chao')

const shuffle = function (str) {
  return str.split('').sort(function () { return 0.5 - Math.random() }).join('')
}

describe('Chaocipher', function () {
  before(function () {
    const ciphertextAlphabet = 'HXUCZVAMDSLKPEFJRIGTWOBNYQ'
    const plaintextAlphabet = 'PTLNBQDEOYSFAVZKGJRIHWXUMC'
    this.cipher = new Chao(ciphertextAlphabet, plaintextAlphabet)
  })

  it('encodes properly', function () {
    expect(this.cipher.encode('WELLDONEISBETTERTHANWELLSAID')).to.equal('OAHQHCNYNXTSZJRRHJBYHQKSOUJY')
  })

  it('decodes properly', function () {
    expect(this.cipher.decode('OAHQHCNYNXTSZJRRHJBYHQKSOUJY')).to.equal('WELLDONEISBETTERTHANWELLSAID')
  })

  it('is reversible', function () {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const ciphertextAlphabet = shuffle(possible)
    const plaintextAlphabet = shuffle(possible)
    const cipher = new Chao(ciphertextAlphabet, plaintextAlphabet)
    const str = shuffle(possible)
    expect(cipher.decode(cipher.encode(str))).to.equal(str)
  })

  it("doesn't touch characters not in the plaintext alphabet", function () {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const ciphertextAlphabet = shuffle(possible)
    const plaintextAlphabet = shuffle(possible)
    const cipher = new Chao(ciphertextAlphabet, plaintextAlphabet)
    const str = 'This is my text!'
    expect(cipher.encode(str)).to.match(/[A-Za-z0-9]{4} [A-Za-z0-9]{2} [A-Za-z0-9]{2} [A-Za-z0-9]{4}!/)
    expect(cipher.decode(cipher.encode(str))).to.equal(str)
  })
})
