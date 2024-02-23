const cloudUpload = require("../utils/cloudUpload");
const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const { createProductSchema ,updateProductSchema} = require("../validator/admin-validator");

//* My Product Landing---------------------------------------------
exports.getMyProductsLanding = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        publishing: true,
        category: true,
        author: true,
        series: true,
        product_img: true,
      },
    })

    res.json({ products });
  } catch (error) {
    next(error)
  }
};



//* Create Product---------------------------------------------
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


//* Update Product---------------------------------------------
exports.updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params
    const value = await updateProductSchema.validateAsync(req.body);
    // const value = req.data
    console.log(productId)
    console.log(req.body)
    const updates = await prisma.product.update({
      where: {
        id: Number(productId),
      },
      data: {
        ...value
      }
    })
    res.json({ updates });
  } catch (err) {
    next(err);
  }
};



//* Delete Product---------------------------------------------
exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const deletes = await prisma.product.delete({
      where: {
        id: Number(productId),
        userId: req.user.id
      },
    });
    res.json({ deletes });
  } catch (err) {
    next(err);
  }
}


//* Create Publishing---------------------------------------------
exports.createPublishing = async (req, res, next) => {
  try {
    const { name } = req.body;
    const publishing = await prisma.publishing.create({
      data: {
        name,
      },
    });
    res.json({ publishing });
  } catch (err) {
    next(err);
  }
};



//* Update Publishing---------------------------------------------
exports.updatePublishing = async (req, res, next) => {
  try {
    const { publishingId } = req.params
    const value = await req.body;
    const updates = await prisma.publishing.update({
      where: {
        id: Number(publishingId),
      },
      data: {
        ...value
      }
    })
    res.json({ updates });
  } catch (err) {
    next(err);
  }
};



//* Delete Publishing---------------------------------------------
exports.deletePublishing = async (req, res, next) => {
  try {
    const { publishingId } = req.params;
    const deletes = await prisma.publishing.delete({
      where: {
        id: Number(publishingId),
      },
    });
    res.json({ deletes });
  } catch (err) {
    next(err);
  }
}


//* Create Category---------------------------------------------
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



//* Update Category---------------------------------------------
exports.updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params
    const value = await req.body;
    const updates = await prisma.category.update({
      where: {
        id: Number(categoryId),
      },
      data: {
        ...value
      }
    })
    res.json({ updates });
  } catch (err) {
    next(err);
  }
};



//* Delete Category---------------------------------------------
exports.deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const deletes = await prisma.category.delete({
      where: {
        id: Number(categoryId),
      },
    });
    res.json({ deletes });
  } catch (err) {
    next(err);
  }
}




//* Create Author---------------------------------------------
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



//* Update Author---------------------------------------------
exports.updateAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params
    const value = await req.body;
    const updates = await prisma.author.update({
      where: {
        id: Number(authorId),
      },
      data: {
        ...value
      }
    })
    res.json({ updates });
  } catch (err) {
    next(err);
  }
};



//* Delete Author---------------------------------------------
exports.deleteAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const deletes = await prisma.author.delete({
      where: {
        id: Number(authorId),
      },
    });
    res.json({ deletes });
  } catch (err) {
    next(err);
  }
}



//* Create Series---------------------------------------------
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



//* Update Series---------------------------------------------
exports.updateSeries = async (req, res, next) => {
  try {
    const { seriesId } = req.params
    const value = await req.body;
    const updates = await prisma.series.update({
      where: {
        id: Number(seriesId),
      },
      data: {
        ...value
      }
    })
    res.json({ updates });
  } catch (err) {
    next(err);
  }
};



//* Delete Series---------------------------------------------
exports.deleteSeries = async (req, res, next) => {
  try {
    const { seriesId } = req.params;
    const deletes = await prisma.series.delete({
      where: {
        id: Number(seriesId),
      },
    });
    res.json({ deletes });
  } catch (err) {
    next(err);
  }
}



//* Create Promotion---------------------------------------------
exports.createPromotion = async (req, res, next) => {
  try {
    res.json({ message: "Create Promotion" });
  } catch (err) {
    next(err);
  }
};
