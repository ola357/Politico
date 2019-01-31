const express = require('express');
const parties = require('./routes/parties');


const app = express();

app.use(express.json());
app.use('/api/v1/parties', parties);

const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
module.exports = server;
