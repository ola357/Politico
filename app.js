const express = require('express');
const parties = require('./routes/parties');
const offices = require('./routes/offices');


const app = express();

app.use(express.json());
app.use('/api/v1/parties', parties);
app.use('/api/v1/offices', offices);


const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
module.exports = server;
