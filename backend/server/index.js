// MODULES //
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require('cors')

// Load environment variables from .env file
dotenv.config();

// DATABASE CONNECTION //
const connectToMongo = require("./db");
connectToMongo();

// ROUTES //
const authRouter = require("./routes/auth");
const functionsRouter = require("./routes/functions")

// APP creation
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
app.use(cors())

// TRIAL //
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ROUTES //
app.use("/auth", authRouter);
app.use("/api", functionsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});