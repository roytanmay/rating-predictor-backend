import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import homeRoutes from "./routes/contest.js";
import userRoutes from "./routes/user.js";

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.get("/", (req, res) =>  {
//     res.send("working...")
// })

app.get("/working", async (req, res) => {
  try {
    const response = await fetch(
      "https://jsonmock.hackerrank.com/api/football_matches?year=2011"
    );
    const data = await response.json();
    res.status(200).json(`data: ${data}`);
  } catch (error) {
    res.status(404).json(`error: ${error}`);
  }
});
app.use("/", homeRoutes);
app.use("/user", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(port);
  console.log("servering running on port 5000");
});
