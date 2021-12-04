const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const electroRoutes = require("./routes/electro.routes");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 4000;
const host = "0.0.0.0";
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.f1tw2.mongodb.net/myDemo?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to moongoose");
  })
  .catch((error) => console.log(`${error},could not connect`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(bodyParser.json());

app.use("/", electroRoutes);

// app.get("/", (req, res) => {
//   res.send({ message: "Hello World" });
// });

app.listen(port, host, () => {
  console.log(`Node server is listening on port ${port}`);
});
