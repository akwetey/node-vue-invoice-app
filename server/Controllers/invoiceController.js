const InvoiceService = require("../db/invoiceService");

class InvoiceController {
  // get all invoices
  static async index(_, res) {
    try {
      const allInvoices = await InvoiceService.getAllInvoices();
      res.status(200).json({
        data: allInvoices,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Create invoice
  static async store(req, res) {
    try {
      const newInvoice = await InvoiceService.addInvoice(req.body);
      res.status(200).json({
        message: "New Invoice Created",
        data: newInvoice,
      });
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    }
  }

   // get invoice
  static async show(req, res) {
    try {
      const invoice = await InvoiceService.getInvoice(req.params.guid);
      invoice.length
        ? res.status(200).json({
            data: invoice[0],
          })
        : res.status(404).json({
            message: "Invoice Does Not Exist.",
          });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = InvoiceController;
