const cloudUpload = require("../utils/cloudUpload");
const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const { createProductSchema } = require("../validator/admin-validator");
const { createPublishingSchema } = require("../validator/admin-validator");

exports.createProduct = async (req, res, next) => {
  try {
    const value = await createProductSchema.validateAsync(req.body);

    const { publishingId, categoryId, authorId, seriesId } = req.body;
    console.log(req.body)
    const product = await prisma.product.create({
      data: {
        ...value,
        publishing: {
          connect: {
            id: Number(publishingId),
          },
        },
        category: {
          connect: {
            id: Number(categoryId),
          },
        },
        author: {
          connect: {
            id: Number(authorId),
          },
        },
        series: {
          connect: {
            id: Number(seriesId),
          },
        },
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    const imagesPromiseArray = req.files.map((file) => {
      return cloudUpload(file.path);
    });

    const imgUrlArray = await Promise.all(imagesPromiseArray);

    const productImages = imgUrlArray.map((imgUrl) => {
      return {
        url: imgUrl,
        productId: product.id,
      };
    });

    await prisma.product_Img.createMany({
      data: productImages,
    });

    const newProduct = await prisma.product.findFirst({
      where: {
        id: product.id,
      },
      include: {
        product_img: true,
      },
    });
    res.json({ newProduct });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    res.json({ message: "Update Product" });
  } catch (err) {
    next(err);
  }
};

exports.createPublishing = async (req, res, next) => {
  try {
    const { name, count} = req.body;
    if (!name) {
      return createError(400, 'Product not found');
    }
    console.log(req.body)
    const publishing = await prisma.publishing.create({
      data: {
        name,
        count,
      },
    });
    const newPublishing= await prisma.publishing.findFirst({
      where: {
        id: publishing.id,
      },
    });

    res.json({ newPublishing });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    res.json({ category });
  } catch (err) {
    next(err);
  }
};

exports.createAuthor = async (req, res, next) => {
  try {
    const { name } = req.body;
    const author = await prisma.author.create({
      data: {
        name,
      },
    });
    res.json({ author });
  } catch (err) {
    next(err);
  }
};

exports.createSeries = async (req, res, next) => {
  try {
    const { name } = req.body;
    const series = await prisma.series.create({
      data: {
        name,
      },
    });
    res.json({ series });
  } catch (err) {
    next(err);
  }
};

exports.createPromotion = async (req, res, next) => {
  try {
    res.json({ message: "Create Promotion" });
  } catch (err) {
    next(err);
  }
};
