const router = require("express").Router();
const Users = require("../models/Users");
const express = require("express");
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

router.use(express.json());

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const users = {
    username,
    password,
  };
  try {
    await Users.create(users);
    res.status(201).json({ message: "Usuario adicionado com sucesso!" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const users = {
    username,
    password,
  };
  console.log("Entrou na router");
  try {
    const isUserDataTrue = await Users.findOne(users);
    console.log("Entrou na router123", isUserDataTrue);
    if (isUserDataTrue) {
      const token = jwt.sign({}, process.env.SECRET, {
        expiresIn: 300,
      });
      res.status(200).json({ auth: true, token: token });
    }
    res.status(400).json({ message: "Usuario ou senha incorreta!" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
