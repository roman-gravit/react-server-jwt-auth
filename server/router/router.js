const Router = require("express").Router;
const controller = require("../controllers/user-controller");
const {body} = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware"); 

const router = new Router();

router.post("/registration", 
	body("email").isEmail(),
	body("password").isLength({min: 6, max: 32}),
	controller.Registration);
router.post("/login", controller.Login);
router.post("/logout", controller.Logout);
router.get("/activate/:link", controller.Activate);
router.get("/refresh", controller.Refresh);
router.get("/users", authMiddleware, controller.GetUsers);

module.exports = router;