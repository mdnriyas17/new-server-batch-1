const express = require("express");
const { Authaudmin } = require("../mildware/Authaudmin");
const router = express.Router();
const upload = require("../utils/uploads");
const {
  createUser,
  getAllUsers,
  Myprofile,
  updateUser,
  logout,
  checklogin
} = require("../controller/users");

const {
  createDefultAddress,
  getAllDefultAddress,
  getOneDefultAddress,
  updateDefultAddress,  
  deleteDefultAddress,
} = require("../controller/defultaddress");
router
  .post("/register", createUser)
  .post("/login", getAllUsers)
  .get("/profile", Authaudmin, Myprofile)
  .put("/profile/:id",Authaudmin,upload.array("image"),Authaudmin,updateUser)
  .get("/logout", logout)
  .get("/checklogin",Authaudmin, checklogin)
  // defult address

  .post("/defultaddress", Authaudmin, createDefultAddress)
  .get("/defultaddress", Authaudmin, getAllDefultAddress)
  .get("/defultaddress/:id", Authaudmin, getOneDefultAddress)
  .put("/defultaddress/:id", Authaudmin, updateDefultAddress)
  .delete("/defultaddress/:id", Authaudmin, deleteDefultAddress);

module.exports = router;
