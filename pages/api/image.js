const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Images = mongoose.model("ImageDetails");

router.post('/upload-data', async (req, res) => {
  const { base64, name, email, complaint, location } = req.body;
  console.log(req.body);
  try {
    // Check if image data is provided
    if (!base64) {
      throw new Error('No image data provided');
    }

    // Check if name, email, and complaint are provided
    if (!name || !email || !complaint) {
      throw new Error('Name, email, or complaint data missing');
    }

    // Save image and other data to MongoDB
    await Images.create({ image: base64, name, email, complaint, location });
    res.send({ status: "ok", message: "Complaint Registered" });
  } catch (error) {
    console.error("Error uploading data:", error);
    res.status(400).send({ status: "error", message: "Failed to save data", error: error.message });
  }
});

router.get('/get-data', async (req, res) => {
  try {
    await Images.find({}).then(data => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ status: "error", message: "Failed to fetch data", error: error.message });
  }
});

module.exports = router;
