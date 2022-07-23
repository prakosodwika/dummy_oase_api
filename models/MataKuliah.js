const sequelize = require("sequelize");
const db = require("../config/config");

const MataKuliah = db.define(
  "mata_kuliah",
  {
    kode_mata_kuliah: {
      type: sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nama_mata_kuliah: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = MataKuliah;
