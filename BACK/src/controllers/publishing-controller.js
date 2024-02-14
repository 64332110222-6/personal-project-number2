const prisma = require("../config/prisma");
const createError = require("../utils/createError");

exports.getPublishingsLanding = async (req, res, next) => {
  try {
    const publishings = await prisma.publishing.findMany()
    res.json({ publishings });
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

exports.getPublishingById = async (req, res, next) => {
  try {
    const { publishingId } = req.params;

    if (!publishingId || typeof Number(publishingId) !== 'number' || isNaN(publishingId)) {
      return createError(400, 'Publishing id is required');
    }
    const publishing = await prisma.publishing.findFirst({
      where: {
        id: Number(publishingId),
      },
    });
    if (publishing === null) {
      return createError(400, 'Publishing not found');
    }
    res.json({ publishing });
  } catch (err) {
    next(err);
  }
};
