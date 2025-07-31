import express from "express";
import { ConnectDB } from "./Data/Database.js";
import { config } from "dotenv";
import userRoutes from './Routes/users.routes.js'
import taskRoutes from './Routes/tasks.routes.js'
import cookieParser from "cookie-parser";
import ErrorHandler, { errorMiddleWare } from "./middlewares/error.middleware.js";
import cors from 'cors'
config({
    path: ".env",
});

const app = express();
ConnectDB();

// Before all routes
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use(express.json());            // must be used before using any route or middleware 
app.use(cookieParser());
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send("Hey there, Default Route")
})

// just for testing
app.get('/internal_server_error_testing', (req, res) =>{
    throw new ErrorHandler();
})

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT || 5000}/ in ${process.env.NODE_ENV} mode`);
})

// error middle ware
app.use(errorMiddleWare)