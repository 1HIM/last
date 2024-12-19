const express = require("express");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all contacts (protected)
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }); // User-specific
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new contact (protected)
router.post("/", auth, async (req, res) => {
  try {
    const newContact = new Contact({ ...req.body, user: req.user.id }); // User-specific
    const contact = await newContact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a contact (protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a contact (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
