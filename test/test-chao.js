var expect = require('chai').expect;
var chao = require('../chao');

var shuffle = function(str) {
  return str.split('').sort(function(){return 0.5-Math.random()}).join('');
};

describe("Cipher", function() {

  before(function() {
    var ciphertext_alphabet = "HXUCZVAMDSLKPEFJRIGTWOBNYQ";
    var plaintext_alphabet = "PTLNBQDEOYSFAVZKGJRIHWXUMC";
    this.cipher = new chao(ciphertext_alphabet, plaintext_alphabet);
  });

  it("encodes properly", function() {
    expect(this.cipher.encode("WELLDONEISBETTERTHANWELLSAID")).to.equal("OAHQHCNYNXTSZJRRHJBYHQKSOUJY");
  });

  it("decodes properly", function() {
    expect(this.cipher.decode("OAHQHCNYNXTSZJRRHJBYHQKSOUJY")).to.equal("WELLDONEISBETTERTHANWELLSAID");
  });
     
  it("is reversible", function() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var ciphertext_alphabet = shuffle(possible);
    var plaintext_alphabet = shuffle(possible);
    console.log(shuffle(possible));
    var cipher = new chao(ciphertext_alphabet, plaintext_alphabet);
    var str = shuffle(possible);
    expect(cipher.decode(cipher.encode(str))).to.equal(str);
  });
  
});

