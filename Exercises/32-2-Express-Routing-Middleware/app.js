const express = require("express");
const app = express();
const itemsRoutes = require("./itemsRouters");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/items", itemsRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app;
