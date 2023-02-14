const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema({
  text: { type: String, minLength: 10, maxLength: 300, required: true },
  meta: {
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
  },
});

const Thought = model("Thought", thoughtSchema);

Thought.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    Thought.insertMany(
      [
        { text: "Don't let yesterday take up too much of today" },
        { text: "If you're going through hell, keep going" },
        { text: "Every man dies. Not every man lives" },
        { text: "We need much less than we think we need" },
        { text: "Whatever you are, be a good one" },
      ],
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  }
});

module.exports = Thought;
