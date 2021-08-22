const uuid = require("uuid");
const sql = require("./connectionService");

class CustomerService {
  static async addCustomer(request) {
    const created_at = new Date();
    const guid = uuid.v4();
    const { full_name, phone_number, address, email_id, pincode } = request;
    const data = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO customers (full_name, phone_number,address,email_id, pincode, guid, created_at) VALUES (?,?,?,?,?,?,?);";
      sql.query(
        query,
        [full_name, phone_number, address, email_id, pincode, guid, created_at],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
    return {
      id: data.insertId,
      full_name,
      phone_number,
      address,
      email_id,
      pincode,
      guid,
      created_at,
    };
  }

  static async getAllCustomers() {
    const response = await new Promise((resolve, reject) => {
      const query = "SELECT * FROM customers;";
      sql.query(query, (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    return response;
  }

  static async getCustomer(guid) {
    const response = await new Promise((resolve, reject) => {
      const query = "SELECT * FROM customers WHERE guid = ?;";
      sql.query(query, [guid], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    return response;
  }

  static async deleteCustomer(guid) {
    const response = await new Promise((resolve, reject) => {
      const query = "DELETE FROM customers WHERE guid = ?";
      sql.query(query, [guid], (err, result) => {
        if (err) reject(new Error(err.message));
        resolve(result.affectedRows);
      });
    });
    return response === 1 ? true : false;
  }

  static async updateCustomer(guid, request) {
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

module.exports = CustomerService;
