const Joi = require('joi');

function validateParty(party) {
  const schema = {
    name: Joi.string().max(5).required(),
    hqAddress: Joi.string(),
  };
  return Joi.validate(party, schema);
}
exports.validateParty = validateParty;
