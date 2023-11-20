const Router = require("express");
const router = new Router();
const {body} = require('express-validator');

const Authcontroller = require('../controllers/auth')
const UserController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");


router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    Authcontroller.registration
)

router.post('/login', Authcontroller.login)
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);




router.get('/checkAuth', authMiddleware, UserController.check)

router.get('/getalluser', authMiddleware, adminMiddleware, UserController.getAll)
router.get('/getoneuser/:id([0-9]+)', authMiddleware, adminMiddleware, UserController.getOne)
//router.post('/create', authMiddleware, adminMiddleware, UserController.create)
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, UserController.update)
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, UserController.delete)

module.exports = router;
