import app from "./app";
import mongoose from "mongoose";
import env from "./util/validateEnv";

const port = env.PORT;

mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    console.log("Mongodb database connected...");
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch(console.error);
