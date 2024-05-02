const { app, connection } = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

connection
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
