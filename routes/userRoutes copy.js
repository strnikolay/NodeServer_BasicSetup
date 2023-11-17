const Router = require("express");
const router = new Router();
const Authcontroller = require('../controllers/auth')
const UserController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");


router.post('/login', Usercontroller.login)
router.post('/register', controller.register)



router.post("/authSendCode", UserController.authSendCode);
router.post("/authCheckCode", UserController.authCheckCode);
router.post("/changeRole", authMiddleware, UserController.changeRole);
router.post("/setInfo", authMiddleware, UserController.setInfo);
router.post("/changePhone", authMiddleware, UserController.changePhone);
router.post("/changePhoneCode", authMiddleware, UserController.changePhoneCode);
router.post("/sendVerify", authMiddleware, UserController.sendVerify);
router.post("/addCar", authMiddleware, UserController.addCar);
router.post("/changeCar", authMiddleware, UserController.changeCar);
router.post("/deleteCar", authMiddleware, UserController.deleteCar);
router.post("/getDriverCars", authMiddleware, UserController.getDriverCars);
router.post("/setReviewUser", authMiddleware, UserController.setReviewUser);
router.post("/setReviewDriver", authMiddleware, UserController.setReviewDriver);

router.get("/check", UserController.check);
router.get("/getInfo", authMiddleware, UserController.getInfo);
router.get("/checkVerify", authMiddleware, UserController.checkVerify);

router.post("/push/register", authMiddleware, UserController.pushRegister);
router.post("/push/unregister", authMiddleware, UserController.pushUnregister);

// DEV
// router.post("/getCode", UserController.getCode);

module.exports = router;
