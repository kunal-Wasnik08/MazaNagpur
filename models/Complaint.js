const mongoose = require('mongoose');

// Check if the model already exists
const ImageDetails = mongoose.models.ImageDetails || mongoose.model('ImageDetails', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    complaint: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String },
    slug: { type: String },
    location: {
        latitude: String,
        longitude: String   
    }
}, {
    collection: "ImageDetails"
}));

module.exports = ImageDetails;
