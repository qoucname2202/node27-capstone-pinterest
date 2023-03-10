const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
// Ghi log user truy vấn ở endpoint nào
const morgan = require('morgan');
let bodyParser = require('body-parser');
const config = require('./config');
let rootRoute = require('./routes');

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('common'));
app.use(express.static('.'));

app.use('/api', rootRoute);

const port = config.port ?? 3001;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
