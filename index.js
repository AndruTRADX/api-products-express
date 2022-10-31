const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/api/v1', (req, res) => {
  res.send('Hola desde la API en express');
});

routerApi(app);

app.use(cors());

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port: ' + port);
});
