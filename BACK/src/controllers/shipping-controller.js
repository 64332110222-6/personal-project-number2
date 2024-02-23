const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const { createShippingSchema ,updateShippingSchema} = require("../validator/admin-validator");


//* Shipping Landing---------------------------------------------
exports.getShippingLanding = async (req, res, next) => {
  try {
    const shippings = await prisma.Shipping_Address.findMany()
    res.json({ shippings });
  } catch (error) {
    next(error)
  }
};


//* Get Shipping By ID ---------------------------------------------
exports.getShippingById = async (req, res, next) => {
  try {
    const { shippingId } = req.params;
    if (!shippingId || typeof Number(shippingId) !== 'number' || isNaN(shippingId)) {
      return createError(400, 'Shipping id is required');
    }
    const shipping = await prisma.Shipping_Address.findFirst({
      where: {
        id: Number(shippingId),
      },
    });
    if (shipping === null) {
      return createError(400, 'Shipping not found');
    }
    res.json({ shipping });
  } catch (err) {
    next(err);
  }
};



//* My Shipping Landing---------------------------------------------
exports.getMyShippingLanding = async (req, res, next) => {
    try {
      const shippings = await prisma.Shipping_Address.findMany({
        where: {
          userId: req?.user?.id
        },
      })
  
      res.json({ shippings });
    } catch (error) {
      next(error)
    }
  };
  
  
  
  //* Create Shipping---------------------------------------------
  exports.createShipping = async (req, res, next) => {
    try {
      const value = await createShippingSchema.validateAsync(req.body);
      const shipping = await prisma.Shipping_Address.create({
        data: {
          ...value,
          user: {
            connect: {
              id: Number(req?.user?.id),
            },
          },
        },
      });
      res.json({ shipping });
    } catch (err) {
      next(err);
    }
  };
  
  
  //* Update Shipping---------------------------------------------
  exports.updateShipping = async (req, res, next) => {
    try {
      const { shippingId } = req.params
      console.log(req.params)
      const value = await updateShippingSchema.validateAsync(req.body);
      const updates = await prisma.Shipping_Address.update({
        where: {
          id: Number(shippingId),
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


  //* Delete Shipping ---------------------------------------------
exports.deleteShipping = async (req, res, next) => {
  try {
    const { shippingId } = req.params;
    const deletes = await prisma.Shipping_Address.delete({
      where: {
        id: Number(shippingId),
        userId: req.user.id
      },
    });
    res.json({ deletes });
  } catch (err) {
    next(err);
  }
}
  
