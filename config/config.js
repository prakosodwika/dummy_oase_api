const sequelize = require("sequelize");
const db = new sequelize("dummy_oase", "root", "root", {
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

module.exports = db;
