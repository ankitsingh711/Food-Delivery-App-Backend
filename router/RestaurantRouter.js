const express = require("express");
const RestaurantRouter = express.Router();
const { RestaurantModel } = require("../model/RestaurantModel");

// <------ Getting all Restaurnats Lists ---->

RestaurantRouter.get("/restaurants", async (req, res) => {
  try {
    const allRes = await RestaurantModel.find();
    res.status(200).json({
      Restauranrts: allRes,
    });
  } catch (error) {
    console.log(error);
  }
});

// <-------- adding restaurnats to the database ------>

RestaurantRouter.post("/restaurants", async (req, res) => {
  let payload = req.body;
  try {
    let rest = new RestaurantModel(payload);
    await rest.save();
    res.status(200).json({
      msg: "restaurant added",
    });
  } catch (error) {
    console.log(error);
  }
});

// <----- Details of a particular restaurant --------->

RestaurantRouter.get("/restaurants/:id", async (req, res) => {
  let resId = req.params.id;
  try {
    const restaurant = await RestaurantModel.findById({ _id: resId });
    res.status(200).json({
      restaurant: restaurant,
    });
  } catch (error) {
    console.log(error);
  }
});

// <--------- List of all menu of a particular restaurnt by its id ----->
RestaurantRouter.get("/restaurants/:id/menu", async (req, res) => {
  let resId = req.params.id;
  console.log(resId);
  try {
    const restaurant = await RestaurantModel.findById({ _id: resId });
    const menuArr = restaurant.menu;
    res.status(200).json({
      allMenu: menuArr,
    });
  } catch (error) {
    console.log(error);
  }
});

RestaurantRouter.post("/restaurants/:id/menu", async (req, res) => {
  let resId = req.params.id;
  let payload = req.body;
  try {
    // const restaurant = await RestaurantModel.findById({ _id: resId });
    await RestaurantModel.findOneAndUpdate({
      _id: resId,
      $push: { menu: payload },
      new: true,
    });
    res.status(201).json({
      msg: "Menu Added Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

// <------- Deleting the particular menu from the particular restaurant ----->

RestaurantRouter.delete(
  "/restaurants/:resId/menu/:menuId",
  async (req, res) => {
    const resId = req.params.resId;
    const menuId = req.params.menuId;
    try {
      const rest = await RestaurantModel.findById({ _id: resId });
      const menuIndex = rest.menu.findIndex(
        (item) => item._id.toString() === menuId
      );
      if (!menuIndex) {
        res.status(404).json({
          msg: "menu doesn't exist",
        });
      }
      rest.menu.splice(menuIndex, 1);
      await rest.save();
      res.status(202).json({
        msg: "Menu Item Deleted",
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = { RestaurantRouter };
