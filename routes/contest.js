import express from  "express";
import {getContests} from  '../controller/contest.js';

const router = express.Router();
router.get("/", getContests);

export default router;
