const CustomerService = require("../db/customerService");

class CustomerController {
  // get all customers
  static async index(_, res) {
    try {
      const allCustomers = await CustomerService.getAllCustomers();
      res.status(200).json({
        data: allCustomers,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Create customer
  static async store(req, res) {
    try {
      const newCustomer = await CustomerService.addCustomer(req.body);
      res.status(200).json({
        message: "New Customer Created",
        data: newCustomer,
      });
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    }
  }

  //get customer
  static async show(req, res) {
    try {
      const customer = await CustomerService.getCustomer(req.params.guid);
      customer.length
        ? res.status(200).json({
            data: customer[0],
          })
        : res.status(404).json({
            message: "Customer Does Not Exist.",
          });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // delete customer
  static async destroy(req, res) {
    try {
      const isDeleted = await CustomerService.deleteCustomer(req.params.guid);
      isDeleted
        ? res.status(200).json({
            message: "Customer Deleted",
          })
        : res.status(404).json({
            message: "Customer Does Not Exist.",
          });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  //update customer
  static async update(req, res) {
    try {
      const updatedCustomer = await CustomerService.updateCustomer(
        req.params.guid,
        req.body
      );
      Object.values(updatedCustomer).length
        ? res.status(200).json({
            message: "Customer Updated",
            data: updatedCustomer,
          })
        : res.status(404).json({
            message: "Customer Does Not Exist.",
          });
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = CustomerController;
