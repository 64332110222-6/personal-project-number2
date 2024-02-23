const Joi = require("joi");

exports.createProductSchema = Joi.object({
  volume: Joi.number().required(),
  name: Joi.string().required(),
  synopsis: Joi.string().required(),
  stock: Joi.number(),
  unit: Joi.number(),
  price: Joi.number().required(),
  publishingId: Joi.number().required().strip(),
  categoryId: Joi.number().required().strip(),
  authorId: Joi.number().required().strip(),
  seriesId: Joi.number().required().strip(),
});


exports.updateProductSchema = Joi.object({
  volume: Joi.number(),
  name: Joi.string(),
  synopsis: Joi.string(),
  stock: Joi.number(),
  unit: Joi.number(),
  price: Joi.number(),
  publishingId: Joi.number(),
  categoryId: Joi.number(),
  authorId: Joi.number(),
  seriesId: Joi.number(),
});


exports.createShippingSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string(),
  address: Joi.string().required(),
  postalCode: Joi.string().required(),
  province: Joi.string().required(),
  district: Joi.string().required(),
  subDistrict: Joi.string().required(),
  isMainAddress: Joi.boolean().required(),
});

exports.updateShippingSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
  address: Joi.string(),
  postalCode: Joi.string(),
  province: Joi.string(),
  district: Joi.string(),
  subDistrict: Joi.string(),
  isMainAddress: Joi.boolean(),
});


// exports.createPublishingSchema = Joi.object({
//   name: Joi.string().required(),
//   count: Joi.number(),
// });
//ทำแล้ว