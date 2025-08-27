const router = require("express").Router();
const { chat, getChat } = require("../controllers");

router.post("/chat", chat);
router.get("/chat/:id", getChat)

module.exports = router;
