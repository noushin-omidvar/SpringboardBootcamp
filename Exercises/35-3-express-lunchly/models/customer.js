/** Customer for Lunchly - Represents a customer of the restaurant. */
const db = require("../db");
const Reservation = require("./reservation");

class Customer {
  /**
   * Create a new Customer object.
   * @param {object} data - Customer data including id, firstName, lastName, phone, and notes.
   */
  constructor({ id, firstName, lastName, middleName, phone, notes }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.phone = phone;
    this.notes = notes;
  }

  /**
   * Retrieve a list of all customers.
   * @returns {Customer[]} - An array of Customer objects.
   */
  static async all() {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes
       FROM customers
       ORDER BY last_name, first_name`
    );
    return results.rows.map((c) => new Customer(c));
  }

  /**
   * Retrieve a customer by their ID.
   * @param {number} id - The customer's ID.
   * @returns {Customer} - A Customer object.
   * @throws {Error} - Throws an error if the customer doesn't exist.
   */
  static async get(id) {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes 
        FROM customers WHERE id = $1`,
      [id]
    );

    const customer = results.rows[0];

    if (customer === undefined) {
      const err = new Error(`No such customer: ${id}`);
      err.status = 404;
      throw err;
    }

    return new Customer(customer);
  }

  /**
   * Retrieve all reservations for this customer.
   * @returns {Reservation[]} - An array of Reservation objects.
   */
  async getReservations() {
    return await Reservation.getReservationsForCustomer(this.id);
  }

  /**
   * Get the full name of the customer, including middle name if available.
   * @returns {string} - The full name of the customer.
   */
  get fullName() {
    const nameParts = [this.firstName, this.middleName, this.lastName].filter(
      Boolean
    );
    return nameParts.join(" ");
  }

  get notes() {
    return this._notes;
  }

  set notes(value) {
    if (!value) {
      this._notes = "";
    } else {
      this._notes = value;
    }
  }

  /**
   * Retrieve a list of the top 10 best customers based on the number of reservations.
   * @returns {Customer[]} - An array of Customer objects.
   */
  static async bestCustomer() {
    const results = await db.query(
      `SELECT c.id, 
      c.first_name AS "firstName", 
      c.last_name AS "lastName", 
      c.phone, 
      c.notes 
       FROM customers AS c
       JOIN reservations AS r 
       ON c.id = r.customer_id 
       GROUP BY c.id, c.first_name, c.last_name 
       ORDER BY COUNT(r.customer_id) DESC 
       LIMIT 10;`
    );
    return results.rows.map((c) => new Customer(c));
  }

  /**
   * Search for customers by their first name and last name.
   * @param {string} searchQuery - The search query which can include first name, last name, or both.
   * @returns {Customer[]} - An array of Customer objects matching the search query.
   */
  static async searchByName(searchQuery) {
    // Split the search query into first name and last name
    const names = searchQuery.split(" ");
    const firstName = names[0];
    const lastName = names[1] || ""; // Use an empty string if no last name is provided

    // Use ILIKE to perform a case-insensitive search for both first name and last name
    const results = await db.query(
      `SELECT id, 
        first_name AS "firstName",  
        last_name AS "lastName", 
        phone, 
        notes
      FROM customers
      WHERE (first_name ILIKE $1 OR last_name ILIKE $1)
      AND (last_name ILIKE $2)
      ORDER BY last_name, first_name`,
      [`%${firstName}%`, `%${lastName}%`]
    );

    return results.rows.map((c) => new Customer(c));
  }

  /**
   * Save the customer to the database. Create a new customer if it doesn't have an ID, or update an existing customer.
   */
  async save() {
    if (this.id === undefined) {
      const result = await db.query(
        `INSERT INTO customers (first_name, last_name, phone, notes)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
        [this.firstName, this.lastName, this.phone, this.notes]
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
        `UPDATE customers SET first_name=$1, last_name=$2, phone=$3, notes=$4
             WHERE id=$5`,
        [this.firstName, this.lastName, this.phone, this.notes, this.id]
      );
    }
  }
}

module.exports = Customer;
