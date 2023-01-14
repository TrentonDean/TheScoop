const mongoose = require('mongoose');

const TheScoopSchema = new mongoose.Schema({ 
    gameName: {type: String, required:[true, "Game name is required"], minLength:[2, "Game name must be at least 2 characters"]},
    rating: {type: Number, required:[true, "Rating is required"]},
    description: {type: String, required:[true, "Description is required"], minLength:[20, "Description must be at least 20 characters"]},
    otherNotes: {type: String}
}, { timestamps: true });

module.exports = mongoose.model('Game', TheScoopSchema);