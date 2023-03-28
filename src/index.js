const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const { verifyJWT } = require("../routes/middlewares/jwt");
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
mongoose.set("strictQuery", false);
const usersRoutes = require("../routes/usersRoutes.js");
const pictureRoutes = require("../routes/picturesRoutes.js");

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(verifyJWT);

app.use("/users", usersRoutes);
app.use("/picture", pictureRoutes);

mongoose
  .connect(
    "mongodb+srv://alancardoso:mateus7566@cluster0.ivw1iuu.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoServer ON");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => console.log("Rodando na porta 3000"));
