const express = require("express");
const cors = require("cors");
require("dotenv").config();
const activateRoutes = require("./routes/activation.routes");
require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", [
  require("./routes/user.routes"),
  require("./routes/roles.routes"),
  require("./routes/orders.routes"),
  require("./routes/providers.routes"),
  require("./routes/details.routes"),
]);
app.use(activateRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});
