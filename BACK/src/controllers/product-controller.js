const prisma = require("../config/prisma");
const createError = require("../utils/createError");

exports.getProductsLanding = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany()
  res.json({products});
} catch (error) {
    next(error)
}
};

exports.getProducts = async (req, res, next) => {
  try {
  const {publishing, category, author, series } = req.query;
  const products = await prisma.product.findMany({
    where:{
      publishing:{
        name : publishing,
      },
      category:{
        name : category,
      },
      author:{
        name : author,
      },
      series:{
        name : series,
      },
    },
    include:{
      publishing: true,
      category: true,
      author: true,
      series: true,
    },
  })
  if(products.length === 0) {
    return createError(400, 'Product not found');
}
  res.json({products});
} catch (error) {
    next(error)
}
};

exports.getProductById = async (req, res, next) => {
  try {
      const { productId } = req.params;

      if(!productId || typeof Number(productId) !== 'number' || isNaN(productId)) {
          return createError(400, 'Product id is required');
      }
      const product = await prisma.product.findFirst({
          where: {
              id: Number(productId),
          },
      });
      if(product === null) {
          return createError(400, 'Product not found');
      }
      res.json({ product });
  } catch (err) {
      next(err);
  }
};
