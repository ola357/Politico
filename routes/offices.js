/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-console */
const Joi = require('joi');
const express = require('express');
const { offices } = require('../models/db');

const router = express.Router();

router.get('/', (req, res) => {
  // console.log(res);
  res.send({ status: 200, data: offices });
});


router.get('/:id', (req, res) => {
  const office = offices.find(c => c.id === parseInt(req.params.id));
  if (!office) {
    return res.status(404).send({
      status: 404,
      error: "The office with the given ID was not found.",
    });
  }
  res.send({
    status: 200,
    data: [{
      id: office.id,
      type: office.type,
      name: office.name,
    }],
  });
});


router.post('/', (req, res) => {
  const { error } = validateOffice(req.body);
  if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

  const office = {
    id: offices.length + 1,
    type: req.body.type,
    name: req.body.name,
  };
  offices.push(office);
  res.send({ status: 200, data: [{ id: office.id, type: office.type, name: office.name }] });
});

function validateOffice(office) {
  const schema = {
    type: Joi.string().min(4).max(13).required(),
    name: Joi.string().required(),
  };
  return Joi.validate(office, schema);
}

module.exports = router;
