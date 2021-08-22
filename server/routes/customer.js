const validateCustomer = require("./customerValidation");
const CustomerController = require("../controllers/customerController");
const express = require("express");
const router = express.Router();

router.get("/", CustomerController.index);

router.post("/", validateCustomer, CustomerController.store);

router.get("/:guid", CustomerController.show);

router.delete("/:guid", CustomerController.destroy);

router.put("/:guid", validateCustomer, CustomerController.update);

module.exports = router;
