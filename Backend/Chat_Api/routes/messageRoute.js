const router = require("express").Router();
const messageControllers = require("../controllers/messageControllers");
//const requireAuth = require("../middleware/requireAuth");

//router.use(requireAuth);

router.post("/", messageControllers.createMessage);
router.get("/:chatId", messageControllers.getMessages);

module.exports = router;
