import ErrorHandler from "../middlewares/error.middleware.js";
import { Task } from "../Models/task.model.js";

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const { id } = req.user;

        const task = await Task.create({ title, description, user: id });
        // const task = new Task({title, description, user: id});
        // await task.save();

        res.status(201).json({
            success: true,
            message: "Task has been created successfully",
            task,
        });
    } catch (error) {
        next(error);
    }
};

export const getMyTasks = async (req, res, next) => {
    try {
        // const {id} = req.user;
        const id = req.user._id;
        const tasks = await Task.find({ user: id });
        res.status(200).json({
            success: true,
            message: "Retrived Tasks...",
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);
        if (!task)
            return next(new ErrorHandler("Task not found, to Update.", 404));

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task has been updated successfully",
            task,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);

        if (!task) {
            // return res.status(404).json({
            //     success: false,
            //     message: "Task not found",
            // })
            // return next(new Error("Task not found, to Delete."));
            return next(new ErrorHandler("Task not found, to Delete.", 404));
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task has been deleted successfully",
            task,
        });
    } catch (error) {
        next(error);
    }
};
