const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
    pollId: {
     type: String, 
     unique: true 
    },

    question: {
        type: String, 
        required: true 
        },

    options: [
    {
        text: String,
        votes: { 
            type: Number, 
            default: 0 
        }
    }
    ],
    voters: [String],    // store IPs for anti-abuse
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("Poll", PollSchema);
