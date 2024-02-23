const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); //by doing this nodejs can read all the contents of the config files

const app = require('./app');
// console.log(process.env);

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`App running in the background ${port}`);
});
