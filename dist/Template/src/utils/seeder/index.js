const Users = require("../../../src/resources/Users/users.model");

module.exports = {
  init: async () => {
    const userCount = await Users.countDocuments();

    console.log("Seed check...");
    if (userCount === 0) {
      await module.exports.seedAdministrator();
    }
    console.log("Seed check done ###");
  },
  seedAdministrator: async () => {
    console.log("seeding admin");
    try {
      console.log("seed staff here");
      const admin = {
        firstName: "Root",
        lastName: "Admin",
        email: "root@admin.com",
        phoneNumber: "255713000000",
        gender: "male",
        password: "toor",
        // Add more properties needed here
      };
      //   Call register user from here
      try {
        let data = await Users.create(admin);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      console.log("seed staff done");
      return true;
    } catch (e) {
      return {
        developerMessage: e.message,
      };
    }
  },
};
