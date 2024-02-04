export default (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "Please enter your name" } },
    },

    gender: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: {
          args: [["male", "female"]],
          msg: "please specify gender",
        },
      },
    },

    address: {
      type: DataTypes.STRING(512),
      allowNull: false,
      validate: { notEmpty: { msg: "Please enter your address" } },
    },

    mobile_no: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: { msg: "You must enter Phone Number" },
        len: { args: [10, 10], msg: "Phone Number is invalid" },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: { msg: "Please enter a valid email address" } },
    },

    password: {
      type: DataTypes.STRING(512),
      allowNull: false,
      validate: {
        len: {
          args: [6, 100], // Minimum and maximum password length
          msg: "Password must be between 6 and 100 characters",
        },
      },
    },

    deletedAt: {
      type: DataTypes.DATE,
    },
  });
  return User;
};
