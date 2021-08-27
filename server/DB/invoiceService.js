const uuid = require("uuid");
const sql = require("./connectionService");

class InvoiceService {
  static async addInvoice(request) {
    const created_at = new Date();
    const guid = uuid.v4();
    const { product_details, customer_id, tax, discount } = request;
    const data = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO invoices  (product_details,customer_id,tax,discount,guid,created_at) VALUES (?,?,?,?,?,?);";
      sql.query(
        query,
        [
          JSON.stringify(product_details),
          customer_id,
          tax,
          discount,
          guid,
          created_at,
        ],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
    return {
      id: data.insertId,
      product_details,
      customer_id,
      tax,
      discount,
      guid,
      created_at,
    };
  }

  static async getAllInvoices() {
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT invoices.id, invoices.product_details, invoices.discount, invoices.tax, invoices.guid, invoices.created_at, customers.full_name, customers.email_id FROM invoices LEFT join customers  on customers.id = invoices.customer_id;";
      sql.query(query, (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    return response;
  }

  static async getInvoice(guid) {
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT invoices.id, invoices.product_details, invoices.discount,invoices.guid, invoices.tax, invoices.created_at, customers.full_name, customers.email_id FROM invoices LEFT join customers  on customers.id = invoices.customer_id WHERE invoices.guid = ?;";
      sql.query(query, [guid], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    return response;
  }

  static async deleteInvoice(guid) {
    const response = await new Promise((resolve, reject) => {
      const query = "DELETE FROM customers WHERE guid = ?";
      sql.query(query, [guid], (err, result) => {
        if (err) reject(new Error(err.message));
        resolve(result.affectedRows);
      });
    });
    return response === 1 ? true : false;
  }

  static async updateInvoice(guid, request) {
    const { full_name, phone_number, address, email_id, pincode } = request;
    const updated_at = new Date();
    const response = await new Promise((resolve, reject) => {
      const query =
        "UPDATE customers SET full_name = ?, phone_number = ?, address = ?, email_id = ?, pincode = ?, updated_at = ? WHERE guid = ?";
      sql.query(
        query,
        [full_name, phone_number, address, email_id, pincode, updated_at, guid],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
    if (response.affectedRows) {
      return {
        full_name,
        phone_number,
        address,
        email_id,
        pincode,
        guid,
        updated_at,
      };
    }
    return {};
  }
}

module.exports = InvoiceService;
