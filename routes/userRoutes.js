const Router = require("express");
const router = new Router();
const Authcontroller = require('../controllers/auth')
const UserController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/login', Authcontroller.login)
router.post('/register', Authcontroller.register)
router.get('/checkAuth', authMiddleware, UserController.check)

router.get('/getalluser', authMiddleware, adminMiddleware, UserController.getAll)
router.get('/getoneuser/:id([0-9]+)', authMiddleware, adminMiddleware, UserController.getOne)
//router.post('/create', authMiddleware, adminMiddleware, UserController.create)
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, UserController.update)
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, UserController.delete)

module.exports = router;
