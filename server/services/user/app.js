if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
const cors = require("cors");
const { connect } = require("./config/connection");
const errorHandler = require("./middlewares/errorHandler.js");
const router = require("./routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/users", router);
app.use(errorHandler);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

connect().then((db) => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
