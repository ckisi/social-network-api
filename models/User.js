const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const Thought = require("./Thought");

// users are the profiles for this site
// friends is the user's model referring to itself to add users to users
// also links to the thoughts model which are basically posts

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// virtual for friend count, retrieves length of friends array
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
