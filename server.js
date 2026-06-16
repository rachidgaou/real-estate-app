console.log("MONGO_URL:", process.env.MONGO_URL);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

/* ---------------- DATABASE ---------------- */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

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
  res.send("your server is working");
});

/* CONTACT */
app.get("/contact", async (req, res) => {
  const data = await Contact.find();
  res.json(data);
});

app.post("/contact", async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.json(newContact);
});

/* PROPERTIES */
app.get("/AddProperties", async (req, res) => {
  const data = await Property.find();
  res.json(data);
});

app.post("/AddProperties", async (req, res) => {
  const newProperty = await Property.create(req.body);
  res.json(newProperty);
});

app.delete("/AddProperties/:id", async (req, res) => {
  const deleted = await Property.findByIdAndDelete(req.params.id);
  res.json(deleted);
});

app.put("/AddProperties/:id", async (req, res) => {
  const updated = await Property.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});