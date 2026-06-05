import express from "express";
import auth from "./Routes/authRoute";
import smsauth from "./Routes/smsRoute";
import verify from "./Routes/tgauthRoute";
import register from "./Routes/preferenceRoute";

const app = express();
app.use(express.json());

app.use("/auth", auth);
app.use("/smsauth", smsauth);
app.use("/verify", verify);
app.use("register", register);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
