import express from "express";
import auth from "./Routes/authRoute";

const app = express();
app.use(express.json());

app.use("/auth", auth);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
