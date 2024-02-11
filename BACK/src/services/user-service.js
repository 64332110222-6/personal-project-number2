const prisma = require("../config/prisma");

exports.getUserById = (id) => {
  return prisma.user.findFirst({
    where: {
      id,
    },
  });
};

exports.getUserByEmail = (email) => {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
};

exports.createUser = (name,email, password,phone) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
      phone
    },
  });
};
