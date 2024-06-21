import mongoose from "mongoose";

const environmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  urls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "URL",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Environment =
  mongoose.models.Environment ||
  mongoose.model("Environment", environmentSchema);

export default Environment;
