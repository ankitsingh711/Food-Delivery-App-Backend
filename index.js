const express = require("express");
const app = express();
const { connection } = require("./config/db");
const { UserRouter } = require("./router/UserRouter");
const { RestaurantRouter } = require("./router/RestaurantRouter");
const { OrderRouter } = require("./router/OrderRouter");

app.use(express.json());
app.use("/api", UserRouter);
app.use("/api", RestaurantRouter);
app.use("/api", OrderRouter);

app.get("/", (req, res) => {
  res.send("Hello ! This is a Food Delivery Backend ");
});

let port = process.env.PORT;

app.listen(port, async () => {
  try {
    await connection;
    console.log("DB Connected");
    console.log(`App is running on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
