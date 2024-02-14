const prisma = require("../config/prisma");
const createError = require("../utils/createError");

exports.getAuthorsLanding = async (req, res, next) => {
  try {
    const authors = await prisma.author.findMany()
    res.json({ authors });
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

exports.getAuthorById = async (req, res, next) => {
  try {
    const { authorId } = req.params;

    if (!authorId || typeof Number(authorId) !== 'number' || isNaN(authorId)) {
      return createError(400, 'Author id is required');
    }
    const author = await prisma.author.findFirst({
      where: {
        id: Number(authorId),
      },
    });
    if (author === null) {
      return createError(400, 'Author not found');
    }
    res.json({ author });
  } catch (err) {
    next(err);
  }
};
