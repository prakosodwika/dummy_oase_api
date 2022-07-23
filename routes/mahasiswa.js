var express = require("express");
var router = express.Router();
const Mahasiswa = require("../models/Mahasiswa");
const Validator = require("fastest-validator");
const v = new Validator();

// fungsi error
function ErrorResponse(err, res) {
  return res.status(500).json({
    status: 500,
    message: err.toString(),
  });
}

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
