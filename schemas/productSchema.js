// Importamos Joi
const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

// esquema para la creación de un producto
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

// esquema para la actualización de un producto
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

// esquema para la búsqueda de un producto
const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
