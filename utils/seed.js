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

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(users);
    console.log("Users seeded successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    connection.close();
  }
};

seedDatabase();
