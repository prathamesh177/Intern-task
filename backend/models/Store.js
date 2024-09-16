


const mongoose = require('mongoose');


const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    maxlength: 400,
  },

  ratings: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User who rated
    rating: { type: Number, min: 1, max: 5 } // Rating between 1 and 5
  }],

  averageRating: {
    type: Number,
    default: 0,
  },
});


storeSchema.methods.getAverageRating = function() {
  if (this.ratings.length === 0) return 0; // No ratings yet
  const total = this.ratings.reduce((acc, item) => acc + item.rating, 0); // Sum all ratings
  return total / this.ratings.length; // Return average
};

module.exports = mongoose.model('Store', storeSchema);
