const UserRoutes = require("./Users/users.routes");

module.exports = (app) => {
  app.use("/api/v1/users", UserRoutes);

  app.use("/", (req, res) => res.redirect("http://apihomepage"));
};
