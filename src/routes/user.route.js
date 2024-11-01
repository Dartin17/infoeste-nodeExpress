import express from "express";
import UserController from "../controllers/users.controller.js";

const router = express.Router();
const ctrl = new UserController();

router.post("/create", ctrl.create);
router.get("/list", ctrl.list);
router.get("/search/:id", ctrl.search);
router.delete("/delete/:id", ctrl.delete);
router.put("/update/:id", ctrl.update);
 
export default router;

