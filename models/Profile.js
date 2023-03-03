const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    name: { type: String, required: true },
    jobtitle: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },

    // dob: {
    //   date: { type: Date, required: true },
    //   visibility: { type: String, default: "private" },
    // },
    // email: {
    //   id: { type: String, required: true },
    //   visibility: { type: String, default: "private" },
    // },
    // contact: {
    //   number: { type: String, required: true },
    //   visibility: { type: String, default: "private" },
    // },
    education: [
      {
        title: { type: String, required: true },
        institution: { type: String, require: true },
        score: { type: String, required: true },
        year: { type: String, required: true },
      },
    ],
    links: [
      {
        website: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    projects: [
      {
        title: { type: String, required: true },
        link: { type: String, required: true },
        from: { type: Date, required: true },
        to: { type: Date, required: true },
        description: { type: String, required: true },
      },
    ],
    skills: [
      {
        skill: { type: String, required: true },
        rating: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
