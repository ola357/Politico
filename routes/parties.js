const express = require('express');
const { validateParty } = require("../middleware/validateParty");


const router = express.Router();

const parties = [
  {
    id: 1, name: 'APC', hqAddress: 'Lagos', logoUrl: 'a/b/c',
  },
  {
    id: 2, name: 'PDP', hqAddress: 'Abuja', logoUrl: 'd/e/f',
  },
];

router.get('/', (req, res) => {
  res.send({ status: 200, data: parties });
});

// eslint-disable-next-line consistent-return
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

module.exports = router;
