const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Started listening on port ${PORT}. Database connection successful`
      )
    );
  })
  .catch((err) => {
    console.log(err.massage);
    process.exit(1);
  });
