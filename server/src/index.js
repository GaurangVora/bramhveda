const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use((req, _, next) => {
  req.body = req.body ?? {};
  next();
});
app.use("/api", router);

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
