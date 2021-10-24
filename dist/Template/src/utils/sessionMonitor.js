// const jwt = require("jsonwebtoken");
const UserModel = require("../resources/Users/users.model");

/**
 * *** Parameters are issued by express middleware ***
 * @param {any} req http request object
 * @param {any} res http response object
 * @callback next callback by express
 *
 * @returns {object} {userId} and {roleId} in req.body
 *
 * @example
 * // Access the passed parameters as follows
 * const userId = req.body.userId;
 * const userRoleId = req.body.roleId;
 *
 */

module.exports = async function validateToken(req, res, next) {
  next();
  // Check if the Authorization Header is present
  //   if (typeof req.headers.authorization === "undefined") {
  //     return res.status(401).json({
  //       message: "Authentication error",
  //       developerMessage: "Authorization type not specified",
  //     });
  //   }

  //   // Obtain the copy of token from Authorization Header
  //   const token = req.headers.authorization.split(" ")[1];
  //   console.log("token", token);

  //   // VERIFY TOKEN HERE
  //   console.log("token verification not yet done");
  // Delete the logging statemement when done

  //   jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
  //     if (err)
  //       return res.status(401).json({
  //         message: "Authentication error",
  //         developerMessage: err.message,
  //       });

  //     try {
  //       const userToAuth = await UserModel.findById(
  //         decoded.id,
  //         "token role"
  //       ).populate("role", "genericName");

  //       //   If userToAuth is null or if userToAuth exists and the tokens aint equal
  //       if (!userToAuth || (userToAuth && userToAuth.token !== token))
  //         return res.status(401).json({
  //           message: "Authentication error",
  //           developerMessage: "invalid token",
  //         });

  //       req.body.userId = decoded.id;
  //       req.body.roleId = decoded.roleId;
  //       req.body.roleGenericName = userToAuth.role.genericName;

  //       next();
  //     } catch (err) {
  //       console.log("err", err);
  //       return res.status(401).json({
  //         message: "Authentication error",
  //         developerMessage: err.message,
  //       });
  //     }
  //   });
};
