const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Static files (for CSS)
app.use(express.static("public"));

// View engine
app.set("view engine", "ejs");

// ================= DATA =================
let donors = [];
let patients = [];
let inventory = [];

// ================= DASHBOARD =================
app.get("/", (req, res) => {
  res.render("index", { inventory });
});

// ================= DONORS =================

// View donors
app.get("/donors", (req, res) => {
  res.render("donors", { donors });
});

// Add donor
app.post("/add-donor", (req, res) => {
  const { name, blood } = req.body;
  donors.push({ name, blood });
  res.redirect("/donors");
});

// Delete donor
app.post("/delete-donor/:index", (req, res) => {
  donors.splice(req.params.index, 1);
  res.redirect("/donors");
});

// ================= PATIENTS =================

// View patients
app.get("/patients", (req, res) => {
  res.render("patients", { patients });
});

// Add patient
app.post("/add-patient", (req, res) => {
  const { name, blood } = req.body;
  patients.push({ name, blood });
  res.redirect("/patients");
});

// Delete patient
app.post("/delete-patient/:index", (req, res) => {
  patients.splice(req.params.index, 1);
  res.redirect("/patients");
});

// ================= INVENTORY =================

// Add inventory
app.post("/add-inventory", (req, res) => {
  const { blood, qty } = req.body;
  inventory.push({ blood, qty: parseInt(qty) });
  res.redirect("/");
});

// Delete inventory
app.post("/delete-inventory/:index", (req, res) => {
  inventory.splice(req.params.index, 1);
  res.redirect("/");
});

// Edit inventory
app.post("/edit-inventory/:index", (req, res) => {
  const { blood, qty } = req.body;
  inventory[req.params.index] = { blood, qty: parseInt(qty) };
  res.redirect("/");
});

// ================= SEARCH =================
app.get("/search", (req, res) => {
  const query = req.query.q.toLowerCase();

  const filtered = inventory.filter(item =>
    item.blood.toLowerCase().includes(query)
  );

  res.render("index", { inventory: filtered });
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});