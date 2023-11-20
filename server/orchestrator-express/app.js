require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", router); 
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
