/* eslint-disable no-console */
const express = require('express');
const parties = require('../models/db');
// const { validateParty } = require("../middleware/validateParty");


const router = express.Router();


router.get('/', (req, res) => {
  console.log(parties);
  console.log("***********************################*********");
  // console.log(res);
  res.send({ status: 200, data: parties });
});

// // eslint-disable-next-line consistent-return
// router.post('/', (req, res) => {
//   const { error } = validateParty(req.body);
//   if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

//   const party = {
//     id: parties.length + 1,
//     name: req.body.name,
//     hqAddress: req.body.hqAddress,
//     logoUrl: req.body.logoUrl,
//   };
//   parties.push(party);
//   res.send({ status: 200, data: [{ id: party.id, name: party.name }] });
// });

module.exports = router;
