const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // Set up method to run an instance data (per user) to check password we have with what they type in
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// create fields and columns for user model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
  },
  {
    // Setup beforeCreate hook functionality
    hooks: {
      beforeCreate: async (newUserData) => {
        // Hash user's password
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Setup beforeUpdate hook functionality
      beforeUpdate: async (updatedUserData) => {
         // Hash user's password
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
