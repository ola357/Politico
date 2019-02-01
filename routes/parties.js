/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-console */
const Joi = require('joi');
const express = require('express');
const { parties } = require('../models/db');

const router = express.Router();

router.get('/', (req, res) => {
  // console.log(res);
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < parties.length; index++) {
    delete parties[index].hqAddress;
  }
  res.send({ status: 200, data: parties });
});


router.get('/:id', (req, res) => {
  const party = parties.find(c => c.id === parseInt(req.params.id));
  if (!party) {
    return res.status(404).send({
      status: 404,
      error: "The party with the given ID was not found.",
    });
  }
  res.send({
    status: 200,
    data: [{
      id: party.id,
      name: party.name,
      logoUrl: party.logoUrl,
    }],
  });
});


router.post('/', (req, res) => {
  const { error } = validateParty(req.body);
  if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

  const party = {
    id: parties.length + 1,
    name: req.body.name,
    hqAddress: req.body.hqAddress,
    logoUrl: req.body.logoUrl,
  };
  parties.push(party);
  res.send({ status: 200, data: [{ id: party.id, name: party.name }] });
});


router.patch('/:id/name', (req, res) => {
  // console.log(req.query);
  // console.log("##############");
  // console.log(req.body);
  // console.log("***********");
  // console.log(req.params);
  // console.log("----------------");
  // console.log(req);
  // res.send("hello");
  const party = parties.find(c => c.id === parseInt(req.params.id));
  if (!party) {
    return res.status(404).send({
      status: 404,
      error: "The party with the given ID was not found.",
    });
  }

  const { error } = validateParty(req.body);
  if (error) return res.status(400).send({ status: 400, error: error.details[0].message });
  party.name = req.body.name;
  party.hqAddress = req.body.hqAddress;
  party.logoUrl = req.body.logoUrl;
  res.status(200).send({ status: 200, data: [{ id: party.id, name: party.name }] });
});

router.delete('/:id', (req, res) => {
  const party = parties.find(c => c.id === parseInt(req.params.id));
  if (!party) {
    return res.status(404).send({
      status: 404,
      error: "The party with the given ID was not found.",
    });
  }

  const index = parties.indexOf(party);
  parties.splice(index, 1);

  res.send({ status: 200, data: [{ id: party.id, message: `${party.name} has been deleted` }] });
});

function validateParty(party) {
  const schema = {
    name: Joi.string().min(2).max(5).required(),
    hqAddress: Joi.string().required(),
    logoUrl: Joi.string().required(),
  };
  return Joi.validate(party, schema);
}

module.exports = router;
