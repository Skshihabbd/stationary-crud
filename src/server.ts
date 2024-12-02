import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.database_uri as string);
    console.log(config.database_uri);
    app.listen(config.port, () => {
      console.log(`listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
