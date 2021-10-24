const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");

let ENV = "";
if (process.env.STATUS !== "production" || process.env.STATUS === undefined) {
  ENV = require("./src/config/development");
} else {
  ENV = require("./src/config/production");
}

const server = http.createServer(app);

const connect = () =>
  mongoose.connect(
    // 'mongodb://localhost:27017/aiascs',
    ENV.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  );

connect()
  .then(async (connection) => {
    server.listen(ENV.PORT, () => {
      console.log(`Server started on PORT :${ENV.PORT}`);
    });
  })
  .catch((e) => {
    console.log(`error  DB/SERVER : ${e}`);
  });
