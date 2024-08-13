const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    location: {
        latitude: String,
        longitude: String
    }

}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);



