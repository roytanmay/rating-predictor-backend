import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import homeRoutes from "./routes/contest.js";
import userRoutes from './routes/user.js'

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.get("/", (req, res) =>  {
//     res.send("working...")
// })

app.use("/", homeRoutes);
app.use("/user", userRoutes);

app.listen(5000, ()=> {
    console.log("servering running on port 5000");
})