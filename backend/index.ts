import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 7000;
const NODE_ENV = process.env.NODE_ENV;

const MONGODB_URL = process.env.MONGODB_URL as string;
const DATABASE = NODE_ENV === "DEV" ? "Booking" : "Test_Booking";

if (!MONGODB_URL) throw new Error("No MongoDb URl");

mongoose
  .connect(MONGODB_URL, {
    dbName: DATABASE,
    bufferCommands: false,
  })
  .then(() => {
    app.listen(PORT, () => {
      if (NODE_ENV === "PRODUCTION") {
        console.log(`Server is Running ${NODE_ENV} Mode`);
        console.log(`Connected to DB`);
        console.log(`Server Started on PORT: http://localhost:${PORT}`);
      } else {
        console.log(`Server is Running ${NODE_ENV} Mode`);
        console.log(`Connected to DB ${DATABASE}`);
        console.log(`Server Started on PORT: http://localhost:${PORT}`);
      }
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
