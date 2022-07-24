const sequelize = require("sequelize");
const db = require("../config/config");

const KartuRancanganStudi = db.define("kartu_rancangan_studi", {
  nomor_induk_mahasiswa: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  kode_mata_kuliah,
});

// labil tentang relasi antar table
