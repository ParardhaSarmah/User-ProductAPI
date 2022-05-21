const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const port = 3000;
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  });
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
