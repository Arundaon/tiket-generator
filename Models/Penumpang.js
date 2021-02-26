const { string } = require("joi");
const mongoose = require("mongoose");
const schema = mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    tanggalLahir: {
        type: String,
        required: true,
    },
    stasiunAwal: {
        type: String,
        required: true,
    },
    jamBerangkat: {
        type: String,
        required: true,
    },
    stasiunTujuan: {
        type: String,
        required: true,
    },
    jamSampai: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("penumpang", schema);
