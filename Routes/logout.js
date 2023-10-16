const express = require("express");
const router = express.Router();
const logoutContoller = require("../Controllers/logoutController");

router.post("/", logoutContoller.handleLogout);

module.exports = router;
