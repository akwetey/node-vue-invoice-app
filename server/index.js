const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const customerRoutes = require("./routes/customer");
const invoiceRoutes = require("./routes/invoice");

app.use(express.json());
app.use(cors());
dotenv.config();

// routes
app.use("/api/customers", customerRoutes);
app.use("/api/invoices", invoiceRoutes);

app.listen(process.env.PORT, () => console.log("server started"));
