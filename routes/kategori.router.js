const router = require("express").Router();
const kategoriController = require("../controller/kategori.controller.js")
const auth = require("../middlewares/auth.js");

router.post("/", auth, kategoriController.createCategory);
router.get("/", kategoriController.readCategory);
router.put("/:id", auth, kategoriController.updateCategory);
router.delete("/:id", auth, kategoriController.deleteCategory);

module.exports = router;
