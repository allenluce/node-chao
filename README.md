A Javascript implementation of the [Chaocipher](https://en.wikipedia.org/wiki/Chaocipher).

The "key" for this algorithm is the input and output alphabets.  Each
should contain a permutation of the all the characters that you want
in your input and output.

To install:

    npm install chao

Usage example:

```javascript
var Chaocipher = require('chao');
var assert = require('assert')

var plaintext_alphabet  = "df6nCwtk0F!7NoQ4prO1a R5Hcq3xJSMiYB9eVWTL8XAslEzuhmUbygIvKPZDG2j";
var ciphertext_alphabet = "CLMYN3KWOX6bPEQRgqtn0J4IruH5Bcfv9jkGhm 1ZSzyA78iUFwT2!slpDaVxedo";

var chao = new Chaocipher(plaintext_alphabet, ciphertext_alphabet);

var input = "Something very important!";
var ciphertext = chao.encode(input);
var recoveredtext = chao.decode(ciphertext);
assert.equal(recoveredtext, input);
```

This is largely converted from https://github.com/aprescott/chaocipher
