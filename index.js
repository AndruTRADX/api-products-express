const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;;

app.use(express.json());

const whilelist = ['http://localhost:8080', 'https://mi-app.com'];
const options = {
	origin: (origin, callback) => {
		if(whilelist.includes(origin) || !origin) {
			callback(null, true)
		} else {
			callback(new Error('no permitido'))
		}
	}
}

app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/api/v1', (req, res) => {
  res.send('Hola desde la API en express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port: ' + port);
});
