const users = require("../models/users");
const asyncHandler = require("express-async-handler");
const { success } = require("../utils/success");
const { successToken } = require("../utils/success");
const { generateToken } = require("../config/jwttoken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createUser = asyncHandler(async (req, res) => {
  const salt = await bcrypt.genSaltSync(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  try {
    const create = await users.create(req.body);
    if (create) success(res, 201, true, "Created Successfully", create);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const check = await users.findOne({ email });
  if (!check) throw new Error("Invalid Email");
  const isPasswordMatched = await bcrypt.compare(password, check.password);
  if (!isPasswordMatched) throw new Error("Invalid Password");
  try {
    const userss = await users.findOne({ email });
    const tokens = await generateToken(userss);

    if (userss && req?.headers?.referer == "http://localhost:3000/") {
      res.cookie("jwt", tokens, {
        maxAge: 10 * 60 * 1000,
        // httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: "/",
        partitioned: true,
      });
      const result  = {
        user_id: userss?._id,
        email: bcrypt.hashSync(userss?.email, 10),
      };
      success(res, 200, true, "Login Successfully", result);
    } else {
      res.cookie("jwt", tokens, {
        maxAge: 10 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict", 
        secure: true,
        path: "/",
        partitioned: true,  
      })
      const result  = {
        user_id: userss?._id,
        email: bcrypt.hashSync(userss?.email, 10),
      }
      successToken(res, 200, true, "Login Successfully", result, tokens);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const Myprofile = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const check = await users.findOne({ email });
  if (!check) throw new Error("Invalid Email");
  try {
    const userss = await users.findOne({ email });
    if (userss) {
      success(res, 200, true, "Login Successfully", userss);
    }
  } catch (error) {
    throw new Error(error);
  }
});
const updateUser = asyncHandler(async (req, res) => {
  if (req?.files)
    req.body.image = req?.files[0]?.path ? req?.files[0]?.path : null;
  const { id } = req.params;
  try {
    const updateuser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updateuser) {
      success(res, 200, true, "Updated Successfully");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const logout = asyncHandler(async (req, res) => {
  try {
    const jwt = await res.clearCookie("jwt", {
      maxAge: 1 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
      partitioned: true,
    });
    if (jwt) {
      success(res, 200, true, "Logout Successfully");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const checklogin = asyncHandler(async (req, res) => {
 const {id} = req.body
  try {
    const check = await users.findById(id);
    if (check) {
      success(res, 200, true, "Login Successfully", check);
    }
  } catch (error) {
    throw new Error(error);
  }
})

module.exports = { createUser, getAllUsers, Myprofile, updateUser, logout, checklogin };
