const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const customerRoutes = require("./Controllers/customerController");

app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/customers", customerRoutes);

app.listen(process.env.PORT, () => console.log("server started"));
