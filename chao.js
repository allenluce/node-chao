var rotate = function(str, n) {
  var rotate_amount = n % str.length;
  if (rotate_amount < 1)
    return str;
  return str.slice(rotate_amount) + str.slice(0, rotate_amount);
}

function Alphabet(characters) {
  this.characters = characters
  this.nadir_index = Math.floor(characters.length/2);
}

Alphabet.prototype.permute = function(new_zenith, skip_amount) {
  var permuted_characters = rotate(this.characters, this.characters.indexOf(new_zenith));
  if (skip_amount == 2)
    permuted_characters = rotate(permuted_characters, 1);
  this.characters = permuted_characters.slice(0,skip_amount)
    + rotate(permuted_characters.slice(skip_amount,this.nadir_index+1),1)
    + permuted_characters.slice(this.nadir_index+1)
}

function Chao(ciphertext_alphabet, plaintext_alphabet) {
  this.original_ciphertext_alphabet = ciphertext_alphabet;
  this.original_plaintext_alphabet = plaintext_alphabet;
  this.ciphertext_alphabet = new Alphabet(ciphertext_alphabet);
  this.plaintext_alphabet = new Alphabet(plaintext_alphabet);
  
  this.reinitialize = function () {
    this.ciphertext_alphabet = new Alphabet(this.original_ciphertext_alphabet);
    this.plaintext_alphabet = new Alphabet(this.original_plaintext_alphabet);
  }
  
  this.ciphertext_letter_for = function(plaintext_letter) {
    return this.ciphertext_alphabet.characters[this.plaintext_alphabet.characters.indexOf(plaintext_letter)];
  }

  this.plaintext_letter_for = function(ciphertext_letter) {
    return this.plaintext_alphabet.characters[this.ciphertext_alphabet.characters.indexOf(ciphertext_letter)];
  }

}

Chao.prototype.encode = function(text) {
  this.reinitialize();
  var converted_text = "";
  for(i in text) {
    var character = text[i];
    var last_converted_letter = this.ciphertext_letter_for(character);
    if (last_converted_letter === undefined)
      last_converted_letter = character;
    else {
      this.ciphertext_alphabet.permute(last_converted_letter, 1);
      this.plaintext_alphabet.permute(character, 2);
    }
    converted_text += last_converted_letter
  }
  return converted_text;
}
  
Chao.prototype.decode = function(text) {
  this.reinitialize();
  
  var converted_text = "";
  
  for(i in text) {
    var character = text[i];
    var last_converted_letter = this.plaintext_letter_for(character);
    if (last_converted_letter === undefined)
      last_converted_letter = character;
    else {
      this.ciphertext_alphabet.permute(character, 1);
      this.plaintext_alphabet.permute(last_converted_letter, 2);
    }
    converted_text += last_converted_letter
  }
  return converted_text;
}

module.exports = Chao;
