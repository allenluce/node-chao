# Chao

A Javascript implementation of the [Chaocipher](https://en.wikipedia.org/wiki/Chaocipher).

## How it works

[Chaocipher](https://en.wikipedia.org/wiki/Chaocipher) was discovered
by John F. Byrne, an associate of James Joyce, in 1918. It's a type of
[dynamic substitution cipher](http://www.ciphersbyritter.com/DYNSUB.HTM)
where the starting input and output alphabet are scrambled after each
step. While difficult to decrypt by hand, it's known to have been
broken by known plaintext attack.

The "key" for this algorithm is the initial input and output
alphabets.  Each alphabet should contain a permutation of the all the
characters that you want in your input and output. Any characters not
in the alphabet will be left alone.

To install:

    npm install chao

Usage example:

```javascript
var Chaocipher = require('chao');
var assert = require('assert')

var plaintext_alphabet  = "df6nCwtk0F!7NoQ4prO1aR5Hcq3xJSMiYB9eVWTL8XAslEzuhmUbygIvKPZDG2j";
var ciphertext_alphabet = "CLMYN3KWOX6bPEQRgqtn0J4IruH5Bcfv9jkGhm1ZSzyA78iUFwT2!slpDaVxedo";

var chao = new Chaocipher(plaintext_alphabet, ciphertext_alphabet);

var input = "Something very important!";
var ciphertext = chao.encode(input);
console.log(ciphertext);
var recoveredtext = chao.decode(ciphertext);
assert.equal(recoveredtext, input);
```

The code is largely based on https://github.com/aprescott/chaocipher
