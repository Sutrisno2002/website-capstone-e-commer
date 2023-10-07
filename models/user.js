module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: true
    },
    picture: {
      type: DataTypes.STRING
    }
  });
  return user;
};
