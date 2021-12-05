const express = require("express");
const router = express.Router();
const ElectroController = require("../controllers/electro.controllers");
// Retrieve all users
router.get("/", ElectroController.findAll);
// Create a new user
router.post("/", ElectroController.create);
// Retrieve a single user with id
router.get("/:id", ElectroController.findOne);
// Update a user with id
router.put("/:id", ElectroController.update);

// Delete a user with id
router.delete("/:id", ElectroController.delete);
module.exports = router;
