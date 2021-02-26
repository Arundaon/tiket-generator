const { string } = require("joi");
const mongoose = require("mongoose");
const schema = mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    tanggalLahir: {
        type: Date,
        required: true,
    },
    stasiunAwal: {
        type: String,
        required: true,
    },
    jamBerangkat: {
        type: Date,
        required: true,
    },
    stasiunTujuan: {
        type: String,
        required: true,
    },
    jamSampai: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("penumpang", schema);
