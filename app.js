const { json } = require("body-parser");
const express = require("express");
const app = express();
const ejs = require("ejs");
const port = process.env.PORT || 8000;
require("dotenv/config");
const mongoose = require("mongoose");
const Penumpang = require("./Models/Penumpang");
const urlencodedParser = express.urlencoded({ extended: false });
app.set("view engine", "ejs");
app.set("views", "website");
app.get("/", async (req, res) => {
    try {
        const penumpangs = await Penumpang.find();
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
    } catch (err) {
        res.json(err);
    }
});
app.get("/show/:id", async (req, res) => {
    try {
        const penumpang = await Penumpang.findById(req.params.id);
        res.json(penumpang);
    } catch (err) {
        res.status(400).json({ message: "id not found", err });
    }
});
app.get("/show-all", async (req, res) => {
    try {
        const penumpangs = await Penumpang.find();
        res.json(penumpangs);
    } catch (err) {
        res.status(400).json({ message: "invalid request", err });
    }
});
app.delete("/delete", async (req, res) => {
    try {
        Penumpang.deleteOne({ _id: req.body._id });
        res.send("<script>alert('deleted')</script>");
    } catch (err) {
        res.send("<script>alert('error deleting');</script>");
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
            app.listen(port, () => {
                console.log("listening to port " + port);
            });
            console.log("connected to database");
        }
    }
);
