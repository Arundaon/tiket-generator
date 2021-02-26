const { json } = require("body-parser");
const express = require("express");
const app = express();
const ejs = require("ejs");
require("dotenv/config");
const mongoose = require("mongoose");
const Penumpang = require("./Models/Penumpang");
const urlencodedParser = express.urlencoded({ extended: false });
app.set("view engine", "ejs");
app.set("views", "website");
console.log(process.env.DATABASE_KEY);
app.get("/", async (req, res) => {
    try {
        const penumpangs = await Penumpang.find();
        console.log(penumpangs);
        res.render("home", { penumpangs: penumpangs });
    } catch (err) {
        res.send(err);
    }
});
app.post("/create", urlencodedParser, async (req, res) => {
    const penumpang = new Penumpang({
        nama: req.body.nama,
        tanggalLahir: req.body.tanggalLahir,
        stasiunAwal: req.body.stasiunAwal,
        jamBerangkat: req.body.jamBerangkat,
        stasiunTujuan: req.body.stasiunTujuan,
        jamSampai: req.body.jamSampai,
    });
    try {
        const savedPenumpang = await penumpang.save();
        res.redirect("/");
    } catch {
        res.send(err);
    }
});
mongoose.connect(
    "mongodb+srv://ary:" +
        process.env.DATABASE_KEY +
        "@bcc-workshop.u94wq.mongodb.net/bcc-internship?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            app.listen(3000, () => {
                console.log("listening");
            });
            console.log("connected to database");
        }
    }
);
