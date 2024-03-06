const router = require("express").Router();
const chatControllers = require("../controllers/chatControllers");
//const requireAuth = require("../middleware/requireAuth");

//router.use(requireAuth);

router.post("/", chatControllers.createChat);
router.post("/group", chatControllers.createGroupChat);
router.get("/:type/:userInfo", chatControllers.getUserChats);
router.get("/find/:firstId/:secondId", chatControllers.findChat);

module.exports = router;
