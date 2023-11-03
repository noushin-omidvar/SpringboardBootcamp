const moment = require("moment");
const db = require("../db");

/**
 * Represents a reservation for a party at Lunchly.
 */
class Reservation {
  /**
   * Create a new reservation.
   * @param {object} data - Reservation data.
   * @param {number} data.id - Reservation ID.
   * @param {number} data.customerId - Customer ID associated with the reservation.
   * @param {number} data.numGuests - Number of guests in the reservation.
   * @param {Date} data.startAt - Start date and time of the reservation.
   * @param {string} data.notes - Additional notes for the reservation.
   */
  constructor({ id, customerId, numGuests, startAt, notes }) {
    this.id = id;
    this.customerId = customerId;
    this.numGuests = numGuests;
    this.startAt = new Date(startAt);
    this.notes = notes;
  }

  /**
   * Format the start date and time.
   * @returns {string} Formatted date and time.
   */
  getFormattedStartAt() {
    return moment(this.startAt).format("MMMM Do YYYY, h:mm a");
  }

  /**
   * Get the number of guests in the reservation.
   * @returns {number} Number of guests.
   */
  get numGuests() {
    return this._numGuests;
  }

  /**
   * Set the number of guests in the reservation.
   * @param {number} value - Number of guests to set.
   */
  set numGuests(value) {
    if (value < 1) {
      throw new Error("Number of guests must be 1 or more.");
    }
    this._numGuests = value;
  }

  /**
   * Get the customer ID associated with the reservation.
   * @returns {number} Customer ID.
   */
  get customerId() {
    return this._customerId;
  }

  /**
   * Set the customer ID for the reservation.
   * @param {number} value - Customer ID to set.
   */
  set customerId(value) {
    if (this._customerId !== undefined) {
      throw new Error("Customer ID cannot be reassigned.");
    }
    this._customerId = value;
  }

  /**
   * Get the start date and time of the reservation.
   * @returns {Date} Start date and time.
   */
  get startAt() {
    return this._startAt;
  }

  /**
   * Set the start date and time for the reservation.
   * @param {Date} value - Start date and time to set.
   */
  set startAt(value) {
    this._startAt = value;
  }

  /**
   * Validate if the input is a valid Date object.
   * @param {Date} value - Value to validate.
   * @returns {Date} Valid Date object.
   * @throws {Error} If the input is not a valid Date object.
   */
  validateDate(value) {
    if (!(value instanceof Date)) {
      throw new Error("Start date must be a valid Date object.");
    }
    return value;
  }

  /**
   * Retrieve reservations for a specific customer by their ID.
   * @param {number} customerId - Customer ID.
   * @returns {Array<Reservation>} Reservations for the customer.
   */
  static async getReservationsForCustomer(customerId) {
    const results = await db.query(
      `SELECT id, 
           customer_id AS "customerId", 
           num_guests AS "numGuests", 
           start_at AS "startAt", 
           notes AS "notes"
         FROM reservations 
         WHERE customer_id = $1`,
      [customerId]
    );

    return results.rows.map((row) => new Reservation(row));
  }

  static async getReservation(id) {
    const results = await db.query(
      `SELECT *
         FROM reservations 
         WHERE id = $1`,
      [id]
    );

    return results.rows[0];
  }

  // Method to update an existing reservation
  static async updateReservation(rid, numGuests, startAt, notes) {
    startAt = new Date(startAt);
    console.log("startAt input:", startAt);
    console.log("startAt type:", typeof startAt);
    const result = await db.query(
      `UPDATE reservations
       SET num_guests=$1, start_at=$2, notes=$3
       WHERE id = $4
       RETURNING *`,
      [numGuests, startAt, notes, rid]
    );
    console.log("herejkfjjfdljdfjdfkjv;dk");
    if (result.rows.length === 0) {
      throw new Error(`Reservation with ID ${rid} not found.`);
    }
    console.log("results", result.rows[0]);
    return new Reservation(result.rows[0]);
  }

  /**
   * Save the reservation to the database.
   */
  async save() {
    if (this.id === undefined) {
      const result = await db.query(
        `INSERT INTO reservations (customer_id, start_at, num_guests, notes)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
        [this.customerId, this.startAt, this.numGuests, this.notes]
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
        `UPDATE reservations SET customer_id=$1, start_at=$2, num_guests=$3, notes=$4
             WHERE id=$5`,
        [this.customerId, this.startAt, this.numGuests, this.notes, this.id]
      );
    }
  }
}

module.exports = Reservation;
