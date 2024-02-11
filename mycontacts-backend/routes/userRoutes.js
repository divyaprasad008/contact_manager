const express = require("express")
const router = express.Router();
const {registerUser,loginUser,current} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/login",loginUser);
router.post("/register",registerUser);
router.get("/current", validateToken, current)
// router.route('/:id').get(current);

module.exports = router;