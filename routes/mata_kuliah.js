var express = require("express");
var router = express.Router();
const MataKuliah = require("../models/MataKuliah");

// fungsi error
function ErrorResponse(err, res) {
  return res.status(500).json({
    status: 500,
    message: err.toString(),
  });
}

// membaca semua matkul
router.get("/all", async (req, res) => {
  try {
    const getAllMatKul = await MataKuliah.findAll({});
    res.status(200).json({
      message: "Status",
      data: getAllMatKul,
    });
  } catch (err) {
    return ErrorResponse(err, res);
  }
});

module.exports = router;
