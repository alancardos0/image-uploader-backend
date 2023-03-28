const router = require("express").Router();
const Picture = require("../models/Pictures");
const express = require("express");

router.use(express.json());

router.post("/", async (req, res) => {
  console.log("body", req.body);
  const { path, imgType, file } = req.body;
  const picture = {
    path,
    imgType,
    file,
  };
  try {
    await Picture.create(picture);
    res.status(201).json({ message: "Foto adicionada com sucesso!" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const picture = await Picture.findOne().sort({ $natural: -1 }).limit(1);
    res.status(200).json(picture);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const picture = await Picture.find();
    res.status(200).json(picture);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/deleteImage/:id", async (req, res) => {
  try {
    const picture = await Picture.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Imagem Apagada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error, message: "Erro ao apagar!" });
  }
});

module.exports = router;
