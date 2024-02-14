const prisma = require("../config/prisma");
const createError = require("../utils/createError");

exports.getSeriessLanding = async (req, res, next) => {
  try {
    const seriess = await prisma.series.findMany()
    res.json({ seriess });
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

exports.getSeriesById = async (req, res, next) => {
  try {
    const { seriesId } = req.params;

    if (!seriesId || typeof Number(seriesId) !== 'number' || isNaN(seriesId)) {
      return createError(400, 'Series id is required');
    }
    const series = await prisma.series.findFirst({
      where: {
        id: Number(seriesId),
      },
    });
    if (series === null) {
      return createError(400, 'Series not found');
    }
    res.json({ series });
  } catch (err) {
    next(err);
  }
};
