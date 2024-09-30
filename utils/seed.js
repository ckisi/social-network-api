const connection = require("../config/connection");
const { User, Thought } = require("../models");

const users = [
  {
    username: "user1",
    email: "user1@example.com",
  },
  {
    username: "user2",
    email: "user2@example.com",
  },
  {
    username: "user3",
    email: "user3@example.com",
  },
];

const thoughts = [
  {
    thoughtText: "This is my first thought!",
    username: "user1",
  },
  {
    thoughtText: "I love programming!",
    username: "user2",
  },
  {
    thoughtText: "MongoDB is great for NoSQL databases.",
    username: "user3",
  },
];

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    const createdUsers = await User.insertMany(users);
    console.log("Users seeded successfully!");

    await Thought.deleteMany({});
    const createdThoughts = await Thought.insertMany(thoughts);
    console.log("Thoughts seeded successfully!");

    // Associate thoughts with users
    for (let i = 0; i < createdThoughts.length; i++) {
      const thought = createdThoughts[i];
      const user = createdUsers.find(user => user.username === thought.username);
      if (user) {
        await User.findByIdAndUpdate(user._id, {
          $push: { thoughts: thought._id },
        });
      }
    }

    console.log("Thoughts associated with users successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    connection.close();
  }
};

seedDatabase();
