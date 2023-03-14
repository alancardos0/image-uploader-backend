const express = require('express')
const cors = require('cors')
const app = express();
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

app.use(express.urlencoded({
  extended: true,
  limit: "10mb"
}))
app.use(express.json({ limit: '10mb' }))
app.use(cors())

const pictureRoutes = require('../routes/picturesRoutes.js')
app.use('/picture', pictureRoutes)
console.log('routes', pictureRoutes)

mongoose.connect('mongodb+srv://alancardoso:mateus7566@cluster0.ivw1iuu.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log("MongoServer ON")
  })
  .catch(error => {
    console.log(error)
  })

app.listen(3000, () => console.log('Rodando na porta 3000'))