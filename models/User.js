const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {},
  lastName: {},
  thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const User = model("User", userSchema);

User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.insertMany(
      [
        { firstName: "Ethan", lastName: "Sorensen" },
        { firstName: "Kenzi", lastName: "Sorensen" },
        { firstName: "Calvin", lastName: "Brewer" },
        { firstName: "June", lastName: "Page" },
        { firstName: "Edith", lastName: "Roy" },
      ],
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  }
});

module.exports = User;
