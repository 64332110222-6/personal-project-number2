const Joi = require("joi");

exports.createProductSchema = Joi.object({
  volume: Joi.number().required(),
  synopsis: Joi.string().required(),
  stock: Joi.number(),
  unit: Joi.number(),
  price: Joi.number().required(),
  publishingId: Joi.number().required().strip(),
  categoryId: Joi.number().required().strip(),
  authorId: Joi.number().required().strip(),
  seriesId: Joi.number().required().strip(),
});


exports.createPublishingSchema = Joi.object({
  name: Joi.string().required(),
  count: Joi.number(),
});
//ทำแล้ว