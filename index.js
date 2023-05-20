// start your server here
const server = require('./api/server');
require('dotenv').config();

const port = 9000 || process.env.PORT

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
