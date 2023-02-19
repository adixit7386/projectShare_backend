const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    visibility: { type: String, default: "public" },
    link: { type: String, required: true },
    members: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    ],
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
