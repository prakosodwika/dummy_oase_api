const sequelize = require("sequelize");
const db = require("../config/config");

const Mahasiswa = db.define(
  "mahasiswa",
  {
    nomor_induk_mahasiswa: {
      type: sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nama_mahasiswa: {
      type: sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Mahasiswa;
