var express = require("express");
var router = express.Router();
const Mahasiswa = require("../models/Mahasiswa");
// fastest validator
const Validator = require("fastest-validator");
const v = new Validator();
// bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
// jwt
const jwt = require("jsonwebtoken");
const secretKey = "ini_adalah_secret";

// fungsi error
function ErrorResponse(err, res) {
  return res.status(500).json({
    status: 500,
    message: err.toString(),
  });
}

// mengubah password
hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRounds);
};
// membaca password
decryptPassword = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};

// membuat token
createToken = (payload) => {
  return jwt.sign(payload.toJSON, secretKey);
};
// membuka token
parseToken = (token) => {
  return jwt.verify(token, secretKey);
};

// Registrasi
router.post("/registrasi", async (req, res) => {
  try {
    const { nomor_induk_mahasiswa, nama_mahasiswa, password } = req.body;

    // validator
    const schema = {
      nomor_induk_mahasiswa: {
        type: "custom",
        nullable: false,
      },
      nama_mahasiswa: {
        type: "string",
        nullable: false,
      },
      password: {
        type: "string",
        nullable: false,
      },
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }

    // cek nim terdaftar atau belum
    const valNIM = await Mahasiswa.findAll({
      where: {
        nomor_induk_mahasiswa: nomor_induk_mahasiswa,
      },
    });
    if (valNIM.length != 0) {
      return res.status(400).json({
        message: "NIM telah terdaftar",
      });
    }

    // create akun
    const hashedPassword = hashPassword(password);

    const newMahasiswa = await Mahasiswa.create({
      nomor_induk_mahasiswa: nomor_induk_mahasiswa,
      nama_mahasiswa: nama_mahasiswa,
      password: hashedPassword,
    });

    res.status(200).json({
      status: 200,
      message: "Create success",
      data: newMahasiswa,
    });
  } catch (err) {
    return ErrorResponse(err, res);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { nomor_induk_mahasiswa, password } = req.body;

    // validator
    const schema = {
      nomor_induk_mahasiswa: {
        type: "custom",
        nullable: false,
      },
      password: {
        type: "string",
        nullable: false,
      },
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }

    // mendacri data mahasiswa
    const mahasiswa = await Mahasiswa.findOne({
      where: { nomor_induk_mahasiswa: nomor_induk_mahasiswa },
    });
    if (mahasiswa) {
      if (decryptPassword(password, mahasiswa.password)) {
        // const accessToken = createToken(mahasiswa);
        return res.status(200).json({
          status: 200,
          //   token: accessToken,
          data: mahasiswa,
        });
      }
      return res.status(401).json({
        status: 401,
        massage: "Invalid password",
      });
    }
    return res.status(404).json({
      status: 404,
      massage: "Can't find account with that email",
    });
  } catch (err) {
    return ErrorResponse(err, res);
  }
});

// mencari semua data mahasiswa
router.get("/all", async (req, res) => {
  try {
    const getAllMahasiswa = await Mahasiswa.findAll({});
    res.status(200).json({
      status: 200,
      message: "Success",
      data: getAllMahasiswa,
    });
  } catch (err) {
    return ErrorResponse(err, res);
  }
});

module.exports = router;
