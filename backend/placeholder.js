// "use strict";
// const bcrypt = require("bcryptjs");
// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     "User",
//     {
//       fName: DataTypes.STRING,
//       lName: DataTypes.STRING,
//       phoneNum: DataTypes.INTEGER,
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           len: [3, 255],
//         },
//       },
//       hashedPassword: {
//         type: DataTypes.STRING.BINARY,
//         allowNull: false,
//         validate: {
//           len: [60, 60],
//         },
//       },
//       role: DataTypes.INTEGER,
//       profileUrl: DataTypes.STRING,
//       splashUrl: DataTypes.STRING,
//       bio: {
//         type: DataTypes.STRING,
//         validate: {
//           len: [25, 500],
//         },
//       },
//       title: {
//         type: DataTypes.STRING,
//         validate: {
//           len: [9, 75],
//         },
//       },
//     },
//     {
//       defaultScope: {
//         attributes: {
//           exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
//         },
//       },
//       scopes: {
//         currentUser: {
//           attributes: { exclude: ["hashedPassword"] },
//         },
//         loginUser: {
//           attributes: {},
//         },
//       },
//     }
//   );

//   User.prototype.toSafeObject = function () {
//     const { id, email } = this;
//     return { id, email };
//   };
//   User.getCurrentUserById = async function (id) {
//     return await User.scope("currentUser").findByPk(id);
//   };
//   User.prototype.validatePassword = function (password) {
//     return bcrypt.compareSync(password, this.hashedPassword.toString());
//   };

//   User.login = async function ({ credential, password }) {
//     const { Op } = require("sequelize");
//     const user = await User.scope("loginUser").findOne({
//       where: {
//         email: credential,
//       },
//     });
//     if (user && user.validatePassword(password)) {
//       return await User.scope("currentUser").findByPk(user.id);
//     }
//   };
//   User.signup = async function ({ email, fName, lName, phoneNum, role, password }) {
//     const hashedPassword = bcrypt.hashSync(password);
//     const user = await User.create({
//       email,
//       fName,
//       lName,
//       phoneNum,
//       role,
//       hashedPassword,
//     });
//     return await User.scope("currentUser").findByPk(user.id);
//   };
//   User.associate = function (models) {
//     // associations can be defined here
//   };
//   return User;
// };

// ("use strict");
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable("Users", {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//       },
//       fName: {
//         type: Sequelize.STRING(75),
//         allowNull: false,
//       },
//       lName: {
//         type: Sequelize.STRING(75),
//         allowNull: false,
//       },
//       phoneNum: {
//         type: Sequelize.INTEGER,
//       },
//       email: {
//         type: Sequelize.STRING(255),
//         allowNull: false,
//       },
//       hashedPassword: {
//         type: Sequelize.STRING.BINARY,
//         allowNull: false,
//       },
//       role: {
//         type: Sequelize.INTEGER,
//         defaultValue: 1,
//         allowNull: false,
//       },
//       profileUrl: {
//         type: Sequelize.STRING,
//       },
//       splashUrl: {
//         type: Sequelize.STRING,
//       },
//       bio: {
//         type: Sequelize.STRING(500),
//       },
//       title: {
//         type: Sequelize.STRING(75),
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.fn("now"),
//       },
//       updatedAt: {
//         allowNull: false,
//         defaultValue: Sequelize.fn("now"),
//       },
//     });
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.dropTable("Users");
//   },
// };

// "use strict";
// module.exports = (sequelize, DataTypes) => {
//   const Service = sequelize.define(
//     "Service",
//     {
//       title: DataTypes.STRING,
//       description: DataTypes.STRING,
//       employeeId: DataTypes.INTEGER,
//       price: DataTypes.INTEGER,
//       hours: DataTypes.INTEGER,
//     },
//     {}
//   );
//   Service.associate = function (models) {
//     const columnMapping = {
//       through: "userService",
//       otherKey: "userId",
//       foreignKey: "serviceId",
//     };

//     Service.belongsToMany(models.User, columnMapping);

//     const appointmentMapping = {
//       through: "appointmentService",
//       otherKey: "appointmentId",
//       foreignKey: "serviceId",
//     };

//     Service.belongsToMany(models.Appointment, appointmentMapping);
//   };
//   return Service;
// };
