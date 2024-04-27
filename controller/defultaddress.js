const defultaddress = require("../models/defultaddress");
const asyncHandler = require("express-async-handler");
const { success } = require("../utils/success");

const createDefultAddress = asyncHandler(async (req, res) => {
  try {
    const create = await defultaddress.create(req.body);
    if (create) success(res, 201, true, "Created Successfully", create);
  } catch (error) {
    throw new Error(error);
  }
});

//get all

const getAllDefultAddress = asyncHandler(async (req, res) => {
  const { user_id } = req.body;
  try {
    const get = await defultaddress.find({ user_id: user_id }).populate("user_id");
    if (get) success(res, 200, true, "Get Successfully", get);
  } catch (error) {
    throw new Error(error);
  }
});

//get one

const getOneDefultAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const get = await defultaddress.findById(id);
    if (get) success(res, 200, true, "Get Successfully", get);
  } catch (error) {
    throw new Error(error);
  }
});

// update

const updateDefultAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const update = await defultaddress.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (update) {
      success(res, 200, true, "Updated Successfully");
    }
  } catch (error) {
    throw new Error(error);
  }
});

// delete

const deleteDefultAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const del = await defultaddress.findByIdAndDelete(id);
    if (del) success(res, 200, true, "Deleted Successfully", del);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createDefultAddress,
  getAllDefultAddress,
  getOneDefultAddress,
  updateDefultAddress,
  deleteDefultAddress,
};
