// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const User = require("./users.model");

module.exports = {
  registerUser: async (req, res, errorCb) => {
    try {
      console.log("register user");
      console.log(req.body);
      let user = new User(req.body);
      user.password = req.body.lastName.toUpperCase();
      //   user.password = bcrypt.hashSync(userInfo.lastName.toUpperCase(), 8);
      await user.save();
      return res.status(200).json({});
    } catch (error) {
      return errorCb({
        status: 500,
        message: error.message,
        developerMessage: error.message,
        stack: error,
        src: "Register User",
      });
    }
  },
  login: async (req, res, error) => {
    try {
      // CHECK IF USER EXISTS
      let user = await User.findOne({ email: req.body.email }, "+password");

      let authenticationInfo = {};

      return res.status(200).json(authenticationInfo);
    } catch (error) {
      console.log(e);
      return error({
        status: 500,
        message: error.message,
        developerMessage: error.message,
        stack: error,
        src: "Login",
      });
    }
  },
  updateUser: async (req, res, errorCb) => {
    const update = req.body.userDetails;
    return await User.findByIdAndUpdate(
      req.params.userId,
      update,
      { new: true },
      (error, updatedUser) => {
        if (error) {
          return errorCb({
            status: 500,
            message: error.message,
            developerMessage: error.message,
            stack: error,
            src: "updateUser",
          });
        }
        res.status(200).json(updatedUser);
      },
      { new: true }
    ).exec();
  },
  signOut: async (req, res, errorCb) => {
    console.log("sign out");
    await User.updateOne(
      { _id: req.body.userId },
      { authToken: "" },
      { useFindAndModify: false }
    )
      .then(() => res.status(200).json({}))
      .catch((error) => {
        console.log(error);
        return errorCb({
          status: 500,
          message: error.message,
          developerMessage: error.message,
          stack: error,
          src: "signOut",
        });
      });
  },
  getAll: async (req, res, errorCb) => {
    console.log("get by all");
    let data = await User.find({});
    // const { filter } = req.query;
    // Get all users here
    return res.status(200).json(data);
  },
  getById: async (req, res, errorCb) => {
    // Get User By Id here
    return res.status(200).json({});
  },
  deleteUser: async (req, res, errorCb) => {
    await User.deleteOne({ _id: req.params.userId }).exec();
    res.status(202).json({
      message: "sucess fully deleted",
    });
  },
  resetPassword: async (req, res, errorCb) => {
    // Reset password here
  },
};
