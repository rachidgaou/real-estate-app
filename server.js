const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

/* ---------------- GUARDS ---------------- */
if (!process.env.MONGO_URL) {
  console.error("FATAL: MONGO_URL is not set");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

/* ---------------- DATABASE ---------------- */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

/* ---------------- MODELS ---------------- */
const propertySchema = new mongoose.Schema({
  name: String,
  img: String,
  price: String,
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

const Property = mongoose.model("Property", propertySchema);
const Contact = mongoose.model("Contact", contactSchema);

/* ---------------- ROUTES ---------------- */

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

/* CONTACT */
app.get("/contact", async (req, res) => {
  try {
    const data = await Contact.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/contact", async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* PROPERTIES */
app.get("/AddProperties", async (req, res) => {
  try {
    const data = await Property.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/AddProperties", async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/AddProperties/:id", async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/AddProperties/:id", async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});