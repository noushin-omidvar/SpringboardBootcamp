/** Routes for Lunchly */

const express = require("express");
const moment = require("moment");

const Customer = require("./models/customer");
const Reservation = require("./models/reservation");

const router = new express.Router();

/** Homepage: show list of customers. */

router.get("/", async function (req, res, next) {
  try {
    const customers = await Customer.all();
    return res.render("customer_list.html", { customers });
  } catch (err) {
    return next(err);
  }
});

router.get("/bests", async function (req, res, next) {
  try {
    const customers = await Customer.bestCustomer();
    return res.render("best_customer_list.html", { customers });
  } catch (err) {
    return next(err);
  }
});

router.get("/search/", async (req, res, next) => {
  try {
    const searchQuery = req.query.search.toString(); // Convert to string

    // Perform the search in model
    const searchResults = await Customer.searchByName(searchQuery);

    // Render a template with the search results
    res.render("search-results.html", { results: searchResults });
  } catch (err) {
    return next(err);
  }
});

/** Form to add a new customer. */

router.get("/add/", async function (req, res, next) {
  try {
    return res.render("customer_new_form.html");
  } catch (err) {
    return next(err);
  }
});

/** Handle adding a new customer. */

router.post("/add/", async function (req, res, next) {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const notes = req.body.notes;

    const customer = new Customer({ firstName, lastName, phone, notes });
    await customer.save();

    return res.redirect(`/${customer.id}/`);
  } catch (err) {
    return next(err);
  }
});

/** Show a customer, given their ID. */

router.get("/:id/", async function (req, res, next) {
  try {
    const customer = await Customer.get(req.params.id);

    const reservations = await customer.getReservations();

    return res.render("customer_detail.html", { customer, reservations });
  } catch (err) {
    return next(err);
  }
});

/** Show form to edit a customer. */

router.get("/:id/edit/", async function (req, res, next) {
  try {
    const customer = await Customer.get(req.params.id);
    res.render("customer_edit_form.html", { customer });
  } catch (err) {
    return next(err);
  }
});

/** Handle editing a customer. */

router.post("/:id/edit/", async function (req, res, next) {
  try {
    const customer = await Customer.get(req.params.id);
    customer.firstName = req.body.firstName;
    customer.lastName = req.body.lastName;
    customer.phone = req.body.phone;
    customer.notes = req.body.notes;
    await customer.save();

    return res.redirect(`/${customer.id}/`);
  } catch (err) {
    return next(err);
  }
});

/** Handle adding a new reservation. */

router.post("/:id/add-reservation/", async function (req, res, next) {
  try {
    const customerId = req.params.id;
    const startAt = new Date(req.body.startAt);
    const numGuests = req.body.numGuests;
    const notes = req.body.notes;

    const reservation = new Reservation({
      customerId,
      startAt,
      numGuests,
      notes,
    });
    await reservation.save();

    return res.redirect(`/${customerId}/`);
  } catch (err) {
    return next(err);
  }
});

// Route to edit an existing reservation
router.get("/:id/edit-reservation/:rid", async (req, res, next) => {
  try {
    const customer = await Customer.get(req.params.id);

    const reservation = await Reservation.getReservation(req.params.rid);
    reservation.start_at = reservation.start_at.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    return res.render("reservation_detail.html", { customer, reservation });
  } catch (err) {
    return next(err);
  }
});

router.post("/:id/edit-reservation/:rid", async (req, res, next) => {
  try {
    const { numGuests, startAt, notes } = req.body;
    const rid = req.params.rid;
    const id = req.params.id;
    // Call the updateReservation method in the Reservation model
    const updatedReservation = await Reservation.updateReservation(
      rid,
      numGuests,
      new Date(startAt),
      notes
    );

    // Redirect or send a response as needed
    res.redirect(`/${id}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
