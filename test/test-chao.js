var expect = require('chai').expect;
var chao = require('../chao');

var shuffle = function(str) {
  return str.split('').sort(function(){return 0.5-Math.random()}).join('');
};

describe("Chaocipher", function() {

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
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" ;
    var ciphertext_alphabet = shuffle(possible);
    var plaintext_alphabet = shuffle(possible);
    var cipher = new chao(ciphertext_alphabet, plaintext_alphabet);
    var str = shuffle(possible);
    expect(cipher.decode(cipher.encode(str))).to.equal(str);
  });
  
  it("doesn't touch characters not in the plaintext alphabet", function() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var ciphertext_alphabet = shuffle(possible);
    var plaintext_alphabet = shuffle(possible);
    var cipher = new chao(ciphertext_alphabet, plaintext_alphabet);
    var str = "This is my text!"
    expect(cipher.encode(str)).to.match(/[A-Za-z0-9]{4} [A-Za-z0-9]{2} [A-Za-z0-9]{2} [A-Za-z0-9]{4}\!/);
    expect(cipher.decode(cipher.encode(str))).to.equal(str);
  });
  
});

