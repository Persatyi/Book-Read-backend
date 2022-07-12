const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
    min: this.start,
  },
  books: {
    type: [mongoose.Types.ObjectId],
    ref: "book",
  },
});

const Training = mongoose.model("training", trainingSchema);

module.exports = Training;
