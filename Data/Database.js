import mongoose from "mongoose";
export const ConnectDB = () => {
    mongoose
        .connect(process.env.MONGO_DB_URI, {
            dbName: "ToDo-Backend-Authentication",
        })
        .then((c) => console.log(`Connected with DB successfully ${c.connection.host}`))
        .catch((err) => console.log("Error in Connecting DB", err));
};
