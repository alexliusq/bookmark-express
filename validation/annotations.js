const Validator = require('validator');

module.exports = function validateAnnotation(anno) {
  let errors = {};
  
  if (Validator.isEmpty(anno.title)) { 
   errors.title = "Annotation must have publication title";
  }

  if (!anno.highlight && !anno.note) {
    errors.annotation = "Annotation must include either a highlight or note";
  }

  if (anno.note) {
    if ((!Validator.isInt(anno.begin + '') && !Validator.isInt(anno.end + ''))
    && !Validator.isInt(anno.page + '')) {
      errors.location = "Must have valid location"
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};