const Router = require("express").Router;
const controller = require("../controllers/user-controller");

const router = new Router();

router.post("/registration", controller.Registration);
router.post("/login", controller.Login);
router.post("/logout", controller.Logout);
router.get("/activate/link", controller.Activate);
router.get("/refresh", controller.Refresh);
router.get("/users", controller.GetUsers);

module.exports = router;