const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  images: [String],  // Array for image URLs
  tags: [String],    // Tags like car_type, company, dealer, etc.
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Car', carSchema);
