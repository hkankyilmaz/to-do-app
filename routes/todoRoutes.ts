import express from "express";
import * as toDoController from "../controller/todoController";

const router = express.Router();

router.route("/register").post(toDoController.todoRegister);
router.route("/delete").post(toDoController.todoDelete);
router.route("/update").post(toDoController.todoUpdate);
router.route("/getAll").post(toDoController.getAllwithUserId);

export default router;
