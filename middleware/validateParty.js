const Joi = require('joi');

function validateParty(party) {
  const schema = {
    name: Joi.string().min(2).max(5).required(),
    hqAddress: Joi.string().required(),
    logoUrl: Joi.string().required(),
  };
  return Joi.validate(party, schema);
}
exports.validateParty = validateParty;
