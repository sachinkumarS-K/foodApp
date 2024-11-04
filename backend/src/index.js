import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});
app.set("port", process.env.PORT || 3000);

dbConnect()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("server is running at port ", process.env.PORT);
    });
  })
  .catch(() => {
    console.log("MongoDb connection failed");
  });
