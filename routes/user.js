import express from "express";
import { addFriend, getUser } from "../controller/user.js";

const router = express.Router();
router.post("/getUsers", getUser);
router.post("/:username", addFriend);

export default router;
