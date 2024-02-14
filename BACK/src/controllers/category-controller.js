const prisma = require("../config/prisma");
const createError = require("../utils/createError");

exports.getCategoriesLanding = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany()
    res.json({ categories });
  } catch (error) {
    next(error)
  }
};

// exports.getAuthors = async (req, res, next) => {
//   try {
//     const { publishing, category, author, series } = req.query;
//     const authors = await prisma.author.findMany({
//       where: {
//         publishing: {
//           name: publishing,
//         },
//         category: {
//           name: category,
//         },
//         author: {
//           name: author,
//         },
//         series: {
//           name: series,
//         },
//       },
//       include: {
//         publishing: true,
//         category: true,
//         author: true,
//         series: true,
//         product_img: true,
//       },
//     })
//     if (products.length === 0) {
//       return createError(400, 'Product not found');
//     }
//     res.json({ products });
//   } catch (error) {
//     next(error)
//   }
// };

exports.getCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId || typeof Number(categoryId) !== 'number' || isNaN(categoryId)) {
      return createError(400, 'Category id is required');
    }
    const category = await prisma.category.findFirst({
      where: {
        id: Number(categoryId),
      },
    });
    if (category === null) {
      return createError(400, 'Category not found');
    }
    res.json({ category });
  } catch (err) {
    next(err);
  }
};
