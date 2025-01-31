import express from "express";
const app = express();
import cors from 'cors';
import authRoutes from "./src/routes/authRoutes.js";

const port = 5000;

console.log("Heya");
//mysql.getConnection();
app.use(cors());
app.use(express.json());

app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("<h1> Hello World </h1>");
  console.log("Heya");
});