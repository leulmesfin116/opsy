import express from "express";
import auth from "./Routes/authRoute";
import smsauth from "./Routes/smsRoute";
import verify from "./Routes/tgauthRoute";

const app = express();
app.use(express.json());

app.use("/auth", auth);
app.use("/smsauth", smsauth);
app.use("/verify", verify);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
