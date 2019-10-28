/* eslint-disable func-names */
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {},
  );
  User.beforeCreate(async (user) => {
    // eslint-disable-next-line no-param-reassign
    user.password = await user.generatePasswordHash();
  });
  User.prototype.generatePasswordHash = async function () {
    const saltRounds = 10;
    return bcrypt.hash(this.password, saltRounds);
  };
  User.prototype.validatePassword = async function (password) {
    const isValid = await bcrypt.compareSync(password, this.password);
    return isValid;
  };
  User.associate = (models) => {
    // associations can be defined here
  };

   // Hide password from returned user data
  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };
  return User;
};
