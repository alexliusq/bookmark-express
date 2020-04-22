const Validator = require('validator');

module.exports = function validateBookDetails(book) {
  let errors = {};
  

  // if (!Validator.isLength(data.text, { min: 5, max: 140 })) {
  //   errors.text = 'Tweet must be between 5 and 140 characters';
  // }

  if (Validator.isEmpty(book.id)) {
    errors.id = 'Book must have ID';
  }

  if (Validator.isEmpty(book.title)) {
    errors.title = 'Book must have title';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};