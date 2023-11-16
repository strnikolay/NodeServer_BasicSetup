const Router = require("express");
const router = new Router();
const Authcontroller = require('../controllers/auth')
const UserController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/login', Authcontroller.login)
router.post('/register', Authcontroller.register)

module.exports = router;
