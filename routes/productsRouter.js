const express = require('express');
const ProductsService = require('../services/productsService');
// Exportamos los schemas y el validator
const validatorHandler = require('../middlewares/validatoHandler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema
} = require('../schemas/productSchema');

const router = express.Router();
const service = new ProductsService();

// Obtener TODOS los products
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// Obtener un product por id
router.get('/:id',
  /* vamos a validar que la petición cuando obtengamos un producto
  sea correcta y pueda obtener el producto de manera adecuada, esto
  se solicitará directamente de los "params" */
  validatorHandler(getProductSchema, 'params'), //  <--
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// Añadir un product
router.post('/',
  /* Lo que vamos a hacer aquí es que  vamos a validar si cuando
  publicamos un producto sus parámetros cumplen con las condiciones
  que nosotros especificamos, si sí, lo crea, si no, lanza un
  badRequest y esto lo haremos directamente en el "body" */
  validatorHandler(createProductSchema, 'body'), //  <--
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.json(newProduct)
  }
);

// Modificar un product
router.patch('/:id',
  /* Debemos validar si el id esta escrito correctamente para poder
  traer el producto de manera correcta y luego validamos si cuando
  vayamos a actualizar un producto, los parámetros que enviemos
  esten correctamente escritos */
  validatorHandler(getProductSchema, 'params'), //  <--
  validatorHandler(updateProductSchema, 'body'), //  <--
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params
      const product = await service.update(id, body)

      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// Borrar un product
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const resproduct = await service.delete(id)

  res.json(resproduct);
});

module.exports = router;
