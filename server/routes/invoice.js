const InvoiceController = require("../controllers/invoiceController");
const express = require("express");
const router = express.Router();

router.get("/", InvoiceController.index);

router.post("/", InvoiceController.store);

router.get("/:guid", InvoiceController.show);


module.exports = router;
